import ConversationModel from "@/Models/Conversations";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
type userConparam = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest) {
  try {
    const nurl = req.nextUrl.searchParams;
    const userId = nurl.get("id");
    await dbConnect();
    const r: User[] = await ConversationModel.find({ userId });
    return NextResponse.json({
      status: 1,
      data: { docs: r },
    });
  } catch (e) {
    return NextResponse.json({
      status: 0,
      data: { message: "Coulndt COmplete Your Request" + e },
    });
  }
}
export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json();

    await dbConnect();
    const r: User[] = await ConversationModel.findOneAndUpdate(
      { userId },
      { $push: { Conversations: message } },
      { upsert: true, new: true }
    );
    return NextResponse.json({
      status: 1,
      data: { docs: r },
    });
  } catch (e) {
    return NextResponse.json({
      status: 0,
      data: { message: "Coulndt COmplete Your Request" + e },
    });
  }
}
