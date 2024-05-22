import dbConnect from "@/app/models/Index";

export async function POST(req) {
  const response = await req.json();
  const { Tweet } = await dbConnect();
  const { session, tweet } = response;

  const { user } = session;
  const { email } = user
  try {
    await Tweet.create({
      tweet,
      user,
      email,
    });
    return Response.json({
      message: "Tweet created successfully",
      status: true,
    });
  } catch (error) {
    return Response.json({ message: error.message, status: false });
  }
}
