import { ArrowRight, Sparkles } from "lucide-react"
import VTuberWrapper from "@/components/vtuber-wrapper"
import DemoSection from "@/components/demo-section"
import { Button } from "@/components/ui/button"
import FeaturesSection from "@/components/features-section"
import { getStarted } from '@/lib/utils';

export default function App() {

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              EZ VTuber AI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#demo" className="text-sm font-medium hover:text-primary">
              Demo
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </a>
          </nav>
          <div>
            <Button onClick={()=>getStarted('top')}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-purple-50 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Bring Your Virtual Avatar to Life Easily
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create, customize, and interact with your AI-powered VTuber. Express emotions, respond to viewers,
                    and stream with personality.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => {
                      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })

                      // alert('Our interactive demo allows you to chat with a virtual VTuber avatar. Try asking questions about games, music, or just say hello!')
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <VTuberWrapper />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <FeaturesSection />
        </section>
        
        {/* Demo Section */}
        <section id="demo" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See It In Action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Try our interactive demo to experience the power of AI-driven VTuber technology.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl mt-12">
              <DemoSection />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works for your streaming needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-muted-foreground">Perfect for beginners</p>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/Month</span>
                </div>
                <ul className="mt-4 space-y-2 flex-1">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Basic avatar customization
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Voice recognition
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    5 hours streaming/month
                  </li>
                </ul>
                <Button className="mt-6" onClick={()=>getStarted('Free')}>Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                  Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">For serious streamers</p>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$1</span>
                  <span className="text-muted-foreground">/Lifetime</span>
                </div>
                <ul className="mt-4 space-y-2 flex-1">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Advanced avatar customization
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Emotion AI & voice recognition
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Unlimited streaming
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Chat integration
                  </li>
                </ul>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700" onClick={()=>getStarted('Pro')}>Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Ultimate</h3>
                  <p className="text-muted-foreground">For professional VTubers</p>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/Month</span>
                </div>
                <ul className="mt-4 space-y-2 flex-1">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Custom avatar creation
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Advanced AI personality
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Unlimited streaming
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Youtube, TikTok and Twitch integration
                  </li>
                </ul>
                <Button className="mt-6" onClick={()=>getStarted('Ultimate')}>Get Started</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              EZ VTuber AI
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 EZ VTuber AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}