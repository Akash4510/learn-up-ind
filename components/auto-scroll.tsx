"use client";

import { useEffect, useRef } from "react";

interface AutoScrollProps {
  children: React.ReactNode;
  pauseDuration?: number;
  scrollDuration?: number;
}

export function AutoScroll({
  children,
  pauseDuration = 3000,
  scrollDuration = 500,
}: AutoScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const pauseRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let currentIndex = 0;
    const items = Array.from(container.children) as HTMLElement[];
    if (items.length === 0) return;

    const itemWidth = items[0].offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap) || 0;
    const scrollAmount = itemWidth + gap;

    const scrollToIndex = (index: number) => {
      if (index >= items.length) {
        currentIndex = 0;
        container.scrollTo({ left: 0, behavior: "instant" });
        return;
      }

      const targetScroll = index * scrollAmount;
      const startScroll = container.scrollLeft;
      const distance = targetScroll - startScroll;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const easeProgress = easeOutQuad(progress);

        container.scrollLeft = startScroll + distance * easeProgress;

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateScroll);
        } else {
          isScrolling = false;
          // Start pause timer
          pauseRef.current = setTimeout(() => {
            currentIndex++;
            scrollToIndex(currentIndex);
          }, pauseDuration);
        }
      };

      isScrolling = true;
      animationRef.current = requestAnimationFrame(animateScroll);
    };

    // Easing function
    const easeOutQuad = (t: number) => t * (2 - t);

    // Start scrolling after container is ready
    const initTimer = setTimeout(() => scrollToIndex(1), 1000);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (pauseRef.current) {
        clearTimeout(pauseRef.current);
        pauseRef.current = null;
      }
      isScrolling = false;
    };

    const handleMouseLeave = () => {
      if (!isScrolling) {
        scrollToIndex(currentIndex);
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(initTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (pauseRef.current) {
        clearTimeout(pauseRef.current);
        pauseRef.current = null;
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pauseDuration, scrollDuration]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory hidden-scrollbar"
      style={{ scrollBehavior: "smooth" }}
    >
      {children}
    </div>
  );
}
