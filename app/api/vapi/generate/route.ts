import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json(
    { success: true, data: "Hello, World!" },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } =
    await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Generate interview questions matching these specs:
    
      Job Role: ${role}
      Experience Level: ${level}
      Tech Stack: ${techstack}
      Question Focus: ${type} (1=Behavioral, 10=Technical)
      Number of Questions: ${amount}
  
      Return ONLY a JSON array formatted like this:
      ["Question 1 text here", "Question 2 text here", "Question 3 text here"]
  
      Rules:
      1. No markdown/code formatting (remove all \`\`\`)
      2. No additional text/comments
      3. Use only double quotes
      4. No special characters (/,#*)
      5. Strict JSON syntax
      6. Max 20 words per question
  
      Bad Example (❌):
      \`\`\`javascript
      ["Question..."]
      \`\`\`
  
      Good Example (✅):
      ["How would you handle a conflict between team members?","What's your experience with CI/CD pipelines?"]
  
      Your response will be directly parsed with JSON.parse() - invalid formats will crash the app.`,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json(
      { success: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { success: false, error },
      { status: 500 }
    );
  }
}
