import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import contentData from "../data/contentData.json";
import { ContentData } from "../types";
import { WordsPullUp } from "./AnimateText";

const data = contentData as unknown as ContentData;

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black p-4 sm:p-6 flex flex-col justify-center"
    >
      {/* Outer wrapper with card-style inset rounding */}
      <div className="relative w-full min-h-[calc(100vh-3rem)] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden flex items-center justify-center bg-zinc-950 border border-white/5">
        {/* Shared background so the hero always has depth on both desktop and mobile */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(222,219,200,0.20),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.10),_transparent_26%),linear-gradient(180deg,#111111_0%,#000000_72%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(222,219,200,0.03),_transparent_55%)] pointer-events-none z-10" />
        
        {/* Cinematic Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-x-0 top-0 h-full w-full object-cover object-center pointer-events-none z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ambient Noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.28] sm:opacity-[0.55] mix-blend-overlay pointer-events-none z-10" />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/70 sm:from-black/40 sm:via-black/10 sm:to-black/85 pointer-events-none z-10" />

        {/* Glowing visual backdrop */}
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#DEDBC8]/5 blur-[120px] rounded-full pointer-events-none z-10" />

        {/* Content Flow */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-20 px-6 sm:px-12 py-16">
          
          {/* Left Block text block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Main title wrapped in a repeating gentle floating motion */}
            <motion.h1
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#E1E0CC] tracking-tight leading-[1.05] mb-6 drop-shadow-[0_10px_20px_rgba(222,219,200,0.15)]"
            >
              <WordsPullUp text={data.hero.name} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-sans text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl"
              style={{ color: "rgba(225, 224, 204, 0.7)" }}
            >
              {data.hero.description}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => handleScrollTo("projects")}
                className="font-sans text-sm font-medium tracking-wide bg-[#DEDBC8] hover:bg-white text-black px-6 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 group shadow-lg shadow-black/30"
              >
                {data.hero.primaryBtnText}
                <div className="bg-black rounded-full w-7 h-7 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </button>
              
              <button
                onClick={() => handleScrollTo("contact")}
                className="font-sans text-sm font-medium tracking-wide bg-black/40 hover:bg-black/60 text-[#DEDBC8] hover:text-white border border-[#DEDBC8]/20 hover:border-[#DEDBC8]/40 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 active:scale-95 backdrop-blur-sm"
              >
                {data.hero.secondaryBtnText}
              </button>
            </motion.div>
          </div>

          {/* Right Block cybernetic placeholder with repeating animations */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 0.5, 0, -0.5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative lg:w-full w-[300px] sm:w-[340px] aspect-square flex items-center justify-center"
            >
              {/* Soft warm outline glow loop */}
              <motion.div
                animate={{
                  opacity: [0.35, 0.75, 0.35],
                  scale: [0.97, 1.04, 0.97]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-[#DEDBC8]/10 rounded-[2.5rem] blur-2xl -z-10"
              />

              {/* Liquid glass placeholder frame */}
              <div className="relative w-full h-full border border-white/10 bg-black/50 rounded-[2.2rem] backdrop-blur-md shadow-2xl overflow-hidden liquid-glass flex flex-col items-center justify-center p-8">
                
                {/* Rolling high-tech laser scanner line loop */}
                <motion.div
                  animate={{
                    top: ["0%", "100%", "0%"]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DEDBC8]/60 to-transparent shadow-[0_0_12px_#DEDBC8] pointer-events-none z-10"
                  style={{ top: "0%" }}
                />

                {/* Animated target layout rings inside */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-[180px] h-[180px] border border-dashed border-[#DEDBC8] rounded-full flex items-center justify-center"
                  >
                    <div className="w-[120px] h-[120px] border border-dotted border-[#DEDBC8] rounded-full" />
                  </motion.div>
                </div>

                {/* Central shining icon */}
                <motion.div
                  animate={{
                    scale: [0.93, 1.07, 0.93],
                    boxShadow: [
                      "0 0 10px rgba(222,219,200,0.1)",
                      "0 0 20px rgba(222,219,200,0.3)",
                      "0 0 10px rgba(222,219,200,0.1)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#DEDBC8] mb-4 shadow-inner"
                >
                  <span className="font-serif italic text-2xl font-bold select-none">*</span>
                </motion.div>

                {/* Descriptive subtexts */}
                <p className="font-mono text-[10px] tracking-widest text-[#DEDBC8] uppercase mb-1">
                  SECURE_SLOT_A1
                </p>
                <p className="font-sans text-xs text-gray-500 text-center leading-relaxed max-w-[200px]" style={{ color: "rgba(225, 224, 204, 0.55)" }}>
                  Avatar placeholder. Ready for external injection.
                </p>

                {/* Systems brand label */}
                <div className="absolute inset-x-0 bottom-0 py-6 text-center bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#DEDBC8]/40">
                    NQH.DEV // SYSTEMS ENGINE
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll down mouse */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 hidden sm:block">
          <motion.button
            onClick={() => handleScrollTo("about")}
            className="p-3 bg-black/60 border border-white/10 hover:border-[#DEDBC8]/30 rounded-full text-[#DEDBC8] hover:text-white transition-all cursor-pointer pointer-events-auto shadow-md backdrop-blur-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={14} />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
