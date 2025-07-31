import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    // Check if Supabase is configured
    if (!supabase) {
      console.log('Supabase not configured, logging data to console:', {
        email,
        archetype,
        answers,
        keepInLoop,
        quizResult
      });
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Quiz data logged (Supabase not configured)',
          data: { email, archetype }
        },
        { status: 200 }
      );
    }

    // Prepare the data to store
    const quizData = {
      email,
      archetype,
      answers,
      keep_in_loop: keepInLoop,
      quiz_result: quizResult,
      created_at: new Date().toISOString(),
    };

    // Store in Supabase
    const { data, error } = await supabase
      .from('quiz_submissions')
      .insert([quizData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to store quiz data' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quiz data stored successfully',
        data 
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
    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json({
        submissions: 0,
        message: 'Supabase not configured'
      });
    }

    // Get submission count (for admin purposes)
    const { count, error } = await supabase
      .from('quiz_submissions')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      submissions: count || 0,
    });
  } catch (error) {
    console.error('Error retrieving data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve data' },
      { status: 500 }
    );
  }
} 