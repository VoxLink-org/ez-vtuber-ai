"use client"

import { useEffect, useRef, useState } from "react"
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

  useEffect(() => {
    
    const container = containerRef.current
    if (!container) return


    const loadPIXI = async () => {
      try {
        // Load PIXI from CDN if not already loaded
        if (!window.PIXI) {
          console.log("Loading PIXI from CDN");
          await Promise.all([
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.3.0/pixi.min.js"),
            loadScript("https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.1/dist/index.min.js")
          ])
        }

        const app = new window.PIXI.Application({
          backgroundAlpha: 0,
          resizeTo: container
        })

        container.appendChild(app.view)

        const model = await window.PIXI.live2d.Live2DModel.from(cubism2Model)
        model.scale.set(0.3)
        app.stage.addChild(model)

        setLoading(false)
        return app;

      } catch (err) {
        console.error("Failed to load Live2D model:", err)
        setError("Failed to load avatar")
        setLoading(false)
      }

      
    }

    const appPromise = loadPIXI()

    return () => {
      appPromise.then((app) => app.destroy(true, true))
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
    </div>
  )
}
