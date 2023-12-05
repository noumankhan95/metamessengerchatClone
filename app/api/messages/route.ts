import Usermodel from "@/Models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const r: User[] = await Usermodel.find({ conversationId: "asd" });
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
