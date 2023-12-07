import Usermodel from "@/Models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import MessageModel from "@/Models/Messages";
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const r: Message[] = await MessageModel.find({ conversationId: "asd" });
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
    const { conversationId, message } = await req.json();
    await dbConnect();
    const r: User[] = await MessageModel.insertOne(
      { conversationId },
      { $push: { messages: { message } } }
    );
    return NextResponse.json({
      status: 1,
      data: { message: "DOne" },
    });
  } catch (e) {
    return NextResponse.json({
      status: 0,
      data: { message: "Coulndt Post Your Message" + e },
    });
  }
}
