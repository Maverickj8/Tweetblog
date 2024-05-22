import dbConnect from "@/app/models/Index";

export async function GET() {
  try {
    const { Tweet } = await dbConnect();
    const posts = await Tweet.find();
    // console.log({posts: posts});
    return Response.json(posts)
  } catch (error) {
    console.log(error);
    return Response.json([])
  }
}