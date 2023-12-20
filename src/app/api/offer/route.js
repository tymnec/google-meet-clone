import connectDB from "@/lib/mongodb";
import Offer from "@/models/offer";
import { NextResponse } from "next/server";

// Post Method
export async function POST(request) {
  try {
    const { temp } = await request.json();
    await connectDB();

    await Offer.create({
      temp: temp,
    });

    return NextResponse.json({
      success: 200,
      message: "Offer created successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: 500, message: error.message });
  }
}

// Get Method
export async function GET() {
  try {
    await connectDB();

    const offers = await Offer.find();

    return NextResponse.json({
      success: 200,
      offers: offers,
    });
  } catch (error) {
    return NextResponse.json({ success: 500, message: error.message });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const id = request.nextUrl.searchParams.get("id");
    await Offer.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Offer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
