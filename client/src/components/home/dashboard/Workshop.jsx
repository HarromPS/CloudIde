import React from 'react';
import { MdDeleteForever } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";

const Workshop = () => {

  return (
    <div className="p-4 sm:ml-64 bg-[#373b42] h-screen" >
      <div className="p-4 font-bold text-white text-[22px]">All Spaces</div>
      <div id="languages" className="m-4">
        <div key={"item.tech"} class="flex flex-row justify-between w-full p-4 hover:cursor-pointer hover:border-white border-gray-500 border-2 rounded-md">
          <div class="">
            <button class="inline-flex items-center border-0 p-1 m-1 focus:outline-none bg-gray-400 rounded text-base text-white">Nodejs</button>
            <div class="font-semibold title-font text-white">
              <h2 class="text-2xl font-medium text-white title-font mb-2">Simple Nodejs Sever Application</h2>
              <p class="leading-relaxed text-gray-300">Created: 12 Nov 2024</p>
            </div>
          </div>

          <div class="flex items-center">
            <p class="text-2xl font-medium text-white title-font m-2 p-1 hover:border-1 hover:bg-gray-400 rounded-xl"><MdDeleteForever /></p>
            <p class="text-2xl font-medium text-white title-font m-2 p-1 hover:border-1 hover:bg-gray-400 rounded-xl"><VscDebugStart /></p>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Workshop