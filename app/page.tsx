"use client";

import dynamic from "next/dynamic";

const Game = dynamic(() => import("./tetris/Game"), { ssr: false });

export default function Page() {
  return <Game />;
}
