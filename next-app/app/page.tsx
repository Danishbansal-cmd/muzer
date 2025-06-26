import { Button } from "@/components/ui/button";
import { AppBar } from "../components/Appbar";
import Link from "next/link";
import { Headphones, Radio, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* learn context api */}
      <AppBar showThemeSwitch={false}/>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Let Your Fans Choose the Beat
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Empower your audience to curate your music stream. Connect with
                fans like never before.
              </p>
            </div>

            <div className="space-x-4">
              <Link href={{
                pathname:"/auth",
                query: {
                  authType: "signUp"
                }
              }}>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Get Started
                </Button>
              </Link>
              <Button className="bg-purple-400 text-white hover:bg-white/90">Learn More</Button>
            </div>

          </div>
        </div>
      </main>

      <section className="w-full bg-gray-800 bg-opacity-50 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-white tracking-tighter sm:text-3xl">
            Key Features
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <Users className="h-12 w-12 text-yellow-400"/>
              <h3 className="text-xl font-bold text-white">Fan Interaction</h3>
              <p className="text-gray-400">Let Fans choose the music.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <Radio className="h-12 w-12 text-green-400" />
              <h3 className="text-white text-xl font-bold">Live Streaming</h3>
              <p className="text-gray-400">Steram with real-time input.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <Headphones className="h-12 w-12 text-blue-400" />
              <h3 className="text-white text-xl font-bold">High Quality Audio</h3>
              <p className="text-gray-400">Crystal clear sound quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-3 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                Ready to Transform Your Streams?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                Join MusicStreamChoice today and create unforgettable
                experiences.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <Link href={{
                pathname: "/auth",
                query: {
                  autyType: "signUp"
                }
              }}>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-700 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-400">
          © 2025 MusicStreamChoice. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link 
            className="text-xs text-gray-400 transition-colors hover:text-purple-400"
            href={"#"}
            >
              Terms of Service
          </Link>
          <Link
            className="text-xs text-gray-400 transition-colors hover:text-purple-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
