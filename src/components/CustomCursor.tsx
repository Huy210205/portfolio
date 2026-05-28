import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values to stream mouse coordinates without triggering standard react state re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Instant direct performance spring settings to eliminate noticeable delay (matching normal mouse speed)
  const ringX = useSpring(mouseX, { damping: 45, stiffness: 1200, mass: 0.1 });
  const ringY = useSpring(mouseY, { damping: 45, stiffness: 1200, mass: 0.1 });

  // Direct fast spring configurations for the inner core pointer dot
  const dotX = useSpring(mouseX, { damping: 55, stiffness: 2000, mass: 0.05 });
  const dotY = useSpring(mouseY, { damping: 55, stiffness: 2000, mass: 0.05 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach listeners
    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hover state tracking on actionable elements (buttons, links)
    const updateHoverState = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, .cursor-pointer"
      );

      const addHover = () => setHovered(true);
      const removeHover = () => setHovered(false);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });

      return () => {
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", addHover);
          el.removeEventListener("mouseleave", removeHover);
        });
      };
    };

    const cleanupHover = updateHoverState();

    // Re-check action nodes whenever DOM changes to dynamic components (menu drawers, tabs)
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { childList: true, subtree: true });

    // CSS styling to hide default cursor dynamically on desktop browsers
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @media (min-width: 768px) {
        body, a, button, [role='button'], input, textarea, .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cleanupHover();
      observer.disconnect();
      document.head.removeChild(styleEl);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Outer fluid trailing ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 52 : 28,
          height: hovered ? 52 : 28,
          backgroundColor: hovered ? "rgba(222, 219, 200, 0.08)" : "rgba(222, 219, 200, 0)",
          borderColor: hovered ? "rgba(222, 219, 200, 0.65)" : "rgba(222, 219, 200, 0.35)",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.25 }}
        className="rounded-full border border-[#DEDBC8] absolute mix-blend-difference backdrop-blur-[1px]"
      />

      {/* Inner sharp point core */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.65 : 1.0,
          backgroundColor: hovered ? "#FFFFFF" : "#DEDBC8",
        }}
        transition={{ duration: 0.15 }}
        className="w-2.5 h-2.5 bg-[#DEDBC8] rounded-full absolute shadow-[0_0_8px_rgba(222,219,200,0.6)] mix-blend-difference"
      />
    </div>
  );
}
