import { Server } from "Socket.IO";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import Usermodel from "@/Models/User";
import dbConnect from "@/lib/dbConnect";
export async function POST(req: NextRequest, res: any) {
  try {
    const { email, password, name } = await req.json();
    await dbConnect();
    const r = await Usermodel.create({ email, password, name });
    return NextResponse.json({
      status: 1,
      data: { message: "Done" },
    });
  } catch (e) {
    return NextResponse.json({
      status: 0,
      data: { message: "Coulndt COmplete Your Request" + e },
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams;
    const email = url.get("email");
    // console.log(email, "email");

    await dbConnect();
    const r: User[] = await Usermodel.find({ _id: email });
    return NextResponse.json({
      status: 1,
      data: { user: r[0] },
    });
  } catch (e) {
    return NextResponse.json({
      status: 0,
      data: { message: "Coulndt COmplete Your Request" + e },
    });
  }
}
