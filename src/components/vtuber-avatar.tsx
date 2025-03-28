"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

type Emotion = "neutral" | "happy" | "excited" | "thinking" | "surprised"

const EMOTIONS: Record<Emotion, number> = {
  neutral: 0,
  happy: 1,
  excited: 2,
  thinking: 3,
  surprised: 4,
}

export default function VTuberAvatar() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div
        ref={containerRef}
        className="relative w-[300px] h-[300px] rounded-full border-4 border-purple-200 dark:border-purple-900 overflow-hidden bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
      />
    </div>
  )
}
