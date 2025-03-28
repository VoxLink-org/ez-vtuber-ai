"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

type Emotion = "neutral" | "happy" | "excited" | "thinking" | "surprised"

declare global {
  interface Window {
    PIXI: any
  }
}

const cubism2Model = "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json"

export default function VTuberAvatar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>("neutral")
  const [transcript, setTranscript] = useState("")
  const modelRef = useRef<any>(null)
  const appRef = useRef<any>(null)

  // Mock emotions with parameters for Live2D model
  const emotions = {
    neutral: { expression: "normal", motion: "idle" },
    happy: { expression: "happy", motion: "tap_body" },
    excited: { expression: "angry", motion: "tap_head" },
    thinking: { expression: "normal", motion: "pinch_in" },
    surprised: { expression: "surprised", motion: "shake" }
  }

  // Mock voice recognition
  const toggleListening = () => {
    setIsListening((prev) => !prev)

    if (!isListening) {
      const mockPhrases = [
        "Hello! How are you today?",
        "I'm excited to be streaming!",
        "Thanks for watching my stream",
        "What games should we play next?",
        "Don't forget to subscribe!",
      ]

      const mockEmotions: Emotion[] = ["neutral", "happy", "excited", "thinking", "surprised"]

      const transcriptionInterval = setInterval(() => {
        const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)]
        const randomEmotion = mockEmotions[Math.floor(Math.random() * mockEmotions.length)]

        setTranscript(randomPhrase)
        setCurrentEmotion(randomEmotion)
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 2000)
      }, 4000)

      return () => clearInterval(transcriptionInterval)
    }
  }

  const toggleSpeaking = () => {
    setIsSpeaking((prev) => !prev)
  }

  // Update model when emotion changes
  useEffect(() => {
    if (!modelRef.current) return

    const { expression, motion } = emotions[currentEmotion]
    try {
      modelRef.current.expression(expression)
      modelRef.current.motion(motion)
    } catch (err) {
      console.error("Failed to set emotion:", err)
    }
  }, [currentEmotion])

  // Handle mouth movement when speaking
  useEffect(() => {
    if (!modelRef.current) return

    if (isSpeaking) {
      // Start mouth movement
      const interval = setInterval(() => {
        try {
          modelRef.current.internalModel.eyeBlink = false
          modelRef.current.internalModel.mouth.openness = Math.random() * 0.5 + 0.5
        } catch (err) {
          console.error("Failed to animate mouth:", err)
        }
      }, 100)

      return () => clearInterval(interval)
    } else {
      // Reset mouth
      try {
        modelRef.current.internalModel.mouth.openness = 0
        modelRef.current.internalModel.eyeBlink = true
      } catch (err) {
        console.error("Failed to reset mouth:", err)
      }
    }
  }, [isSpeaking])

  // Initialize PIXI and Live2D model
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const loadPIXI = async () => {
      try {
        if (!window.PIXI) {
          await Promise.all([
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.3.0/pixi.min.js"),
            loadScript("https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.1/dist/index.min.js")
          ])
        }

        const app = new window.PIXI.Application({
          backgroundAlpha: 0,
          resizeTo: container
        })
        appRef.current = app
        container.appendChild(app.view)

        const model = await window.PIXI.live2d.Live2DModel.from(cubism2Model)
        modelRef.current = model
        model.scale.set(0.3)
        app.stage.addChild(model)

        setLoading(false)
      } catch (err) {
        console.error("Failed to load Live2D model:", err)
        setError("Failed to load avatar")
        setLoading(false)
      }
    }

    loadPIXI()

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, true)
      }
    }
  }, [])

  const loadScript = (url: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.src = url
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div
        ref={containerRef}
        className="relative w-[300px] h-[300px] rounded-full border-4 border-purple-200 dark:border-purple-900 overflow-hidden bg-gradient-to-b from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
      >
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            Loading avatar...
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            {error}
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="text-xl font-bold">Shizuku</h3>
        <p className="text-sm text-muted-foreground">Live2D VTuber</p>
      </div>

      {transcript && (
        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg max-w-xs">
          <p className="text-sm">{transcript}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <Button size="sm" variant={isListening ? "destructive" : "default"} onClick={toggleListening}>
          {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
          {isListening ? "Stop" : "Listen"}
        </Button>
        <Button size="sm" variant={isSpeaking ? "destructive" : "default"} onClick={toggleSpeaking}>
          {isSpeaking ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
          {isSpeaking ? "Mute" : "Speak"}
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {Object.keys(emotions).map((emotion) => (
          <Button
            key={emotion}
            size="sm"
            variant="outline"
            className={`capitalize ${currentEmotion === emotion ? "ring-2 ring-purple-500" : ""}`}
            onClick={() => setCurrentEmotion(emotion as Emotion)}
          >
            {emotion}
          </Button>
        ))}
      </div>
    </div>
  )
}
