import { useState } from "react";

const FileTreeNode = ({ fileName, nodes, onSelect, path }) => {
  const isDir = !!nodes;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="file-node-container pl-4"
      onClick={(e) => {
        e.stopPropagation();
        if (isDir) {
          setIsOpen(!isOpen); // Toggle folder visibility
        } else {
          onSelect(path); // File is selected
        }
      }}
    >
      <div className="flex items-center cursor-pointer">
        {/* Folder Icon */}
        {isDir && (
          <span className="mr-2">
            {isOpen ? "📂" : "📁"}
          </span>
        )}
        {/* File Icon */}
        {!isDir && (
          <span className="mr-2">📄</span>
        )}
        {/* File/Folder Name */}
        <p className={`${isDir ? "font-semibold" : "text-gray-500"} hover:text-blue-500`}>
          {fileName}
        </p>
      </div>
      {/* Render Child Nodes (Subfolders) */}
      {isDir && isOpen && fileName !== "node_modules" && (
        <ul className="pl-4">
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={path + "/" + child}
                fileName={child}
                nodes={nodes[child]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FileTree = ({ tree, onSelect, tech }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-64 max-h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">{tech}</h2>
      <FileTreeNode onSelect={onSelect} fileName="/" path="" nodes={tree} />
    </div>
  );
};

export default FileTree;
