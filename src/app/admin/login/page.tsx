
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("token", token);
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="p-6 bg-card shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-foreground">
          Admin Login
        </h1>
        {error && <p className="text-destructive mb-4">{error}</p>}
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}