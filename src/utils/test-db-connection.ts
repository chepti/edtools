import clientPromise from '@/lib/mongodb';

/**
 * Tests the MongoDB connection
 * @returns {Promise<{ success: boolean, message: string, details?: any, error?: string }>} The result of the connection test
 */
export async function testMongoDbConnection(): Promise<{ success: boolean; message: string; details?: { host?: string | null }; error?: string }> {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    
      return {
        success: true,
      message: 'Successfully connected to MongoDB (via client.db().admin().ping())',
        details: {
        host: client.options.srvHost,
      }
    };
  } catch (error) {
    console.error("Error in testMongoDbConnection:", error);
    let errorMessage = "An unknown error occurred during DB connection test";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      message: 'Failed to connect to MongoDB or ping failed',
      error: errorMessage
    };
  }
} 