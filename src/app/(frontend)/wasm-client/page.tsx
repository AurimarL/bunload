"use client";

import { useEffect, useState } from "react";
import init, { add, greet } from "@/wasm";

export default function WasmDemoPage() {
  const [sum, setSum] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadWasm() {
      await init(); // initialize WASM module in the browser
      setSum(add(10, 20)); // call Rust function
      setMessage(greet("Aurimar")); // call Rust function
    }

    loadWasm();
  }, []);

  return (
    <div>
      <h2>Client-side WASM + Rust in Next.js</h2>
      <p>Add Result: {sum}</p>
      <p>Greeting: {message}</p>
    </div>
  );
}
