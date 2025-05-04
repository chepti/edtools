// This is a standalone script to test MongoDB connection
// Run with: node -r dotenv/config src/scripts/test-mongodb.js

import mongoose from 'mongoose';

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  console.log('🔄 Attempting to connect to MongoDB...');
  
  try {
    await mongoose.connect(uri, { bufferCommands: false });
    
    console.log('✅ Successfully connected to MongoDB');
    console.log(`📊 Connection Details:`);
    console.log(`   - Host: ${mongoose.connection.host}`);
    console.log(`   - Database: ${mongoose.connection.name}`);
    console.log(`   - Ready State: Connected (${mongoose.connection.readyState})`);
    
    // List collections if any
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections: ${collections.length > 0 ? collections.map(c => c.name).join(', ') : 'No collections found'}`);
    
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB');
    console.error(`   Error: ${error.message}`);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.disconnect();
    console.log('🔌 Connection closed');
    process.exit(0);
  }
}

testConnection(); 