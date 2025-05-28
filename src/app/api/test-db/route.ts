import { NextResponse } from 'next/server';
import { testMongoDbConnection } from '@/utils/test-db-connection';

export async function GET() {
  try {
    const result = await testMongoDbConnection();
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, message: 'Failed to test connection', error: errorMessage },
      { status: 500 }
    );
  }
} 