# Supabase Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
# Get these from your Supabase project dashboard
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How to Get Supabase Credentials

1. Go to [Supabase Console](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Go to Settings → API
4. Copy the `Project URL` and `anon public` key
5. Add them to your `.env.local` file

## Database Table Setup

Create a table called `quiz_submissions` in your Supabase database with the following SQL:

```sql
CREATE TABLE quiz_submissions (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  archetype TEXT NOT NULL,
  answers JSONB,
  keep_in_loop BOOLEAN DEFAULT false,
  quiz_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_quiz_submissions_email ON quiz_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_quiz_submissions_created_at ON quiz_submissions(created_at);
```

## What Gets Stored

When a user completes the quiz and submits their email, the following data is stored in Supabase:

```json
{
  "email": "user@example.com",
  "archetype": "queen",
  "answers": [
    {
      "questionId": "main",
      "selectedOption": "A",
      "path": "estrogen"
    },
    {
      "questionId": "estrogen_q1", 
      "selectedOption": "A",
      "path": "estrogen"
    }
    // ... more answers
  ],
  "keep_in_loop": true,
  "quiz_result": {
    "mainArchetype": "queen",
    "secondaryArchetype": "mother",
    "confidence": "high",
    "scores": [...]
  },
  "created_at": "2025-01-XX..."
}
```

## API Endpoints

- `POST /api/store-quiz-data` - Store quiz data
- `GET /api/store-quiz-data` - Get submission count (for admin use)

## Row Level Security (RLS)

For production, consider enabling Row Level Security:

```sql
-- Enable RLS
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting data (allow all inserts)
CREATE POLICY "Allow inserts" ON quiz_submissions
  FOR INSERT WITH CHECK (true);

-- Create policy for reading data (restrict to authenticated users or specific conditions)
CREATE POLICY "Allow reads" ON quiz_submissions
  FOR SELECT USING (true); -- Modify this based on your security needs
```

## Vercel Deployment

When deploying to Vercel, add these environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` 