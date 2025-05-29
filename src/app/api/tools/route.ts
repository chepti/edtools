import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb'; // We will use mongoose.connect directly
import mongoose from 'mongoose';
import Tool from '@/models/Tool';
// import { getToken } from 'next-auth/jwt'; // Clerk is used for auth, not next-auth/jwt

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const newTool = new Tool(body);
    await newTool.save();
    return NextResponse.json({ success: true, data: newTool }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating tool:", error);
    let errorMessage = 'Failed to create tool';
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map((err: any) => err.message).join(', ');
      return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message || errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const tools = await Tool.find({}); // Fetch all tools
    return NextResponse.json({ success: true, data: tools }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching tools:", error);
    return NextResponse.json({ success: false, message: error.message || 'Failed to fetch tools' }, { status: 500 });
  }
}
