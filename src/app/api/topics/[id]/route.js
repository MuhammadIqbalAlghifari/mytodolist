import connectToMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/schema";
import { NextResponse } from "next/server";

export async function PUT(req, {params}) {
    const { id}  = params;
    const { newTittle: tittle, newDescription: description, newDate: date, newStatus: status } = await req.json();
    await connectToMongoDB();
    await Topic.findByIdAndUpdate(id, {tittle, description, date, status});
    return NextResponse.json({message: "Topic Updated"}, {status: 200})
}

export async function GET(req, {params}) {
    const { id } = params;
    await connectToMongoDB();
    const topic = await Topic.findOne({ _id: id});
    return NextResponse.json({topic}, {status: 200})
}