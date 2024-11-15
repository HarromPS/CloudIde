// logging request and repsonse of the application 
import fs from "fs";

export default function logReqRes(filename){
    return(req,res,next)=>{
        fs.appendFile(
            filename,
            `${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
            (err,data)=>{
                next();
            }
        )
    }
}