import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Banner from "@/lib/models/Banner";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { title, description, image } = await req.json()

    const existingBanner = await Banner.findOne({ title })

    const newBanner = await Banner.create({
      title,
      description,
      image,
    })

    await newBanner.save()

    return NextResponse.json(newBanner, { status: 200 })
  } catch (err) {
    console.log("[banner_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const banner = await Banner.find().sort({ createdAt: "desc" })

    return NextResponse.json(banner, { status: 200 })
  } catch (err) {
    console.log("[banner_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}


export const dynamic = "force-dynamic";
