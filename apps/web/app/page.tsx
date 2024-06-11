"use client"
import { Navbar } from "./components/Navbar/Navbar";
import { Task } from "./components/Task/Task";

export default function Page(): JSX.Element {
  return (
    <main className="bg-0 bg-cover min-h-screen">
      <Navbar />
      <Task />
    </main>
  );
}