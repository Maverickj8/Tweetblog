"use client";
import SideBar from "../components/SideBar/page";
import { useSession } from "next-auth/react";
import moment from "moment";
import { useState, useEffect } from "react";
import { DNA, Bars } from "react-loader-spinner";
import {
  BiBarChart,
  BiDotsHorizontalRounded,
  BiDownArrowAlt,
  BiHeart,
  BiMessage,
  BiShareAlt,
  BiUpArrowAlt,
} from "react-icons/bi";
import {
  BiCalendar,
  BiEnvelope,
  BiLeftArrow,
  BiLeftArrowAlt,
  BiMap,
} from "react-icons/bi";
import Link from "next/link";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
//  console.log(effect);
  useEffect(() => {
    fetch("/api/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  const { data: session, status } = useSession();
  console.log(session);
  //
  if (status === "unauthenticated") {
    return <h1>Not logged in</h1>;
  }
  if (status === "loading") {
    return (
      <div className="lg:ml-[275px] flex items-center justify-center w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600 ">
        <DNA
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperClass
        />
      </div>
    );
  }
  return (
    <>
      <section className="w-full h-full flex flex-col justify-center items-center relative bg-black">
        <div className="max-w-screen-xl w-full h-full flex relative justify-between">
          <SideBar session={session} />
          <div className="lg:ml-[275px] flex w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600 ">
            <div className="flex items-center space-x-8 ml-4 mt-3">
              <div>
                <BiLeftArrowAlt className="text-2xl" />
              </div>
              <div>
                <p className="font-bold text-xl">{session.user.name}</p>
                <p className="text-gray-500 text-[12px]">7,672 posts</p>
              </div>
            </div>
            <div className="bg-slate-400 aspect-square w-full h-40 relative">
              <div className="bg-slate-500 rounded-full w-40 h-40 absolute -bottom-16 left-3"></div>
            </div>
            <div className="flex flex-col px-3 mb-6">
              <div className="flex items-centerflex items-center justify-between mt-2">
                <div></div>
                <div className="flex items-center justify-between space-x-5 ">
                  <div className="rounded-full border border-white p-1 text-xl">
                    <BiDotsHorizontalRounded />
                  </div>
                  <div className="rounded-full border border-white p-1 text-xl">
                    <BiEnvelope />
                  </div>
                  <div className="bg-white text-slate-800 px-3 py-1 rounded-full">
                    Follow
                  </div>
                </div>
              </div>
              <div className="mt-6 px-3">
                <div className="mb-5">
                  <h2 className="font-bold text-xl">{session.user.name}</h2>
                  <p className="text-gray-500">@MaverickAlbert5</p>
                </div>
                <div className="mb-4">
                  <h4>Frontend Developer || Mobile Developer in progress</h4>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center text-gray-500 space-x-1">
                    <BiEnvelope />
                    <p>Science and Technology</p>
                  </div>
                  <div className="flex items-center text-gray-500 space-x-1">
                    <BiMap />
                    <p>Earth</p>
                  </div>
                  <div className="flex items-center text-gray-500 space-x-1">
                    <BiCalendar />
                    <p>Joined February 2023</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div>
                    <p>
                      1,472<span className="text-gray-500"> Following</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      8,472<span className="text-gray-500"> Followers</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 border-b-[0.5px] border-gray-600 ">
              <Link
                href="/"
                className="hover:bg-gray-900 py-3 px-8 border-b-2 mr-2 mb-4 border-pink-500 "
              >
                Posts
              </Link>
              <Link
                href="/"
                className="hover:bg-gray-900 py-3 px-8 hover:border-b-2 mb-4 hover:border-pink-500"
              >
                Replies
              </Link>
              <Link
                href="/"
                className="hover:bg-gray-900 py-3 px-8 hover:border-b-2 mb-4 hover:border-pink-500"
              >
                Articles
              </Link>
              <Link
                href="/"
                className="hover:bg-gray-900 py-3 px-8 hover:border-b-2 mb-4 hover:border-pink-500"
              >
                Media
              </Link>
              <Link
                href="/"
                className="hover:bg-gray-900 py-3 px-8 hover:border-b-2 mb-4 hover:border-pink-500"
              >
                Likes
              </Link>
            </div>
            {posts.length == 0
              ? "loading"
              : posts
                  .filter((post) => post.email === session.user.email)
                  .map((post, index) => {
                    // console.log(post);
                    return (
                      <div
                        key={index}
                        className="border-b-[0.5px] px-4 py-4 flex space-x-4"
                      >
                        <div>
                          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center space-x-1 w-full">
                              <div className="font-bold ">{post.user.name}</div>
                              <div className="text-gray-500">
                                {post.user.username}
                              </div>
                              <div className="text-gray-500">
                                <BiDotsHorizontalRounded />
                              </div>
                              <div className="text-gray-500">
                                {" "}
                                {moment(post.createdAt).fromNow()}
                              </div>
                            </div>
                            <div>
                              <BiDotsHorizontalRounded className="text-pink-500 cursor-pointer hover:text-pink-300" />
                            </div>
                          </div>
                          <div className="text-white text-sm">{post.tweet}</div>
                          <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
                          <div className="flex items-center justify-between space-x-2 w-full">
                            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
                              <BiMessage />
                            </div>
                            <div className="flex rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
                              <BiUpArrowAlt />
                              <BiDownArrowAlt />
                            </div>
                            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
                              <BiHeart />
                            </div>
                            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
                              <BiBarChart />
                            </div>
                            <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
                              <BiShareAlt />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                  .reverse()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;

// {
//     "post_id": "string",
//     "user_id": "string",
//     "username": "string",
//     "content": "string",
//     "timestamp": "datetime",
//     "likes": "integer",
//     "retweets": "integer",
//     "comments": [
//       {
//         "comment_id": "string",
//         "user_id": "string",
//         "username": "string",
//         "content": "string",
//         "timestamp": "datetime"
//       }
//     ]
//   }
