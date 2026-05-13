import { useEffect, useRef, useCallback } from "react";
import {
  Color,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Fog,
  Vector2,
} from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import countries from "../../../imports/afghanistan-angola-geo-2.json";

const CAMERA_Z = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

export function World({ globeConfig, data }: WorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  const init = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /*
     * Clean editorial globe — white hexagons on dark body,
     * white atmosphere glow, amber/coral arcs, tiny points.
     */
    const cfg = {
      pointSize: 0.6,
      atmosphereColor: "#7a6f63",
      showAtmosphere: true,
      atmosphereAltitude: 0.06,
      polygonColor: "#ffffff",
      globeColor: "#000000",
      emissive: "#000000",
      emissiveIntensity: 0.0,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      ambientLight: "#ffffff",
      directionalLeftLight: "#ffffff",
      directionalTopLight: "#ffffff",
      pointLight: "#f59e0b",
      autoRotate: true,
      autoRotateSpeed: 0.5,
      ...globeConfig,
    };

    // --- Scene ---
    const scene = new Scene();
    scene.fog = new Fog(new Color("#030303"), 400, 2000);

    // --- Camera ---
    const camera = new PerspectiveCamera(50, width / height, 180, 1800);
    camera.position.set(0, 0, CAMERA_Z);

    // --- Renderer ---
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Post-processing: Bloom ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new Vector2(width, height),
      0.2,   // strength — very subtle, natural glow on arcs only
      0.3,   // radius — tight spread
      0.85   // threshold — only the brightest arcs/points bloom
    );
    composer.addPass(bloomPass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // --- Lights (neutral white for clean hex rendering) ---
    const ambient = new AmbientLight(new Color(cfg.ambientLight), 0.6);
    scene.add(ambient);

    const dirLeft = new DirectionalLight(
      new Color(cfg.directionalLeftLight),
      0.8
    );
    dirLeft.position.set(-400, 100, 400);
    scene.add(dirLeft);

    const dirTop = new DirectionalLight(new Color(cfg.directionalTopLight), 0.6);
    dirTop.position.set(-200, 500, 200);
    scene.add(dirTop);

    // Subtle warm rim for depth
    const rimLight = new DirectionalLight(new Color("#f59e0b"), 0.15);
    rimLight.position.set(300, -100, -200);
    scene.add(rimLight);

    const pLight = new PointLight(new Color(cfg.pointLight), 0.3);
    pLight.position.set(-200, 500, 200);
    scene.add(pLight);

    // --- Globe ---
    const globe = new ThreeGlobe();

    const mat = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
      transparent: boolean;
      opacity: number;
    };
    mat.color = new Color(cfg.globeColor);
    mat.emissive = new Color(cfg.emissive);
    mat.emissiveIntensity = cfg.emissiveIntensity;
    mat.shininess = cfg.shininess;
    mat.transparent = true;
    mat.opacity = 0.9;

    // Hex polygons — white dotted country outlines
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(cfg.showAtmosphere)
      .atmosphereColor(cfg.atmosphereColor)
      .atmosphereAltitude(cfg.atmosphereAltitude)
      .hexPolygonColor(() => cfg.polygonColor);

    // Arcs — amber/coral colors
    globe
      .arcsData(data)
      .arcStartLat((d) => (d as Position).startLat)
      .arcStartLng((d) => (d as Position).startLng)
      .arcEndLat((d) => (d as Position).endLat)
      .arcEndLng((d) => (d as Position).endLng)
      .arcColor((d) => (d as Position).color)
      .arcAltitude((d) => (d as Position).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(cfg.arcLength)
      .arcDashInitialGap((d) => (d as Position).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => cfg.arcTime);

    // Points at arc endpoints — pulsing breathing effect
    const pointsMap = new Map<string, any>();
    for (const arc of data) {
      const keyStart = `${arc.startLat},${arc.startLng}`;
      const keyEnd = `${arc.endLat},${arc.endLng}`;
      if (!pointsMap.has(keyStart)) {
        pointsMap.set(keyStart, {
          size: cfg.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        });
      }
      if (!pointsMap.has(keyEnd)) {
        pointsMap.set(keyEnd, {
          size: cfg.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }
    }

    globe
      .pointsData(Array.from(pointsMap.values()))
      .pointColor((d) => (d as { color: string }).color)
      .pointsMerge(false)
      .pointAltitude(0.05)
      .pointRadius(1.2);

    // Soft ripple rings at arc endpoints
    const ringsData = Array.from(pointsMap.values()).map((pt) => ({
      lat: pt.lat,
      lng: pt.lng,
      color: pt.color,
    }));

    globe
      .ringsData(ringsData)
      .ringColor(() => (t: number) => `rgba(245,158,11,${Math.max(0, 1 - t) * 0.8})`)
      .ringMaxRadius(5)
      .ringPropagationSpeed(2.5)
      .ringRepeatPeriod(1800)
      .ringAltitude(0.02);

    scene.add(globe);

    // --- Entry animation: scale-up + fade-in ---
    globe.scale.set(0.85, 0.85, 0.85);
    container.style.opacity = "0";
    const entryStart = performance.now();
    const ENTRY_DURATION = 1200; // ms

    // --- OrbitControls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = CAMERA_Z;
    controls.maxDistance = CAMERA_Z;
    controls.autoRotate = cfg.autoRotate;
    controls.autoRotateSpeed = cfg.autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // --- Animation loop ---
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const now = performance.now();

      // Entry animation
      const entryElapsed = now - entryStart;
      if (entryElapsed < ENTRY_DURATION) {
        // Ease-out cubic
        const t = Math.min(entryElapsed / ENTRY_DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const scale = 0.85 + 0.15 * eased;
        globe.scale.set(scale, scale, scale);
        container.style.opacity = String(eased);
      } else {
        globe.scale.set(1, 1, 1);
        container.style.opacity = "1";
      }

      // Pulsing/breathing points — gentle sine wave on altitude
      const pulseVal = Math.sin(now * 0.002) * 0.008 + 0.01; // oscillates 0.002 – 0.018
      globe.pointAltitude(pulseVal);

      controls.update();
      composer.render(); // use composer instead of renderer for bloom
    }
    animate();

    // --- Resize ---
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
      controls.dispose();
      composer.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, [globeConfig, data]);

  useEffect(() => {
    const cleanup = init();
    return () => cleanup?.();
  }, [init]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
