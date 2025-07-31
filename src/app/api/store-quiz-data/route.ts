import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, archetype, answers, keepInLoop, quizResult } = body;

    // Validate required fields
    if (!email || !archetype) {
      return NextResponse.json(
        { error: 'Email and archetype are required' },
        { status: 400 }
      );
    }

    // Create a unique key for this user
    const timestamp = new Date().toISOString();
    const userKey = `quiz_user:${email}:${timestamp}`;

    // Prepare the data to store
    const quizData = {
      email,
      archetype,
      answers,
      keepInLoop,
      quizResult,
      timestamp,
      createdAt: new Date().toISOString(),
    };

    // Store in Upstash Redis
    await redis.set(userKey, JSON.stringify(quizData));

    // Also store in a list for easy retrieval
    await redis.lpush('quiz_submissions', userKey);

    // Store email separately for email list (if keepInLoop is true)
    if (keepInLoop) {
      await redis.sadd('email_list', email);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quiz data stored successfully',
        userKey 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error storing quiz data:', error);
    return NextResponse.json(
      { error: 'Failed to store quiz data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all quiz submissions (for admin purposes)
    const submissions = await redis.lrange('quiz_submissions', 0, -1);
    const emailList = await redis.smembers('email_list');

    return NextResponse.json({
      submissions: submissions.length,
      emailList: emailList.length,
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve data' },
      { status: 500 }
    );
  }
} 