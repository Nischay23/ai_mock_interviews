import { db } from "@/firebase/admin";

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await await db
    .collection("interviews") // Accessing the collection
    .where("userId", "==", userId) // Chaining the `where` clause
    .orderBy("createdAt", "desc") // Ordering the results
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;
  const interviews = await db
    .collection("interviews") // Accessing the collection
    .orderBy("createdAt", "desc") // Ordering the results
    .where("finalized", "==", true)
    .where("userId", "!=", userId) // Chaining the `where` clause
    .limit(limit) // Limiting the results to 20
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewById(
  id: string
): Promise<Interview | null> {
  const interviews = await await db
    .collection("interviews") // Accessing the collection
    .doc(id)
    .get();
  return interviews.data() as Interview | null;
}
