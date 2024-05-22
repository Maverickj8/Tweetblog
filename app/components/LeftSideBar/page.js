import { BiSearch, BiDotsHorizontalRounded } from "react-icons/bi";
import React from "react";

const LeftSideBar = () => {
  return (
    <section className=" w-full sticky top-2 mt-2 flex flex-col items-stretch h-screen px-6 hidden lg:block">
      <div>
        <div className="flex items-center justify-center w-full h-full bg-neutral-900 rounded-full   ">
          <label htmlFor="searchBox" className=" ml-8 ">
            <BiSearch className="w-5 h-5 text-gray-500" />
          </label>
          <input
            id="searchBox"
            className="bg-neutral-900 border-none rounded-full py-2 pl-2 pr-4 outline-none w-full h-full "
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>
      <div className="bg-neutral-900 my-4 rounded-2xl">
        <h3 className="font-bold text-xl p-4 my-4">Whats happening</h3>
        {Array.from({ length: 5 }).map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2 hover:bg-white/10 p-2 rounded-b-xl transition duration"
          >
            <div>
              <p className="text-gray-500 text-xs">Trending</p>
              <p className="font-bold text-xs">#New blog alert</p>
              <p className="text-gray-500 text-xs">12k Tweets</p>
            </div>
            <div>
              <BiDotsHorizontalRounded className="text-pink-500 cursor-pointer hover:text-pink-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeftSideBar;
