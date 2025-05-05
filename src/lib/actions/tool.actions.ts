'use server';

import { connectToDatabase } from '@/lib/mongodb';
import Tool, { ITool } from '@/models/Tool';
import Tutorial from '@/models/Tutorial';
import Example from '@/models/Example';
import Review from '@/models/Review';
import Shelf from '@/models/Shelf';
import Rating from '@/models/Rating';
// import User from '@/models/User'; // Removed unused import
import { handleError } from '@/lib/utils';
import { FilterQuery } from 'mongoose'; // Removed unused import: Types

// Helper function to safely parse JSON - returns unknown
const parseJSON = (data: unknown): unknown => {
    try {
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null; // Or throw an error, depending on desired behavior
    }
}

// --- Define Serialized Type ---
// Represents the structure after JSON serialization (ObjectId becomes string, Dates become strings)
export type SerializedTool = Omit<ITool, '_id' | 'createdAt' | 'updatedAt'> & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

// Interface for GetTools parameters
interface GetToolsParams {
  query?: string; // Search query
  tags?: string[]; // Filter by tags
  isFree?: boolean;
  hebrewSupport?: boolean;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  limit?: number; // Pagination limit
  page?: number; // Pagination page
}

// --- GET ALL TOOLS (with optional filtering and search) ---
export async function getAllTools({ query, tags, isFree, hebrewSupport, difficultyLevel, limit = 12, page = 1 }: GetToolsParams): Promise<{ data: SerializedTool[], totalPages: number }> {
  try {
    await connectToDatabase();

    const conditions: FilterQuery<ITool> = {};

    // Build search condition (using text index)
    if (query) {
      conditions.$text = { $search: query };
    }

    // Build tag condition
    if (tags && tags.length > 0) {
      conditions.tags = { $in: tags };
    }
    // Build boolean filters
    if (isFree !== undefined) {
        conditions.isFree = isFree;
    }
    if (hebrewSupport !== undefined) {
        conditions.hebrewSupport = hebrewSupport;
    }
    // Build difficulty filter
    if (difficultyLevel) {
        conditions.difficultyLevel = difficultyLevel;
    }

    const skipAmount = (page - 1) * limit;

    // Fetch tools based on conditions
    const toolsQuery = Tool.find(conditions)
      .sort({ createdAt: 'desc' }) // Sort by newest first (optional)
      .skip(skipAmount)
      .limit(limit);

    const tools = await toolsQuery;
    const toolsCount = await Tool.countDocuments(conditions);

    const parsedTools = parseJSON(tools);

    // Check if parsing was successful before asserting type
    if (!parsedTools) {
        throw new Error("Failed to parse tools data");
    }

    return {
        data: parsedTools as SerializedTool[], // Assert type after successful parsing
        totalPages: Math.ceil(toolsCount / limit),
    };

  } catch (error) {
    handleError(error);
    return { data: [], totalPages: 0 }; // Return empty on error
  }
}

// --- GET TOOL BY ID (including related data) ---
export async function getToolById(toolId: string): Promise<any | null> { // Return type can be improved
    try {
        await connectToDatabase();
        const tool = await Tool.findById(toolId);
        if (!tool) throw new Error('Tool not found');

        const [tutorials, examples, reviews, ratings, relatedShelves] = await Promise.all([
            Tutorial.find({ toolId: tool._id }).sort({ createdAt: 'desc' }).lean(), // Use lean() for plain JS objects
            Example.find({ toolId: tool._id }).sort({ createdAt: 'desc' }).lean(),
            Review.find({ toolId: tool._id }).sort({ createdAt: 'desc' }).lean(),
            Rating.find({ ratedItemId: tool._id, ratedItemType: 'Tool' }).lean(),
            Shelf.find({ toolIds: tool._id }).select('_id name').limit(10).lean()
        ]);

        let averageRating = 0;
        if (ratings.length > 0) {
          const totalScore = ratings.reduce((sum, rating) => sum + (rating.score || 0), 0); // Add default for score
          averageRating = totalScore / ratings.length;
        }

        // Combine data - lean() already gives plain objects, less need for deep parseJSON
        const result = {
            ...(tool.toObject()), // Still need toObject() for the main tool document
            tutorials: tutorials, // Already plain objects from lean()
            examples: examples,
            reviews: reviews,
            averageRating: averageRating.toFixed(1),
            ratingsCount: ratings.length,
            relatedShelves: relatedShelves
        };

        // Final parse to ensure top-level dates/ObjectId are strings
        return parseJSON(result);

      } catch (error) {
        handleError(error);
        return null;
      }
}

// --- TODO: ADD ACTIONS FOR ADMINS (Create, Update, Delete Tools) ---
// Placeholder for createTool action (example)
/*
export async function createTool(toolData: Partial<ITool>) {
    try {
        await connectToDatabase();
        // Add validation and authorization checks (ensure user is admin)
        const newTool = await Tool.create(toolData);
        if (!newTool) throw new Error('Tool creation failed');
        // Optional: revalidate paths where tools are displayed
        // revalidatePath('/tools');
        return parseJSON(newTool);
    } catch (error) {
        handleError(error);
        return null;
    }
}
*/ 