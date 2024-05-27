import { Schema, model, models } from "mongoose";
import moment from "moment";

const tweetSchema = new Schema({
  user: {
    username: String,
    name: String,
    image: String,
  },
  email: String,
  tweet: String,
  media: String,
  createdAt: { type: Date, default: moment().format() },
});
try {
  delete models.Tweet;
} catch (error) {
  console.log(error);
}
const Tweet = new model("Tweet", tweetSchema);

export default Tweet;
