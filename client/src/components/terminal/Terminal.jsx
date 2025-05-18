import React, { useEffect, useState } from "react";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import stripAnsi from 'strip-ansi';
import socket from "../../utilities/socket.js"; // Your socket instance

const AppTerminal = () => {
  const [response, setResponse] = useState("");

  // Handle commands from terminal
  const commandHandler = (text) => {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hola ' + text.substring(argsIndex + 1) + '!';
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      case 'clear':
        TerminalService.emit('clear'); 
        break;

      default:
        socket.emit("terminal:write", text);
        break;
    }
    if (response){ 
      TerminalService.emit('response', response);
    }
  }

  const handleServerData = (data) => {
    const cleanOutput = stripAnsi(data); // Remove escape codes
    // console.log(cleanOutput)
    if (cleanOutput) {
      TerminalService.emit('response', cleanOutput);
    }
    else {
      // TerminalService.emit('clear'); 
    }
    setResponse(cleanOutput); // Update terminal output
  }

  useEffect(() => {
    TerminalService.on('command', commandHandler);

    // Listen for the server's response
    socket.on("terminal:data", handleServerData);

    return () => {
      TerminalService.off('command', commandHandler);
      socket.off("terminal:data", handleServerData);
    };
  }, []);


  return (
    <div className="flex flex-col h-[96vh] w-full bg-gray-900">
      <Terminal
        welcomeMessage="Welcome to the Shell ⌨. Type 'help' for a list of commands."
        prompt="user@cloud-ide$"
        className="w-full h-full  break-words"
        commands={{
          help: () => "Available commands: date, greet, random",
          date: () => `Today is ${new Date().toDateString()}`,
          greet: (name) => `Hello, ${name}!`,
          random: () => Math.floor(Math.random() * 100),
        }}
        // response={response} // Display the server response
        pt={{
          root: "bg-gray-900 text-white border-none",
          prompt: "text-gray-400 mr-2 font-bold text-[16px]",
          command: "text-primary-300 font-bold",
          response: "text-primary-300 font-bold break-words whitespace-pre-wrap",
          commandText: "outline-none font-bold",
        }}
      />
    </div>
  );
};

export default AppTerminal;
