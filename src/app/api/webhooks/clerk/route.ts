import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'
import { IUser } from '@/models/User' // Import IUser interface

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Extract the object type and event type
  const eventType = evt.type;
  console.log(`Webhook received: ${eventType}`);

  // Get the Clerk client instance
  const clerk = await clerkClient();

  // Handle the event
  if (eventType === 'user.created') {
    const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

    // Prepare user data for our database
    const user: Partial<IUser> = {
      _id: id, // Use Clerk ID as our _id
      // Construct displayName - prioritize username, then first/last, then email prefix
      displayName: username || `${first_name || ''} ${last_name || ''}`.trim() || email_addresses[0]?.email_address.split('@')[0] || `user_${id.substring(0, 6)}`,
      profilePictureUrl: image_url,
      // Role defaults to 'teacher' in the schema
    };

    console.log('Attempting to create user:', user._id);
    const newUser = await createUser(user);

    if (newUser) {
        // Optional: Set public metadata in Clerk (like our DB user ID if different, or role)
         await clerk.users.updateUserMetadata(id, {
           publicMetadata: {
             userId: newUser._id // Store our internal ID if needed elsewhere
           }
         })
      return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Failed to create user in DB' }, { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, image_url, first_name, last_name, username } = evt.data;

     // Prepare update data - only include fields that might change relevant to our DB
    const userUpdate: Partial<IUser> = {
      // Construct displayName - prioritize username, then first/last
      displayName: username || `${first_name || ''} ${last_name || ''}`.trim() || undefined, // Use undefined if no name parts exist
      profilePictureUrl: image_url,
    };

    // Filter out undefined values to avoid overwriting with nothing
    const cleanUpdateData = Object.fromEntries(
        Object.entries(userUpdate).filter(([_, v]) => v !== undefined) // Use _ to indicate unused key
    );

    // Only proceed if there's something to update
    if (Object.keys(cleanUpdateData).length > 0) {
        console.log('Attempting to update user:', id, 'with data:', cleanUpdateData);
        const updatedUser = await updateUser(id, cleanUpdateData);

        if (updatedUser) {
        return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });
        } else {
        return NextResponse.json({ message: 'Failed to update user in DB' }, { status: 500 });
        }
    } else {
        console.log('No relevant user data changed for update:', id);
        return NextResponse.json({ message: 'No update needed' }, { status: 200 });
    }
  }

   if (eventType === 'user.deleted') {
    const { id } = evt.data; // Make sure to get the id correctly based on the event payload structure for deletion

    if (!id) {
        console.error('Error: User deleted event missing id.');
        return NextResponse.json({ message: 'User ID missing in delete event' }, { status: 400 });
    }

    console.log('Attempting to delete user:', id);
    const deletedUser = await deleteUser(id);

    if (deletedUser) {
      return NextResponse.json({ message: 'User deleted successfully', userId: id }, { status: 200 });
    } else {
      // It might fail if the user wasn't in our DB to begin with, which might be ok
      console.warn('Failed to delete user from DB (might not have existed):', id);
      return NextResponse.json({ message: 'User deletion from DB failed or user not found' }, { status: 500 }); // Or 200 if not finding is ok
    }
  }

  // Fallback for unhandled event types
  console.log(`Webhook event type ${eventType} not handled.`);
  return new Response('', { status: 200 });
} 