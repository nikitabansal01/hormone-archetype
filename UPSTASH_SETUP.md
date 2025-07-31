# Upstash Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Upstash Redis Configuration
# Get these from your Upstash dashboard: https://console.upstash.com/
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here
```

## How to Get Upstash Credentials

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from your database details
4. Add them to your `.env.local` file

## What Gets Stored

When a user completes the quiz and submits their email, the following data is stored in Upstash:

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
  "keepInLoop": true,
  "quizResult": {
    "mainArchetype": "queen",
    "secondaryArchetype": "mother",
    "confidence": "high",
    "scores": [...]
  },
  "timestamp": "2025-01-XX...",
  "createdAt": "2025-01-XX..."
}
```

## Data Structure

- **Individual User Data**: Stored with key `quiz_user:{email}:{timestamp}`
- **Quiz Submissions List**: All submission keys stored in `quiz_submissions` list
- **Email List**: Emails stored in `email_list` set (only if keepInLoop is true)

## API Endpoints

- `POST /api/store-quiz-data` - Store quiz data
- `GET /api/store-quiz-data` - Get submission statistics (for admin use) 