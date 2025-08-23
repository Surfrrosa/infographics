import { motion } from "framer-motion"

// Top Shelf AI Stack (2025) — Radial / Constellation View
// Clean, opinionated map of the best tools by job-to-be-done
// TailwindCSS + SVG. Drag-free, screenshot-friendly.

export default function AIStackRadial() {
  const categories: { name: string; color: string; tools: string[]; blurb: string }[] = [
    {
      name: "Plan",
      color: "#60A5FA", // blue-400
      tools: ["Linear", "Notion"],
      blurb: "Where ideas become action."
    },
    {
      name: "Research",
      color: "#A78BFA", // violet-400
      tools: ["Perplexity", "Claude"],
      blurb: "Expand context. Find signal."
    },
    {
      name: "Build",
      color: "#34D399", // emerald-400
      tools: ["Devin", "GitHub Copilot"],
      blurb: "Ship product faster."
    },
    {
      name: "Design",
      color: "#F472B6", // pink-400
      tools: ["Figma", "Runway"],
      blurb: "Interfaces, visuals, motion."
    },
    {
      name: "Automate",
      color: "#FBBF24", // amber-400
      tools: ["Zapier AI", "n8n", "Make"],
      blurb: "Glue for your stack."
    },
    {
      name: "Store",
      color: "#4ADE80", // green-400
      tools: ["Airtable", "Pinecone", "Mem.ai"],
      blurb: "Databases + memory."
    },
    {
      name: "Distribute",
      color: "#F87171", // red-400
      tools: ["Substack", "Slack", "YouTube"],
      blurb: "Publish & grow."
    }
  ]

  // Layout constants
  const size = 800 // svg viewbox
  const cx = size / 2
  const cy = size / 2
  const coreR = 70
  const orbitInner = 150
  const orbitOuter = 300

  // Utility: polar → cartesian
  const polar = (r: number, thetaDeg: number) => {
    const t = (thetaDeg - 90) * (Math.PI / 180) // start at top
    return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-center text-3xl font-bold tracking-tight mb-2">
          ⚡️ Top Shelf AI Stack (2025)
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Pick one champion per slice. Build a stack you actually love.
        </p>

        <div className="relative rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl overflow-hidden">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {/* Background grid dots */}
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#27272a" />
              </pattern>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="0" y="0" width={size} height={size} fill="url(#dots)" />

            {/* Concentric orbits */}
            <circle cx={cx} cy={cy} r={orbitInner} fill="none" stroke="#27272a" />
            <circle cx={cx} cy={cy} r={(orbitInner + orbitOuter) / 2} fill="none" stroke="#27272a" />
            <circle cx={cx} cy={cy} r={orbitOuter} fill="none" stroke="#27272a" />

            {/* Core */}
            <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <circle cx={cx} cy={cy} r={coreR} fill="#0a0a0b" stroke="#3f3f46" />
              <text x={cx} y={cy - 6} textAnchor="middle" className="fill-white" style={{ fontSize: 14, fontWeight: 700 }}>
                Core LLM
              </text>
              <text x={cx} y={cy + 14} textAnchor="middle" className="fill-[#a1a1aa]" style={{ fontSize: 12 }}>
                ChatGPT · Claude
              </text>
            </motion.g>

            {/* Slices + Nodes */}
            {categories.map((cat, i) => {
              const angle = (360 / categories.length) * i
              const labelP = polar(orbitOuter + 28, angle)

              // 2–3 nodes per category along the orbits
              const nodeRadii = [orbitInner, (orbitInner + orbitOuter) / 2, orbitOuter]

              return (
                <g key={cat.name}>
                  {/* slice radial line */}
                  <line x1={cx} y1={cy} x2={polar(orbitOuter, angle).x} y2={polar(orbitOuter, angle).y} stroke="#27272a" />

                  {/* category label */}
                  <text x={labelP.x} y={labelP.y} textAnchor="middle" className="fill-white" style={{ fontSize: 12, fontWeight: 700 }}>
                    {cat.name}
                  </text>
                  <text x={labelP.x} y={labelP.y + 14} textAnchor="middle" className="fill-[#9ca3af]" style={{ fontSize: 11 }}>
                    {cat.blurb}
                  </text>

                  {cat.tools.map((tool, idx) => {
                    const r = nodeRadii[Math.min(idx, nodeRadii.length - 1)]
                    const jitter = (idx - 1) * 10 // subtle spread
                    const p = polar(r, angle + jitter)

                    return (
                      <motion.g key={tool} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * (i + idx) }}>
                        <circle cx={p.x} cy={p.y} r={12} fill={cat.color} filter="url(#glow)" />
                        <text x={p.x} y={p.y - 20} textAnchor="middle" className="fill-white" style={{ fontSize: 11, fontWeight: 700 }}>
                          {tool}
                        </text>
                      </motion.g>
                    )
                  })}
                </g>
              )
            })}
          </svg>

          {/* Legend + Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950/90 via-transparent">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="uppercase tracking-wide text-[10px] text-neutral-500">Legend</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#60A5FA' }} /> Plan</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#A78BFA' }} /> Research</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#34D399' }} /> Build</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#F472B6' }} /> Design</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} /> Automate</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#4ADE80' }} /> Store</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} /> Distribute</span>
            </div>
            <p className="mt-2 text-[11px] text-center text-neutral-500">
              Curated by <a href="https://nothingbutstatic.substack.com/" className="underline hover:text-white">nothing but static</a>
            </p>
          </div>
        </div>

        {/* Notes under the graphic */}
        <div className="max-w-3xl mx-auto mt-6 text-sm text-neutral-400 leading-relaxed">
          <p>
            • Use this like a circuit: choose one tool per slice to keep your stack minimal and lovable. Swap freely as needs evolve.
          </p>
          <p className="mt-1">
            • Center lists reflect <span className="text-neutral-300">popular, user-friendly defaults</span> without endorsing a single vendor.
          </p>
        </div>
      </div>
    </div>
  )
}
import { motion } from "framer-motion"

// Top Shelf AI Stack (2025) — Radial / Constellation View
// Clean, opinionated map of the best tools by job-to-be-done
// TailwindCSS + SVG. Drag-free, screenshot-friendly.

export default function AIStackRadial() {
  const categories: { name: string; color: string; tools: string[]; blurb: string }[] = [
    {
      name: "Plan",
      color: "#60A5FA", // blue-400
      tools: ["Linear", "Notion"],
      blurb: "Where ideas become action."
    },
    {
      name: "Research",
      color: "#A78BFA", // violet-400
      tools: ["Perplexity", "Claude"],
      blurb: "Expand context. Find signal."
    },
    {
      name: "Build",
      color: "#34D399", // emerald-400
      tools: ["Devin", "GitHub Copilot"],
      blurb: "Ship product faster."
    },
    {
      name: "Design",
      color: "#F472B6", // pink-400
      tools: ["Figma", "Runway"],
      blurb: "Interfaces, visuals, motion."
    },
    {
      name: "Automate",
      color: "#FBBF24", // amber-400
      tools: ["Zapier AI", "n8n", "Make"],
      blurb: "Glue for your stack."
    },
    {
      name: "Store",
      color: "#4ADE80", // green-400
      tools: ["Airtable", "Pinecone", "Mem.ai"],
      blurb: "Databases + memory."
    },
    {
      name: "Distribute",
      color: "#F87171", // red-400
      tools: ["Substack", "Slack", "YouTube"],
      blurb: "Publish & grow."
    }
  ]

  // Layout constants
  const size = 800 // svg viewbox
  const cx = size / 2
  const cy = size / 2
  const coreR = 70
  const orbitInner = 150
  const orbitOuter = 300

  // Utility: polar → cartesian
  const polar = (r: number, thetaDeg: number) => {
    const t = (thetaDeg - 90) * (Math.PI / 180) // start at top
    return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-center text-3xl font-bold tracking-tight mb-2">
          ⚡️ Top Shelf AI Stack (2025)
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Pick one champion per slice. Build a stack you actually love.
        </p>

        <div className="relative rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl overflow-hidden">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {/* Background grid dots */}
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="#27272a" />
              </pattern>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="0" y="0" width={size} height={size} fill="url(#dots)" />

            {/* Concentric orbits */}
            <circle cx={cx} cy={cy} r={orbitInner} fill="none" stroke="#27272a" />
            <circle cx={cx} cy={cy} r={(orbitInner + orbitOuter) / 2} fill="none" stroke="#27272a" />
            <circle cx={cx} cy={cy} r={orbitOuter} fill="none" stroke="#27272a" />

            {/* Core */}
            <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <circle cx={cx} cy={cy} r={coreR} fill="#0a0a0b" stroke="#3f3f46" />
              <text x={cx} y={cy - 6} textAnchor="middle" className="fill-white" style={{ fontSize: 14, fontWeight: 700 }}>
                Core LLM
              </text>
              <text x={cx} y={cy + 14} textAnchor="middle" className="fill-[#a1a1aa]" style={{ fontSize: 12 }}>
                ChatGPT · Claude
              </text>
            </motion.g>

            {/* Slices + Nodes */}
            {categories.map((cat, i) => {
              const angle = (360 / categories.length) * i
              const labelP = polar(orbitOuter + 28, angle)

              // 2–3 nodes per category along the orbits
              const nodeRadii = [orbitInner, (orbitInner + orbitOuter) / 2, orbitOuter]

              return (
                <g key={cat.name}>
                  {/* slice radial line */}
                  <line x1={cx} y1={cy} x2={polar(orbitOuter, angle).x} y2={polar(orbitOuter, angle).y} stroke="#27272a" />

                  {/* category label */}
                  <text x={labelP.x} y={labelP.y} textAnchor="middle" className="fill-white" style={{ fontSize: 12, fontWeight: 700 }}>
                    {cat.name}
                  </text>
                  <text x={labelP.x} y={labelP.y + 14} textAnchor="middle" className="fill-[#9ca3af]" style={{ fontSize: 11 }}>
                    {cat.blurb}
                  </text>

                  {cat.tools.map((tool, idx) => {
                    const r = nodeRadii[Math.min(idx, nodeRadii.length - 1)]
                    const jitter = (idx - 1) * 10 // subtle spread
                    const p = polar(r, angle + jitter)

                    return (
                      <motion.g key={tool} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * (i + idx) }}>
                        <circle cx={p.x} cy={p.y} r={12} fill={cat.color} filter="url(#glow)" />
                        <text x={p.x} y={p.y - 20} textAnchor="middle" className="fill-white" style={{ fontSize: 11, fontWeight: 700 }}>
                          {tool}
                        </text>
                      </motion.g>
                    )
                  })}
                </g>
              )
            })}
          </svg>

          {/* Legend + Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950/90 via-transparent">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="uppercase tracking-wide text-[10px] text-neutral-500">Legend</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#60A5FA' }} /> Plan</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#A78BFA' }} /> Research</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#34D399' }} /> Build</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#F472B6' }} /> Design</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#FBBF24' }} /> Automate</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#4ADE80' }} /> Store</span>
              <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: '#F87171' }} /> Distribute</span>
            </div>
            <p className="mt-2 text-[11px] text-center text-neutral-500">
              Curated by <a href="https://nothingbutstatic.substack.com/" className="underline hover:text-white">nothing but static</a>
            </p>
          </div>
        </div>

        {/* Notes under the graphic */}
        <div className="max-w-3xl mx-auto mt-6 text-sm text-neutral-400 leading-relaxed">
          <p>
            • Use this like a circuit: choose one tool per slice to keep your stack minimal and lovable. Swap freely as needs evolve.
          </p>
          <p className="mt-1">
            • Center lists reflect <span className="text-neutral-300">popular, user-friendly defaults</span> without endorsing a single vendor.
          </p>
        </div>
      </div>
    </div>
  )
}
