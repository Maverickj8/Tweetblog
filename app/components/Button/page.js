"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";

export default function Button() {
  async function handleSignIn() {
    await signIn();
  }

  const { data: session, status } = useSession();
  if (status == "loading") {
    return <button
        onClick={handleSignIn}
        className="bg-pink-500 m-4 py-4 text-xl text-center rounded-full  hover:bg-opacity-70 transition duration-200"
      >
        Tweet
      </button>;
  }
  if (status == "unauthenticated") {
    return (
      <>
       <button
        onClick={handleSignIn}
        className="bg-pink-500 m-4 py-4 text-xl text-center rounded-full  hover:bg-opacity-70 transition duration-200"
      >
        Tweet
      </button>
      </>
    );
  }
  // console.log(session);
  return (
    <>
      {/* <h1 className="text-red">Welcome {session.user.name}</h1> */}
      <button
        className="bg-pink-500 m-4 py-4 text-xl text-center rounded-full  hover:bg-opacity-70 transition duration-200"
      >
        Tweet
      </button>
    </>
  );
}

