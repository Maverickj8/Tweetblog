import dbConnect from "@/app/models/Index";
import bcrypt from "bcrypt"

export async function POST(req) {
  const { email, password, name, age } = await req.json();
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  // connect to the database
  const { Users } = await dbConnect();

  const resData = { status: false, message: "" };
  // method of database creation
  try {
    await Users.create({
      email,
      password: hash,
      name,
      age,
    });
    resData.status = true;
    resData.message = "User was created successfully";
  } catch (error) {
    resData.message = "User creation failed";
  }
  return Response.json(resData);
}
