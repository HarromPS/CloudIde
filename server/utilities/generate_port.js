import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs
import { PORT_TO_CONTAINER, CONTAINER_TO_PORT } from "../server.mjs";

const getAPort = async (docker) => {
    try {
        // list all containers port and save in port to container
        const containers = await docker.listContainers();
        containers.forEach((item) => {
            const containerId = item.Id;
            const containerPort = item.Ports[0].PublicPort;

            PORT_TO_CONTAINER.set(containerPort, containerId);
            CONTAINER_TO_PORT.set(containerId, containerPort);
        });
    }
    catch (err) {
        throw err;
    }
}

export {getAPort};