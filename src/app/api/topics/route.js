import connectToMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { tittle, description, date, status } = await req.json();
    await connectToMongoDB();
    await Topic.create({ tittle, description, date, status });
    return NextResponse.json({message: "Topic created"}, {status: 201})
}

export async function GET() {
    await connectToMongoDB();
    const topics =  await Topic.find();
    return NextResponse.json({topics});
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectToMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message: "Topic Deleted"}, {status: 200});
}