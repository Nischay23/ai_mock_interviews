"use client";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

type FormType = "signUp" | "signIn";
const AuthFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "signUp"
        ? z.string().min(3)
        : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  // 1. Define your form.
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = AuthFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    try {
      setIsLoading(true);
      if (type === "signUp") {
        const { name, email, password } = values;

        const userCredentials =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success(
          "Account created successfully. Please sign in."
        );
        router.push("/signIn");
      } else {
        const { email, password } = values;

        const userCredential =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        const idToken =
          await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error(
            "Failed to sign in. Please try again."
          );
          return;
        }

        await signIn({
          email,
          idToken,
        });
        toast.success("Sign in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full p-8 max-sm:p-4 bg-background">
        {/* Main Content Container */}
        <div className="mx-auto space-y-12 h-full">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-8 h-[40vh]">
            {/* Left Text */}
            <div className="flex-1 space-y-6">
              <Skeleton className="h-12 w-3/4 rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-2/3 rounded-lg" />
                <Skeleton className="h-6 w-1/2 rounded-lg" />
              </div>
            </div>

            {/* Right Image */}
            <Skeleton className="flex-1 rounded-2xl" />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6">
            <Skeleton className="h-14 w-48 rounded-full" />
            <Skeleton className="h-14 w-48 rounded-full" />
          </div>

          {/* Cards Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-8 w-1/4 rounded-lg" />
              <Skeleton className="h-6 w-1/3 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                    <Skeleton className="h-6 w-1/2 rounded-lg" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isSignIn = type === "signIn";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10 ">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            height={32}
            width={38}
          />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practise Job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="email"
              type="email"
              placeholder="your email address"
            />
            <FormField
              control={form.control}
              name="password"
              label="password"
              type="password"
              placeholder="your password"
            />
            <Button type="submit" className="btn">
              {isSignIn ? "Sign In " : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn
            ? "Don't have an account?"
            : "Already have an account? "}
          <Link
            href={!isSignIn ? "/signIn" : "/signUp"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;
