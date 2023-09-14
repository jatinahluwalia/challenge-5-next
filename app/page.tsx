"use client";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const user = useAuth();
  return <main></main>;
}
