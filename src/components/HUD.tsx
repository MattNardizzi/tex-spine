'use client'

import { useState } from 'react'

export default function HUD() {
  const [input, setInput] = useState('')

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Mutation Status (Left) */}
      <div className="absolute top-4 left-4 w-60 bg-black/50 p-4 rounded-xl pointer-events-auto backdrop-blur">
        <h2 className="text-cyan-300 font-bold text-sm">Mutation Status</h2>
        <p className="text-xs text-white mt-1">Evolving structure...</p>
      </div>

      {/* System Status (Right) */}
      <div className="absolute top-4 right-4 w-60 bg-black/50 p-4 rounded-xl pointer-events-auto backdrop-blur">
        <h2 className="text-green-400 font-bold text-sm">System Status</h2>
        <p className="text-xs text-white mt-1">All modules online</p>
      </div>

      {/* Input Box (Bottom) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3/5 pointer-events-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak to Tex..."
          className="w-full px-6 py-3 text-white bg-black/80 border border-cyan-400 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur"
        />
      </div>

      {/* Stock Ticker (Bottom-most) */}
      <div className="absolute bottom-4 left-0 w-full text-xs text-center text-cyan-300 pointer-events-auto animate-pulse">
        $AAPL ↑ 2.3% | $TSLA ↓ 1.1% | $ETH ↑ 4.8% | $SPY ↑ 0.6%
      </div>
    </div>
  )
}