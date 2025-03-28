import { Mic, Brain, MessageSquare, Youtube, Twitch, MessageCircle } from "lucide-react"
import FeatureCard from "@/components/feature-card"

export default function FeaturesSection() {
  return (
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Next-Gen VTuber Superpowers</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Elevate your virtual presence with cutting-edge AI and seamless platform integrations.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <FeatureCard
            icon={<Mic className="h-10 w-10 text-purple-500" />}
            title="Voice Recognition"
            description="Real-time voice detection and transcription for seamless interaction with your audience."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-purple-500" />}
            title="Emotion AI"
            description="Advanced AI that understands context and displays appropriate emotions on your avatar."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
            title="Interactive Chat"
            description="Respond to viewer messages with natural language processing and personality."
          />
          <FeatureCard
            icon={<Youtube className="h-10 w-10 text-purple-500" />}
            title="Live Streaming"
            description="Seamlessly link to YouTube, Twitch and TikTok Live with easy integration."
          />
        </div>
      </div>
  )
}