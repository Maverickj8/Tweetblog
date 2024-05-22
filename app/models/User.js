import { Schema, model, models, set } from "mongoose";

const userSchema = new Schema({
    name: {type: String},
    email: {type: String, required: [true, "please enter your email"], unique: [true, "Email already exist"] },
    username: {type: String},
    createdAt: {type: String},
    password: {type: String}
});
try {
  delete models.User;
} catch (error) {
  console.log(error);
}
const User = new model("User", userSchema);

export default User;

