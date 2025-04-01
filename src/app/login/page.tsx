"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { AtSign, Lock } from "lucide-react";
import { signIn } from "next-auth/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
      const result = await await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.ok) {
        router.push("/");
      } else {
        alert("Login Error" + result?.error);
      }

      setLoading(false);
  }

  return (
    <div className="flex justify-around items-center w-full pt-4">
      <div className="p-6 rounded shadow-md ">
        <form onSubmit={handleSubmit} className="w-96">
          <div className="mx-auto mb-6 flex justify-center">
            <Logo size="xl" />
          </div>
          
          <h1 className="text-2xl font-bold mb-6 text-center">Login To Your Account</h1>
          
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