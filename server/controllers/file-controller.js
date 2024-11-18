import fs from "fs/promises";
import generateFileTree from "../utilities/generate_file_tree.js";

const handleCreateFile = async (req, res) => {
    const { filePath, fileContent } = req.body;
    try {       
        // Create the file and write the fileContent
        await fs.writeFile(filePath, fileContent, 'utf-8');
        return res.status(200).json({ message: "File created successfully" });
    } catch (error) {
        return res.status(500).json({ "msg": "Error creating file","error":error });
    }
};

const handleGetAllFiles = async(request,response)=>{
    try{
        const userPath = request.body.userPath;
        const fileTree = await generateFileTree(userPath);
        return response.status(200).json({ tree: fileTree });
    }
    catch(err){
        return res.status(500).json({
            "msg":"Internal Server error",
            "err":err
        })
    }
}

const handleGetFileContents = async (req, res) => {
    const filePath = req.body.filePath;
    try{
        const content = await fs.readFile(filePath, 'utf-8')
        return res.status(200).json({ content });
    }
    catch(err){
        return res.status(500).json({
            "msg":"Internal Server error",
            "err":err
        })
    }
}

const handleWriteFileContents = async (req, res) => {
    try{
        const filePath = req.body.filePath; 
        const fileContent = req.body.fileContent;
        await fs.writeFile(filePath, fileContent);
        return res.status(200).json({ "msg:":"file updated" });
    }
    catch(err){
        return res.status(500).json({
            "msg":"Internal Server error",
            "err":err
        })
    }
}

const handleDeleteFile = async (req, res) => {
    const filePath = req.body.filePath;
    try {
        // Delete the file
        await fs.unlink(filePath);
        return res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        return res.status(404).json({ error: "File not found" });
    }
};

export {
    handleGetAllFiles,
    handleGetFileContents,
    handleWriteFileContents,
    handleCreateFile,
    handleDeleteFile
};