import socketModel from "@/Models/Sockets";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams;
    const id = url.get("id");
    const socket = url.get("socket");
    console.log("id", id);
    console.log("socket", socket);

    await dbConnect();
    const r: RecepsSocket = await socketModel.findOneAndUpdate(
      { userId: id },
      { $set: { socketId: socket } },
      { upsert: true, new: true }
    );
    console.log(r);
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
