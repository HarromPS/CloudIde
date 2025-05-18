import React from 'react';
import { FaNodeJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const handleClick = (item) => {
        navigate('/code_editor', { state: { tech: item.tech } });
    };
    
    const data = [
        {
            "tech": "Nodejs",
            "workspace": "js workspace",
            "tools": ["Nodejs", "Javascript", "Typescript"],
            "icon": <FaNodeJs />
        },
        {
            "tech": "Python",
            "workspace": "python workspace",
            "tools": ["Python"],
            "icon": <FaPython />
        },
        {
            "tech": "C/C++",
            "workspace": "c/c++ workspace wit]h gcc++ make cmake git",
            "tools": ["C", "CPP", "MAKE", "GIT"],
            "icon": <TbBrandCpp />
        },
        {
            "tech": "Java",
            "workspace": "java workspace",
            "tools": ["Java", "Spring"],
            "icon": <FaJava />
        },
        {
            "tech": "ReactJs",
            "workspace": "reactjs workspace",
            "tools": ["javascript", "reactjs", "JSX", "TSX    "],
            "icon": <FaReact />
        },
        {
            "tech": "HTML",
            "workspace": "html workspace",
            "tools": ["HTML", "CSS"],
            "icon": <FaHtml5 />
        },
    ]

    return (
        <>
            <div className="p-4 sm:ml-64 bg-[#373b42] h-screen" >
                <div className="p-4 border-2 border-gray-200 border rounded-lg dark:border-gray-700 font-bold text-white text-center text-[22px]">
                    Programming Langauages

                </div>
                <div id="languages" className="m-4">
                    <div className="flex flex-wrap -m-4">
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={item.tech} id={item.tech} className="p-4 md:w-1/3 cursor-pointer hover:border-2 rounded-md" onClick={()=> handleClick(item)}>
                                        <div className="flex rounded-lg h-full bg-gray-800 bg-opacity-60 p-8 flex-col">
                                            <div className="flex items-center mb-3">
                                                <div className="w-10 h-10 mr-3 inline-flex items-center justify-center border-2 rounded-full text-white flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                <h2 className="text-white text-lg title-font font-medium">{item.tech}</h2>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="leading-relaxed text-base font-bold text-[#6e7279]">{item.workspace}</p>
                                                {
                                                    item.tools.map((toolItems, index) => {
                                                        return (
                                                            <button key={toolItems} className="inline-flex items-center border-0 py-1 px-3 mx-2 focus:outline-none bg-gray-400 rounded text-base mt-4 text-white">{toolItems}</button>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div >
        </>
    )
}

export default Hero