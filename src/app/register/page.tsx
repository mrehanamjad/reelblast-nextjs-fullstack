"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { AtSign, Lock } from "lucide-react";
import { notifications } from "@mantine/notifications";

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
      notifications.show({
        title:"Passwords do not match",
        message: "",
        color:"red"
      })
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userName: getUsernameFromEmail(email), name: getUsernameFromEmail(email)}),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
         notifications.show({
        title:errorData.error,
        message: "Failed to register user.",
        color:"red",
      })
        throw new Error(errorData.message || "Registration failed");
      }
      
      // Successful registration, redirect to login
      router.push("/login");
    } catch (error) {
      console.log("Catch", error)
      console.error("Error registering user:", error);
      console.log(error instanceof Error ? error.message : "Failed to register user. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
<div
  className="flex justify-center items-center w-full pt-4 min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/loginbg.webp')" }}
>
  <div className="p-6 rounded-xl shadow-lg w-full sm:w-96 max-w-full bg-black/20 sm:bg-black/70">
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto mb-6 flex justify-center">
        <Logo size="xl" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold  text-center text-white">Create a new Account</h1>
 <div className="text-center text- mt-2 mb-6">
        Already have an account?{" "}
        <Link href="/login">
          <Button variant="light" size="compact-md" color=""> Login</Button>
        </Link>
      </div>
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
        className="mb-4 mt-6"
        color="cyan"
        variant="gradient"
      >
        Register
      </Button>
    </form>
  </div>
</div>

  );
}

export default Register;