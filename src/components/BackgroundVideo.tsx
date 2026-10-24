import { useEffect, useRef } from 'react';
import { useGlobalMotion } from '../context/GlobalMotionContext';
import {
  calculateScrubTime,
  calculateBreathingState,
} from '../utils/heroLogic';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4';

export function BackgroundVideo() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rimGlowRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  const { signalsRef, reducedMotion } = useGlobalMotion();
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  // Desktop Mouse Scrubbing + Coordinated Breathing & Spatial Pose Loop
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const rimGlow = rimGlowRef.current;
    if (!video || !container || !wrapper) return;

    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    let rafId = 0;
    const startTime = performance.now() * 0.001;

    const updateLivingPresence = () => {
      const now = performance.now() * 0.001;
      const elapsed = now - startTime;
      const signals = signalsRef.current;

      if (!reducedMotionRef.current) {
        const breath = calculateBreathingState(elapsed);
        const pointerTx = signals.smoothX * 12;
        const pointerTy = signals.smoothY * 6.5;
        const rotateY = signals.smoothX * 2.6;
        const rotateX = -signals.smoothY * 1.8;

        // Scroll-linked recession into cosmic atmosphere (Hero -> Work transition)
        const heroScroll = Math.min(1, signals.scrollProgress * 3.2);
        const scrollRecedeY = heroScroll * -36;
        const scrollScale = 1 - heroScroll * 0.06;
        const scrollOpacity = Math.max(0.18, 1 - heroScroll * 0.72);

        const totalY = breath.floatY + pointerTy + scrollRecedeY;
        const totalScale = breath.scale * scrollScale;

        container.style.transform = `perspective(1200px) translate3d(${pointerTx.toFixed(
          2
        )}px, ${totalY.toFixed(2)}px, 0) scale(${totalScale.toFixed(
          4
        )}) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        wrapper.style.opacity = scrollOpacity.toFixed(3);

        if (rimGlow) {
          const highlightShiftX = 62 + signals.smoothX * 8;
          const highlightShiftY = 44 + signals.smoothY * 6;
          const glowAlpha = (0.28 + breath.rimGlow * 0.22).toFixed(3);
          rimGlow.style.background = `radial-gradient(circle at ${highlightShiftX.toFixed(
            1
          )}% ${highlightShiftY.toFixed(
            1
          )}%, rgba(133, 77, 255, ${glowAlpha}) 0%, rgba(106, 217, 255, 0.14) 35%, rgba(232, 200, 121, 0.08) 55%, transparent 75%)`;
        }
      } else {
        container.style.transform = 'none';
        wrapper.style.opacity = '1';
      }

      rafId = window.requestAnimationFrame(updateLivingPresence);
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
        reducedMotionRef.current ||
        coarsePointerQuery.matches
      ) {
        return;
      }

      if (!video.paused) {
        video.pause();
      }

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
    };

    rafId = window.requestAnimationFrame(updateLivingPresence);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerExit);
    window.addEventListener('blur', handlePointerExit);

    return () => {
      window.cancelAnimationFrame(rafId);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handlePointerExit);
      window.removeEventListener('blur', handlePointerExit);
    };
  }, [signalsRef]);

  // Mobile Autoplay & Reduced-Motion Hook
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyPlaybackMode = () => {
      if (reducedMotion) {
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
  }, [reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-[2] overflow-hidden pointer-events-none w-full aspect-square sm:aspect-video lg:aspect-auto lg:h-full transition-opacity duration-300"
    >
      {/* Pulsating Cosmic Rim-Light Aura Behind the Digital Human */}
      <div
        ref={rimGlowRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 64% 45%, rgba(133, 77, 255, 0.35) 0%, rgba(106, 217, 255, 0.14) 35%, transparent 72%)',
        }}
      />

      {/* Breathing & Pointer-Responsive 3D Human Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full will-change-transform digital-human-mask"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-label="魚橙子 YU CHENGZI Interactive 3D Digital Human Sculpture"
          className="w-full h-full object-cover object-[65%_center] lg:object-right-bottom opacity-92 mix-blend-normal"
        />

        {/* Subtle Cosmic Violet & Lavender Atmosphere Tint Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-tr from-[#0B071C]/65 via-[#21103F]/20 to-transparent mix-blend-multiply"
        />
      </div>

      {/* Seamless Multi-Stop Atmospheric Dissolves (Eliminates top/bottom/side hard cuts) */}
      <div
        aria-hidden="true"
        className="pointer-events-none lg:hidden absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B071C] via-[#0B071C]/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0B071C] via-[#0B071C]/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0B071C] via-[#0B071C]/65 to-transparent"
      />
    </div>
  );
}
