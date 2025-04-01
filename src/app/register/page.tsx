"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { AtSign, Lock } from "lucide-react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function getUsernameFromEmail(email:string) {
    if (typeof email !== 'string') {
      return null; // Or throw an error, depending on desired behavior
    }
  
    const atIndex = email.indexOf('@');
  
    if (atIndex === -1) {
      return null; // Or throw an error, if no '@' is found
    }
  
    return email.substring(0, atIndex);
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username: getUsernameFromEmail(email), name: getUsernameFromEmail(email)}),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      
      // Successful registration, redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error instanceof Error ? error.message : "Failed to register user. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-around items-center w-full pt-4">
      <div className="p-6 rounded shadow-md ">
        <form onSubmit={handleSubmit} className="w-96">
          <div className="mx-auto mb-6 flex justify-center">
            <Logo size="xl" />
          </div>
          
          <h1 className="text-2xl font-bold mb-6 text-center">Create a new Account</h1>

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
          
          <PasswordInput
            className="mb-6"
            leftSection={<Lock size={16} />}
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            loading={loading}
            className="mb-4"
            color="cyan"
           
          >
            Register
          </Button>
          
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;