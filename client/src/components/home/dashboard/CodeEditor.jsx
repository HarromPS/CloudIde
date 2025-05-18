import { useCallback, useEffect, useState } from "react";
import Terminal from "../../terminal/Terminal";
import FileTree from "../../../utilities/Tree";
import socket from "../../../utilities/socket.js";
import { Link, useLocation } from 'react-router-dom';
// import AceEditor from "react-ace";
// import ReactAce from "react-ace/lib/ace.js";
import { CodeiumEditor } from "@codeium/react-code-editor";

function CodeEditor() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");

  const location = useLocation();
  const { tech } = location.state || {};
  // console.log(tech); // This should log the value of tech

  const isSaved = selectedFileContent === code;

  useEffect(() => {
    if (!isSaved && code) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved]);

  useEffect(() => {
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    setCode(selectedFileContent);
  }, [selectedFileContent]);

  const getFileTree = async () => {
    const response = await fetch("http://localhost:8001/files");
    const result = await response.json();
    setFileTree(result.tree);
  };

  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(
      `http://localhost:8001/files/content?path=${selectedFile}`
    );
    const result = await response.json();
    setSelectedFileContent(result.content);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);
  return (
    <>
      <div className="flex flex-row h-screen w-screen">

        {/* Sidebar */}
        <div className="flex-none w-[300px] bg-gray-300 text-white h-screen overflow-y-auto">
          <div className="p-4">
            <FileTree
              onSelect={(path) => {
                setSelectedFileContent("");
                setSelectedFile(path);
              }}
              tech={tech || "nodejs"}
              tree={fileTree}
            />
          </div>
          <div className="text-black text-center font-bold text-[18px]">
            <Link to="/dashboard/templates" className="border-2 p-2 ">Logout Session</Link>
          </div>
        </div>

        <div className="flex-grow flex editor">
          <div className="flex flex-grow flex-col">

            {selectedFile && (
              <p>
                {selectedFile.replaceAll("/", " > ")}{" "}
                {isSaved ? "Saved" : "Unsaved"}
              </p>
            )}
            <div className="flex-grow">

              <CodeiumEditor
                language="python"               // Set language to Python
                theme="vs-dark"                 // Set theme to vs-dark
                height="100%"
                width="100%"  // Full width and height
                fontSize={20}                   // Set font size
                value={code}                    // Set the code as the value
                highlightActiveLine={true}      // Highlight the active line
                onChange={(e) => {
                  setCode(e)
                }}
              />

              {/* <ReactAce
                name="ace-editor"
                width="100%"
                fontSize={20}
                placeholder={`// Hello Lets start coding!`}
                value={code}
                style={{ height: "100%", width: "100%" }}
                highlightActiveLine={true}
                onChange={(e) => setCode(e)}
              /> */}
            </div>
          </div>

        </div>
        <div className="flex-none bg-gray-900 text-white ">
          <Terminal />
        </div>
      </div>
    </>
  );
}

export default CodeEditor;