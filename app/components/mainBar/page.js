"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import moment from "moment";
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

console.log("ok");
const MainBar = () => {
  const { data: session, status } = useSession();
  // console.log(session);
  const [posts, setPosts] = useState([]);
  const [tweet, setTweet] = useState("");

  useEffect(() => {
    fetch("/api/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  const handleChange = (event) => {
    setTweet(event.target.value);
  };
  // form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const submitTweet = {
      session,
      tweet,
    };
    fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify(submitTweet),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setTweet("");
          toast.success(data.message);
          return;
        } else {
          toast.error(data.message);
          return;
        }
      });
  };

  // if (posts.length == 0) {
  //   return <h1>loading...</h1>;
  // }
  if (status === "unauthenticated") {
    return <h1>You need to login</h1>;
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
    <main className="lg:ml-[275px] flex w-full h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600 ">
      <h1 className="text-xl font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        Home
      </h1>
      <div className="border-t-[0.5px] px-4 border-b-[0.5px] flex items-stretch py-4 space-x-2 border-gray-600">
        <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const submitTweet = {
              session,
              tweet,
            };
            fetch("/api/post/create", {
              method: "POST",
              body: JSON.stringify(submitTweet),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status) {
                  setTweet("");
                  toast.success(data.message);
                  return;
                } else {
                  toast.error(data.message);
                  return;
                }
              });
          }}
          className="flex flex-col w-full h-full"
        >
          <textarea
            className="border-b-[0.5px] p-4 border-gray-600 w-full h-full bg-transparent outline-none border-none placeholder:text-gray-500 placeholder:text-xl"
            type="text"
            placeholder="What's happening?"
            value={tweet}
            required
            onChange={handleChange}
          ></textarea>
          <div className="w-full justify-between items-center flex">
            <div></div>
            <div className="w-full max-w-[100px]">
              <button className="bg-pink-500 px-4 py-2 w-full text-lg text-center rounded-full  hover:bg-opacity-70 transition duration-200 font-bold">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
      {posts.length == 0
        ? "loading"
        : posts
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
    </main>
  );
};

// const Tweets = ({ posts }) => {
//   console.log(posts);
//   const tweets = posts.map((post, index) => {
//     // console.log(post);
//     return (
//       <div key={index} className="border-b-[0.5px] px-4 py-4 flex space-x-4">
//         <div>
//           <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
//         </div>
//         <div className="flex flex-col space-y-2">
//           <div className="flex items-center justify-between cursor-pointer">
//             <div className="flex items-center space-x-1 w-full">
//               <div className="font-bold ">{session.user.name}</div>
//               <div className="text-gray-500">{post.user.username}</div>
//               <div className="text-gray-500">
//                 <BiDotsHorizontalRounded />
//               </div>
//               <div className="text-gray-500">1 hour ago</div>
//             </div>
//             <div>
//               <BiDotsHorizontalRounded className="text-pink-500 cursor-pointer hover:text-pink-300" />
//             </div>
//           </div>
//           <div className="text-white text-sm">{post.tweet}</div>
//           <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
//           <div className="flex items-center justify-between space-x-2 w-full">
//             <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
//               <BiMessage />
//             </div>
//             <div className="flex rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
//               <BiUpArrowAlt />
//               <BiDownArrowAlt />
//             </div>
//             <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
//               <BiHeart />
//             </div>
//             <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
//               <BiBarChart />
//             </div>
//             <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer text-pink-500">
//               <BiShareAlt />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   });
//   return <div className="flex flex-col">{tweets}</div>;
// };

export default MainBar;
