import Dockerode from "dockerode";
import path from "path";
import fs from "fs";
import { PORT_TO_CONTAINER, CONTAINER_TO_PORT } from "../server.mjs";
import dotenv from "dotenv";
dotenv.config();

const socket_path = process.env.socketPath;
const docker = new Dockerode({ socketPath: socket_path }); // Explicitly speciying paths to run on docker desktop

const handleGetContainer = async (request, response) => {
    const containers = await docker.listContainers(); // see the documentation
    // containers.forEach(async(ele)=>{
    //   const containerInfo = await ele.inspect();
    //   console.log(containerInfo.NetworkSettings.Ports);
    // })

    return response.json({
        containers: containers,
    });
}

const handleCreateContainer = async (request, response) => {
    try {
        const { image } = request.body; // get the image from request body
        const { userId } = request.body;

        await docker.pull(image); // download the image if not available locally

        // create containers with available ports, returned as a number  
        const availablePort = await (async () => {
            await getAPort(docker);
            for (let i = 8000; i < 8999; i++) {
                if (PORT_TO_CONTAINER.has(i) === true) continue; // if present 
                return i;                      // return port
            }
            return null;
        })();

        // if ports are not available 
        if (availablePort === null) {
            return response.json({
                "error": "No available ports"
            });
        }
        const userPath = path.join("/home/hariom/PERSONAL/Docker", "user_data", userId);

        // returns if path exists or create a directory
        if (!fs.existsSync(userPath)) {
            fs.mkdirSync(userPath, { recursive: true });
        }


        // return response.json({
        //   "error": "Path not exists"
        // });

        const container = await docker.createContainer({
            Image: image,
            Cmd: ["tail", "-f", "/dev/null"],  // keep the container up & running 
            AttachStdout: true, // to keep container always running
            Tty: true, // pseudo terminal (tty or pts)
            ExposedPorts: {
                "80/tcp": {}, // Explicitly expose port 80
            },
            HostConfig: {
                // Binds: ['/path/on/host:/path/in/container'],  // host and machine paths binding for volume mounting

                Binds: [`${userPath}:/home/user_data`],  // mount user data to its ids folder
                NetworkMode: "bridge", // bridge network
                PortBindings: {
                    "80/tcp": [{ HostPort: `${availablePort}` }], // availablePort as a string 
                },
            },
        });

        // use port and map to containers
        PORT_TO_CONTAINER.set(availablePort, container.id); // int to str
        CONTAINER_TO_PORT.set(container.id, availablePort); // str to int

        // start the container 
        await container.start();

        return response.json({ container });

    } catch (error) {
        return response.json({
            status: "something went wrong",
            err: error
        });
    }
}

const handleDeleteContainer =  async (request, response) => {
    try {
        // first fetch all the ids of all the container ro delete 
        const container_Id = request.body.containerId;
        const containers = await docker.listContainers();
        
        // stop the container
        docker.getContainer(container_Id).stop();
        // const containers_ids = [];

        // containers.forEach(container => {
        //     containers_ids.push(container.Id);

        //     // stop containers 
        //     docker.getContainer(container.Id).stop();
        // });

        // console.log(containers_ids);

        return response.json({
            "status": "success"
        });

    } catch (err) {
        return response.json({ err });
    }
}

const handleExecuteCommands =  async (request, response) => {
    try {
        const { containerId, command } = request.body;

        const container = docker.getContainer(containerId);
        const execCommand = await container.exec({
            Cmd: ['/bin/sh', '-c', command],
            AttachStdout: true, // boolean if to attach a stdout
            AttachStderr: true,  // boolean if to attach a stderr
            WorkingDir: "/home/user_data",
            Tty: false,
            "DetachKeys": "ctrl-p,ctrl-q",
        });

        // start a docker exec instance & provide stream for i/o with process inside container
        execCommand.start({}, (err, stream) => {
            if (err) {
                return response.status(500).json({
                    "msg": "Internal server error yes",
                    "err": err
                });
            }

            // send data when data is output
            stream.on("data", (data) => {
                return response.status(200).json({
                    "data": data.toString()
                });
            });

            // close response when stream ends
            stream.on("end", () => {
                response.end();
            })
        })
    }
    catch (err) {
        return response.status(500).json({
            "msg": "Internal server error",
            "err": err
        })
    }
}

export { handleGetContainer, handleCreateContainer, handleDeleteContainer, handleExecuteCommands };