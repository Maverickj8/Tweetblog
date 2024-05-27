import React from "react";
import Link from "next/link";
import { BiHomeCircle, BiBell, BiUser, BiSolidPen } from "react-icons/bi";
import Button from "../Button/page";
import { signIn, signOut } from "next-auth/react";


const NavigationItem = [
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Notification",
    icon: BiBell,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
  {
    title: "Post",
    icon: BiSolidPen,
  },
];


const SideBar = ({ session }) => {
  return (
    <section className="fixed w-[275px] flex flex-col items-stretch h-screen space-y-4 my-4 hidden lg:block justify-between">
      <div className="flex flex-col items-stretch h-screen space-y-4 ">
        {NavigationItem.map((item) => (
          <Link
            className="hover:bg-white/10 text-xl transition duration-200 flex items-center justify-start w-fit space-x-4 rounded-3xl py-2 px-6"
            href={`/${item.title.toLowerCase()}`}
            key={item.title}
          >
            <div>
              <item.icon />
            </div>
            <div>{item.title}</div>
          </Link>
        ))}
        <Button />
        <div className="my-8">
          {session ? (
            <button type="button" 
            onClick={() => signOut() }
            className="bg-neutral-900  py-2 px-2 ml-3 text-[15px] text-center rounded-xl border-s-8  border-pink-500  hover:bg-opacity-70 transition duration-200">
              signout
            </button>
          ) : (
            <button type="button"
            onClick={() => signIn()}
            className="bg-neutral-900  py-2 px-2 ml-3 text-[15px] text-center rounded-xl border-r-8 border-pink-500  hover:bg-opacity-70 transition duration-200">
              signin
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SideBar;
