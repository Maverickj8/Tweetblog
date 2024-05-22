import { models, Schema } from "mongoose";

// A post schema that shows what the profile should look like
const PostSchema = new Schema({
  user: {
    username: String,
    totalPost: Number,
    name: String,
    bio: String,
    date: String,
    followers: Number,
    image: String,
    hashedPassword: String,
    coverImage: String,
    profileImage: String,
  },
  posts: String,
});

try {
  delete models.Posts;
} catch (error) {
  console.log(error);
}

const Posts = new model("Posts", PostSchema);

export default Posts;
