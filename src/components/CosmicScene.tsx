import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  useGlobalMotion,
  stepSharedMotionSignals,
} from '../context/GlobalMotionContext';
import { COSMIC_TOKENS } from '../data/designTokens';
import { calculateSpiralStarPoint } from '../utils/heroLogic';

// Pre-allocated module-scope colors to avoid GC in initialization/tick
const _colorCoreGold = new THREE.Color(COSMIC_TOKENS.colors.champagneGold);
const _colorElectricViolet = new THREE.Color(COSMIC_TOKENS.colors.electricViolet);
const _colorSoftLavender = new THREE.Color(COSMIC_TOKENS.colors.softLavender);
const _colorSpectralCyan = new THREE.Color(COSMIC_TOKENS.colors.spectralCyan);
const _colorTemp = new THREE.Color();

function createSoftStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.22, 'rgba(244, 240, 255, 0.85)');
    grad.addColorStop(0.55, 'rgba(188, 154, 255, 0.28)');
    grad.addColorStop(1, 'rgba(11, 7, 28, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function CosmicScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { signalsRef, reducedMotion, performanceTier } = useGlobalMotion();
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL vs GPU & verify WebGL availability
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl =
        probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl =
        /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebglSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COSMIC_TOKENS.colors.deepCosmicViolet, 0.028);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.1,
      120
    );
    camera.position.set(0, 2.2, 13.5);

    const starTexture = createSoftStarTexture();
    const budget = COSMIC_TOKENS.particles[performanceTier];

    // =========================================================================
    // LAYER A — Distant Star Field (Deep background atmosphere)
    // =========================================================================
    const distantGeo = new THREE.BufferGeometry();
    const distantCount = budget.distantStars;
    const distantPos = new Float32Array(distantCount * 3);
    const distantCol = new Float32Array(distantCount * 3);

    for (let i = 0; i < distantCount; i++) {
      const i3 = i * 3;
      const h1 = Math.sin(i * 19.13) * 43758.5453;
      const rx = (h1 - Math.floor(h1) - 0.5) * 65;
      const h2 = Math.sin(i * 47.71) * 43758.5453;
      const ry = (h2 - Math.floor(h2) - 0.5) * 42;
      const h3 = Math.sin(i * 91.37) * 43758.5453;
      const rz = -12 - (h3 - Math.floor(h3)) * 35;

      distantPos[i3] = rx;
      distantPos[i3 + 1] = ry;
      distantPos[i3 + 2] = rz;

      const mixRatio = i % 5 === 0 ? 0.65 : 0.25;
      _colorTemp
        .copy(_colorSoftLavender)
        .lerp(_colorSpectralCyan, mixRatio)
        .multiplyScalar(0.75);
      distantCol[i3] = _colorTemp.r;
      distantCol[i3 + 1] = _colorTemp.g;
      distantCol[i3 + 2] = _colorTemp.b;
    }

    distantGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(distantPos, 3)
    );
    distantGeo.setAttribute('color', new THREE.BufferAttribute(distantCol, 3));

    const distantMat = new THREE.PointsMaterial({
      size: 0.14,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const distantPoints = new THREE.Points(distantGeo, distantMat);
    scene.add(distantPoints);

    // =========================================================================
    // LAYER B — Andromeda-Inspired Spiral Galaxy Structure
    // =========================================================================
    const galaxyGroup = new THREE.Group();
    // Tilt the spiral galaxy disc for cinematic 3D perspective
    galaxyGroup.rotation.x = 0.58;
    galaxyGroup.rotation.z = -0.24;
    galaxyGroup.position.set(1.2, -0.4, -2.5);
    scene.add(galaxyGroup);

    const galaxyCount = budget.galaxySpiral;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPos = new Float32Array(galaxyCount * 3);
    const galaxyCol = new Float32Array(galaxyCount * 3);

    for (let i = 0; i < galaxyCount; i++) {
      const i3 = i * 3;
      const pt = calculateSpiralStarPoint(i, galaxyCount, 3, 14.5);
      galaxyPos[i3] = pt.x;
      galaxyPos[i3 + 1] = pt.y;
      galaxyPos[i3 + 2] = pt.z;

      if (pt.coreFactor > 0.72) {
        _colorTemp
          .copy(_colorCoreGold)
          .lerp(_colorSoftLavender, (1 - pt.coreFactor) * 2.2);
      } else if (pt.coreFactor > 0.35) {
        _colorTemp
          .copy(_colorElectricViolet)
          .lerp(_colorSoftLavender, (pt.coreFactor - 0.35) * 2.4);
      } else {
        _colorTemp
          .copy(_colorElectricViolet)
          .lerp(_colorSpectralCyan, (i % 7) / 10);
      }

      galaxyCol[i3] = _colorTemp.r;
      galaxyCol[i3 + 1] = _colorTemp.g;
      galaxyCol[i3 + 2] = _colorTemp.b;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyCol, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: 0.22,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
    galaxyGroup.add(galaxyPoints);

    // Luminous Galactic Core Halo Sprite
    const coreMat = new THREE.SpriteMaterial({
      map: starTexture,
      color: new THREE.Color(COSMIC_TOKENS.colors.champagneGold),
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const coreSprite = new THREE.Sprite(coreMat);
    coreSprite.scale.set(7.5, 7.5, 1);
    galaxyGroup.add(coreSprite);

    // =========================================================================
    // LAYER C — Interactive Foreground Particles (Pointer & Click Responsive)
    // =========================================================================
    const fgCount = budget.foregroundInteractive;
    const fgGeo = new THREE.BufferGeometry();
    const fgBasePos = new Float32Array(fgCount * 3);
    const fgLivePos = new Float32Array(fgCount * 3);
    const fgCol = new Float32Array(fgCount * 3);

    for (let i = 0; i < fgCount; i++) {
      const i3 = i * 3;
      const h1 = Math.sin(i * 31.17) * 43758.5453;
      const bx = (h1 - Math.floor(h1) - 0.5) * 18;
      const h2 = Math.sin(i * 63.29) * 43758.5453;
      const by = (h2 - Math.floor(h2) - 0.5) * 11;
      const h3 = Math.sin(i * 14.83) * 43758.5453;
      const bz = 2.5 + (h3 - Math.floor(h3)) * 5.5;

      fgBasePos[i3] = bx;
      fgBasePos[i3 + 1] = by;
      fgBasePos[i3 + 2] = bz;

      fgLivePos[i3] = bx;
      fgLivePos[i3 + 1] = by;
      fgLivePos[i3 + 2] = bz;

      const isGoldAccent = i % 4 === 0;
      _colorTemp.copy(isGoldAccent ? _colorCoreGold : _colorSoftLavender);
      fgCol[i3] = _colorTemp.r;
      fgCol[i3 + 1] = _colorTemp.g;
      fgCol[i3 + 2] = _colorTemp.b;
    }

    const fgPosAttr = new THREE.BufferAttribute(fgLivePos, 3);
    fgGeo.setAttribute('position', fgPosAttr);
    fgGeo.setAttribute('color', new THREE.BufferAttribute(fgCol, 3));

    const fgMat = new THREE.PointsMaterial({
      size: 0.32,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fgPoints = new THREE.Points(fgGeo, fgMat);
    scene.add(fgPoints);

    // =========================================================================
    // Render Loop with Software-WebGL Guard (`afterDraw`) & Context-Loss Safety
    // =========================================================================
    let frameId = 0;
    let isDisposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      if (isDisposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext | null;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (isDisposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      if (isDisposed) return;

      if (document.hidden) {
        frameId = window.setTimeout(tick, 250);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const signals = signalsRef.current;
      stepSharedMotionSignals(signals);

      const isReduced = reducedMotionRef.current;

      if (!isReduced) {
        // 1. Slow orbital rotation of galaxy + scroll-linked progression
        galaxyPoints.rotation.y =
          elapsed * 0.038 + signals.scrollProgress * 0.65;
        distantPoints.rotation.y = elapsed * 0.008;

        // 2. Damped camera parallax & scroll depth travel
        const targetCamX = signals.smoothX * 1.15;
        const targetCamY = 2.2 - signals.smoothY * 0.75 - signals.scrollProgress * 1.4;
        const targetCamZ = 13.5 - signals.scrollProgress * 2.6;

        camera.position.x += (targetCamX - camera.position.x) * 0.06;
        camera.position.y += (targetCamY - camera.position.y) * 0.06;
        camera.position.z += (targetCamZ - camera.position.z) * 0.06;
        camera.lookAt(0.4, -0.3, -2.5);

        // 3. Ambient pulse on galactic core & click energy ripple
        const pulseAge = performance.now() * 0.001 - signals.lastPulseTime;
        const clickBoost =
          pulseAge >= 0 && pulseAge < 1.8
            ? Math.sin((pulseAge / 1.8) * Math.PI) * 0.35
            : 0;

        const breathPulse = (Math.sin(elapsed * 0.88) + 1) * 0.5;
        coreMat.opacity = 0.36 + breathPulse * 0.12 + clickBoost * 0.4;
        const coreScale = 7.2 + breathPulse * 0.6 + clickBoost * 2.2;
        coreSprite.scale.set(coreScale, coreScale, 1);

        // 4. Update interactive foreground particles (pointer drift + click radial expansion)
        const pointerWorldX = signals.delayedX * 6.5;
        const pointerWorldY = -signals.delayedY * 4.2;

        for (let i = 0; i < fgCount; i++) {
          const i3 = i * 3;
          const bx = fgBasePos[i3];
          const by = fgBasePos[i3 + 1];
          const bz = fgBasePos[i3 + 2];

          const floatOffset = Math.sin(elapsed * 0.7 + i * 0.9) * 0.18;
          const dx = bx - pointerWorldX;
          const dy = by - pointerWorldY;
          const distSq = dx * dx + dy * dy + 0.5;
          const influence = Math.min(1.2, 1.8 / distSq);

          const pulseExpansion = clickBoost * 1.35;

          fgLivePos[i3] =
            bx + dx * influence * 0.22 + (bx * pulseExpansion) * 0.12;
          fgLivePos[i3 + 1] =
            by + floatOffset + dy * influence * 0.22 + (by * pulseExpansion) * 0.12;
          fgLivePos[i3 + 2] = bz;
        }
        fgPosAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    const handleResize = () => {
      if (isDisposed) return;
      camera.aspect = window.innerWidth / Math.max(1, window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
    };

    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('resize', handleResize, { passive: true });

    tick();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener(
        'webglcontextlost',
        handleContextLost
      );

      distantGeo.dispose();
      distantMat.dispose();
      galaxyGeo.dispose();
      galaxyMat.dispose();
      coreMat.dispose();
      fgGeo.dispose();
      fgMat.dispose();
      starTexture.dispose();
      renderer.dispose();
    };
  }, [performanceTier, signalsRef]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0B071C]"
    >
      {/* Continuous Atmospheric Nebula Base & Graceful Non-WebGL Fallback */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 68% 36%, rgba(133, 77, 255, 0.22) 0%, rgba(33, 16, 63, 0.45) 38%, rgba(11, 7, 28, 0.95) 78%),
            radial-gradient(circle at 24% 72%, rgba(106, 217, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 28%, rgba(232, 200, 121, 0.09) 0%, transparent 35%),
            linear-gradient(180deg, #130B2E 0%, #0B071C 45%, #160B30 82%, #0B071C 100%)
          `,
        }}
      />

      {/* Real-Time Three.js Andromeda Spiral Galaxy Mount */}
      {webglSupported && (
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
}
