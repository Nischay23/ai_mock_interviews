import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] =
    await Promise.all([
      await getInterviewByUserId(user?.id!),
      await getLatestInterviews({ userId: user?.id! }),
    ]);

  const hasPastInterviews = userInterviews?.length > 0;
  console.log("currentUser", user?.id);
  console.log("userInterviews", userInterviews?.length);

  const hasUpcomingInterivews =
    latestInterviews?.length > 0;
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>
            Get Interview-Ready with AI-powered Practise &
            Feedback
          </h2>
          <p className="text-lg">
            Practise on real interview questions & get
            instant feedback
          </p>

          <Button
            asChild
            className="btn-primary max-sm:w-full"
          >
            <Link href="/interview">
              Start an Interview
            </Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
              />
            ))
          ) : (
            <p className="text-center">
              You haven't taken any interviews yet. Start
              your first interview now.
            </p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterivews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                {...interview}
                key={interview.id}
              />
            ))
          ) : (
            <p className="text-center">
              There are no new Interviews available.
            </p>
          )}
        </div>
      </section>
    </>
  );
};
export default page;
