
'use client'

import { useRouter } from 'next/navigation'   // only takes what is needed for this code to work

export default function Welcome() {
  const router = useRouter()  // initialize the router for navigation

  

  return (
    <main className = "min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
    
    {/* Logo and Title */}

    <p className = "text-8xl mb-6">🌿</p>
    <h1 className = "text-5xl font-bold mb-4 text-green-400">Welcome to EcoMood</h1>

    {/* Tagline */}
    <p className = "text-blue-300 text-xl mb-12 text-center max-w-md">
      Helping communities understand and share their feelings about the environment around them.
    </p>


      {/* Features */}
      <div className="flex flex-col gap-4 mb-12 max-w-md w-full">
        <div className="bg-blue-900 rounded-xl p-4 flex gap-4 items-center">
          <span className="text-3xl">🗺️</span>
          <div>
            <p className="font-bold text-green-400">Live Environment Map</p>
            <p className="text-blue-300 text-sm">See real time environmental reports from your community</p>
          </div>
        </div>
        <div className="bg-blue-900 rounded-xl p-4 flex gap-4 items-center">
          <span className="text-3xl">🤖</span>
          <div>
            <p className="font-bold text-green-400">AI EcoReport</p>
            <p className="text-blue-300 text-sm">Daily AI analysis of your city's environmental health</p>
          </div>
        </div>
        <div className="bg-blue-900 rounded-xl p-4 flex gap-4 items-center">
          <span className="text-3xl">🌿</span>
          <div>
            <p className="font-bold text-green-400">Anonymous Reporting</p>
            <p className="text-blue-300 text-sm">Share your environment safely — no account needed</p>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <button
        onClick={() => router.push('/moodmap')}
        className="px-12 py-4 bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded-full transition-all duration-200"
      >
        Get Started 😎
      </button>

    </main>
  )
}

