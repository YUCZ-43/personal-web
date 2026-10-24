import { useEffect, useRef } from 'react';
import {
  calculateScrubTime,
  calculatePointerOffset,
  lerpValue,
} from '../utils/heroLogic';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';

export function BackgroundVideo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Restrained spatial interpolation state (ref-only to avoid React re-renders)
  const targetOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Desktop Mouse Scrubbing + Smooth Spatial Interpolation Hook
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    const animatePose = () => {
      const target = targetOffsetRef.current;
      const current = currentOffsetRef.current;

      current.x = lerpValue(current.x, target.x, 0.08);
      current.y = lerpValue(current.y, target.y, 0.08);

      const tx = (current.x * 10).toFixed(2);
      const ty = (current.y * 6).toFixed(2);
      const ry = (current.x * 2.2).toFixed(2);
      const rx = (-current.y * 1.6).toFixed(2);

      container.style.transform = `perspective(1200px) translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;

      if (
        Math.abs(target.x - current.x) > 0.002 ||
        Math.abs(target.y - current.y) > 0.002
      ) {
        rafIdRef.current = window.requestAnimationFrame(animatePose);
      } else {
        rafIdRef.current = null;
      }
    };

    const schedulePoseUpdate = () => {
      if (rafIdRef.current === null && !reducedMotionQuery.matches) {
        rafIdRef.current = window.requestAnimationFrame(animatePose);
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (
        window.innerWidth >= 1024 &&
        Math.abs(video.currentTime - targetTimeRef.current) > 0.015
      ) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (
        window.innerWidth < 1024 ||
        reducedMotionQuery.matches ||
        coarsePointerQuery.matches
      ) {
        return;
      }

      if (!video.paused) {
        video.pause();
      }

      // Smoothly update restrained spatial target offset
      const { nx, ny } = calculatePointerOffset(
        event.clientX,
        event.clientY,
        window.innerWidth,
        window.innerHeight
      );
      targetOffsetRef.current = { x: nx, y: ny };
      schedulePoseUpdate();

      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        targetTimeRef.current = video.currentTime || 0;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;

      if (!video.duration || Number.isNaN(video.duration)) {
        return;
      }

      const targetTime = calculateScrubTime(
        targetTimeRef.current,
        delta,
        window.innerWidth,
        video.duration
      );
      targetTimeRef.current = targetTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      }
    };

    const handlePointerExit = () => {
      prevXRef.current = null;
      targetOffsetRef.current = { x: 0, y: 0 };
      schedulePoseUpdate();
    };

    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerExit);
    window.addEventListener('blur', handlePointerExit);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handlePointerExit);
      window.removeEventListener('blur', handlePointerExit);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Mobile Autoplay & Reduced-Motion Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyPlaybackMode = () => {
      if (reducedMotionQuery.matches) {
        video.autoplay = false;
        video.pause();
        return;
      }

      if (window.innerWidth < 1024) {
        video.autoplay = true;
        video.loop = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked or pending interaction
          });
        }
      } else {
        video.autoplay = false;
        video.pause();
      }
    };

    applyPlaybackMode();
    window.addEventListener('resize', applyPlaybackMode);

    return () => {
      window.removeEventListener('resize', applyPlaybackMode);
    };
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-[#F5F6FA] lg:bg-transparent">
      <div
        ref={containerRef}
        className="w-full h-full will-change-transform transition-transform duration-300 ease-out"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-label="Interactive 3D iridescent human sculpture"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        />
      </div>
      {/* Subtle bottom gradient blend so the hero transitions cleanly into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAFAFC] via-[#FAFAFC]/60 to-transparent"
      />
    </div>
  );
}
