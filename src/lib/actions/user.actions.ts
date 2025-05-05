'use server';

// import { revalidatePath } from 'next/cache'; // Removed unused import
import { connectToDatabase } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';
import { handleError } from '@/lib/utils'; // Assuming you have a handleError utility

// CREATE
export async function createUser(user: Partial<IUser>) {
  try {
    await connectToDatabase();

    // Clerk ID is used as the document _id
    const newUser = await User.create({ ...user, _id: user._id });
    if (!newUser) throw new Error('User creation failed');
    console.log('User created in DB:', newUser._id);
    // No need to return the full user object usually from a webhook handler
    return JSON.parse(JSON.stringify({ _id: newUser._id }));

  } catch (error) {
    handleError(error);
    return null; // Indicate failure
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');
    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    handleError(error);
    return null;
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: Partial<IUser>) {
  try {
    await connectToDatabase();

    // Find user by Clerk ID (_id in our schema) and update
    // Ensure _id is not included in the update payload itself
    const { _id, ...updateData } = user; // _id is intentionally unused here
    const updatedUser = await User.findByIdAndUpdate(clerkId, updateData, { new: true });

    if (!updatedUser) throw new Error('User update failed');
    console.log('User updated in DB:', updatedUser._id);
    // No need to return the full user object usually from a webhook handler
    return JSON.parse(JSON.stringify({ _id: updatedUser._id }));

  } catch (error) {
    handleError(error);
    return null;
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user by Clerk ID (_id in our schema) and delete
    const deletedUser = await User.findByIdAndDelete(clerkId);

    if (!deletedUser) throw new Error('User not found for deletion');
    console.log('User deleted from DB:', clerkId);

    // Optional: Revalidate relevant paths if user deletion affects public content
    // revalidatePath('/');

    return JSON.parse(JSON.stringify({ _id: clerkId })); // Indicate success

  } catch (error) {
    handleError(error);
    return null;
  }
} 