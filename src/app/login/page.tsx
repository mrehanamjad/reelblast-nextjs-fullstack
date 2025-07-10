"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { AtSign, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.ok) {
        router.push("/");
      } else {

        notifications.show({
          title: result?.error,
          message:  "Please check the email and try again.",
          color: "red"
        })
      }

      setLoading(false);
  }

  return (
<div
  className="flex justify-center items-center w-full pt-4 min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/signupbg.webp')" }}
>
  <div className="p-6 rounded-xl shadow-lg w-full sm:w-96 max-w-full bg-black/20 sm:bg-black/70">
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto mb-6 flex justify-center">
        <Logo size="xl" />
      </div>
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">Login To Your Account</h1>
      
      <TextInput
        className="mb-4"
        leftSectionPointerEvents="none"
        leftSection={<AtSign size={16} />}
        label="Email"
        type="email"
        placeholder="your@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <PasswordInput
        className="mb-4"
        leftSection={<Lock size={16} />}
        label="Password"
        placeholder="Your password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <Button 
        type="submit" 
        fullWidth 
        loading={loading}
        className="mb-4 mt-6"
        color="cyan"
      >
        Login
      </Button>
      
      <div className="text-center mt-4">
        New to ReelBlast?{" "}
        <Link href="/register" className="text-cyan-500 hover:underline">
          Register Now
        </Link>
      </div>
    </form>
  </div>
</div>

  );
}

export default Login;