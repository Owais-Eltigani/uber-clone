import { neon } from '@neondatabase/serverless';

require('dotenv').config();

const NEON_DB_URL = process.env.EXPO_PUBLIC_NEON_URL;

const sql = neon(NEON_DB_URL!);

export const POST = async (req: Request) => {
  const { name, email, clerk_id } = await req.json();

  //? check if all fields are present
  if (!name || !email || !clerk_id) {
    return new Response('Missing required fields', { status: 400 });
  }

  // console.log('(api)/user+api: ', { name, email, clerk_id });

  try {
    const user =
      await sql`INSERT INTO users (name, email, clerk_id) VALUES (${name}, ${email}, ${clerk_id})`;
    return new Response(JSON.stringify(user), {
      status: 201,
      statusText: 'User created successfully',
    });
  } catch (error) {
    console.log('(api)/user+api:error: ', error);

    return new Response(JSON.stringify(error), {
      status: 500,
      statusText: 'Internal server error',
    });
  }
};
