import { connect, connection} from "mongoose";
import User from "./User";
import Tweet from "./Tweet";
const { MONGODB_LOCAL } = process.env;

const dbConnect = async () => {
  // Database connection
  const connectDB = await connect(MONGODB_LOCAL);

  // confirm connection status
  const connectionStatus = connection;
  connectionStatus.on("error", (error) => {
    console.log(`mongoDB ${error} has occured`);
  });
  //    for successful connection
  connectionStatus.on("connected", () => console.log("connected successfully"));

  return {User, Tweet}
};
export default dbConnect