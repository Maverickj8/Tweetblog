import { BiSearch, BiDotsHorizontalRounded } from "react-icons/bi";
import MainBar from "../components/mainBar/page";
import SideBar from "../components/SideBar/page";
import LeftSideBar from "../components/LeftSideBar/page";

const HomePage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative justify-between">
        {/* sidebar */}
        <SideBar />
        {/* Main page */}
        <MainBar />
        <LeftSideBar />
      </div>
    </div>
  );
};

export default HomePage;
