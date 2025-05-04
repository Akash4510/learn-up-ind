"use client";

import { useEffect, useRef, useState } from "react";

interface AutoScrollProps {
  children: React.ReactNode;
  pauseDuration?: number;
  scrollDuration?: number;
  infinite?: boolean;
}

export function AutoScroll({
  children,
  pauseDuration = 3000,
  scrollDuration = 500,
  infinite = true,
}: AutoScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const pauseRef = useRef<NodeJS.Timeout | null>(null);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];
    setItemsCount(items.length);
    if (items.length === 0) return;

    let isScrolling = false;
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap) || 0;
    const scrollAmount = itemWidth + gap;

    const scrollToIndex = (index: number) => {
      // Reset to first item if we've reached the end in infinite mode
      if (index >= items.length) {
        if (infinite) {
          // Instantly reset to first item without animation
          container.scrollTo({ left: 0, behavior: "instant" });
          currentIndex = 0;
          // Start scrolling to the next item after a brief pause
          pauseRef.current = setTimeout(() => {
            scrollToIndex(1);
          }, pauseDuration / 2); // Shorter pause when looping
          return;
        } else {
          // Stop at the last item
          isScrolling = false;
          return;
        }
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
          currentIndex = index;
          // Pause before next scroll
          pauseRef.current = setTimeout(() => {
            scrollToIndex(currentIndex + 1);
          }, pauseDuration);
        }
      };

      isScrolling = true;
      animationRef.current = requestAnimationFrame(animateScroll);
    };

    // Easing function
    const easeOutQuad = (t: number) => t * (2 - t);

    // Start scrolling
    const startScrolling = () => {
      if (items.length > 1) {
        scrollToIndex(1); // Start by scrolling to the second item
      }
    };

    const initTimer = setTimeout(startScrolling, 1000);

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
      if (!isScrolling && items.length > 1) {
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
  }, [pauseDuration, scrollDuration, infinite, itemsCount]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory hidden-scrollbar"
      style={{ scrollBehavior: "smooth" }}
    >
      {children}
      {/* Add cloned items for seamless infinite scroll */}
      {infinite && children}
    </div>
  );
}
