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
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "signUp") {
        toast.success(
          "Account created successfully. Please sign in."
        );
        router.push("/sign-in");
      } else {
        toast.success("Sign in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
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
            {isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;
