import { useRef, useEffect, useCallback, useState } from "react";

/* ─── Amber + Coral/Terracotta Palette ─── */
/* Warm earth tones — "glowing ember" data visualization */
const GLOBE_COLOR = "rgba(0, 0, 0, 1)";
const GRID_COLOR = "rgba(255, 255, 255, 0.035)";
const LAND_FILL = "rgba(255, 255, 255, 0.08)";
const LAND_STROKE = "rgba(255, 255, 255, 0.15)";
const MARKER_COLOR = "#d97706";
const ARC_COLOR_A = "rgba(245, 158, 11, 0.45)";
const ARC_COLOR_B = "rgba(234, 122, 95, 0.4)";
const AUTO_ROTATE_SPEED = 0.002;
const DRAG_SENSITIVITY = 0.005;

/* ─── Entry animation config ─── */
const INTRO_DURATION = 2200;
const INTRO_SCALE_START = 0.55;
const INTRO_ROTATION_SWEEP = 1.2;

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const MARKERS: [number, number, string][] = [
  [40.7128, -74.006, "New York"],
  [51.5074, -0.1278, "London"],
  [35.6762, 139.6503, "Tokyo"],
  [1.3521, 103.8198, "Singapore"],
  [19.076, 72.8777, "Mumbai"],
  [25.2048, 55.2708, "Dubai"],
  [-33.8688, 151.2093, "Sydney"],
  [31.2304, 121.4737, "Shanghai"],
  [37.5665, 126.978, "Seoul"],
  [52.52, 13.405, "Berlin"],
  [-23.5505, -46.6333, "Sao Paulo"],
  [55.7558, 37.6173, "Moscow"],
  [39.9042, 116.4074, "Beijing"],
  [22.3193, 114.1694, "Hong Kong"],
  [48.8566, 2.3522, "Paris"],
  [28.6139, 77.209, "New Delhi"],
  [41.0082, 28.9784, "Istanbul"],
  [-1.2921, 36.8219, "Nairobi"],
  [30.0444, 31.2357, "Cairo"],
  [34.0522, -118.2437, "Los Angeles"],
];

const ARCS: [number, number][] = [
  [0, 1], [1, 9], [2, 7], [3, 4], [5, 4],
  [0, 10], [1, 5], [7, 8], [2, 6], [9, 14],
  [12, 13], [3, 2], [15, 3], [16, 5], [17, 18],
  [0, 19], [1, 11], [4, 15],
];

const CONTINENTS: number[][][] = [
  [[-130, 55], [-120, 60], [-110, 65], [-95, 70], [-80, 65], [-75, 60], [-65, 50], [-65, 45], [-75, 35], [-80, 30], [-85, 25], [-90, 20], [-100, 20], [-105, 25], [-115, 30], [-120, 35], [-125, 45], [-130, 55]],
  [[-80, 10], [-75, 5], [-70, 10], [-60, 5], [-50, 0], [-45, -5], [-40, -10], [-38, -15], [-40, -22], [-45, -25], [-50, -30], [-55, -35], [-60, -40], [-65, -50], [-70, -55], [-75, -50], [-72, -40], [-70, -30], [-70, -20], [-75, -10], [-80, 0], [-80, 10]],
  [[-10, 40], [-5, 45], [0, 48], [5, 50], [10, 55], [15, 55], [25, 60], [30, 65], [35, 70], [30, 70], [20, 65], [10, 60], [5, 55], [0, 50], [-5, 48], [-10, 42], [-10, 40]],
  [[-15, 30], [-5, 35], [10, 37], [15, 33], [25, 32], [30, 30], [35, 25], [40, 15], [50, 12], [48, 5], [42, 0], [35, -5], [30, -15], [35, -25], [30, -30], [25, -35], [20, -35], [15, -30], [12, -20], [10, -10], [5, 0], [0, 5], [-5, 5], [-10, 10], [-18, 15], [-17, 20], [-15, 25], [-15, 30]],
  [[30, 65], [40, 65], [50, 55], [60, 55], [70, 60], [80, 65], [90, 65], [100, 60], [110, 55], [120, 55], [130, 50], [140, 45], [145, 40], [140, 35], [130, 30], [120, 25], [115, 20], [110, 15], [105, 10], [100, 5], [95, 10], [90, 20], [85, 25], [80, 30], [75, 30], [70, 25], [65, 25], [60, 30], [50, 30], [45, 35], [40, 40], [30, 45], [25, 50], [25, 55], [30, 60], [30, 65]],
  [[115, -15], [120, -15], [130, -12], [135, -15], [140, -18], [145, -20], [150, -25], [153, -28], [152, -33], [150, -37], [145, -39], [140, -38], [135, -35], [130, -32], [125, -33], [118, -35], [115, -33], [113, -25], [115, -20], [115, -15]],
];

function degToRad(d: number) { return (d * Math.PI) / 180; }

function latLngToXYZ(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = degToRad(90 - lat);
  const theta = degToRad(lng);
  return [radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)];
}

function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

function project(x: number, y: number, z: number, cx: number, cy: number, scale: number): [number, number, number] {
  return [cx + x * scale, cy - y * scale, z];
}

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: -0.3, y: 0 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const introStartRef = useRef<number>(0);
  const introCompleteRef = useRef(false);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const markerPositionsRef = useRef<{ x: number; y: number; label: string; z: number }[]>([]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = performance.now();
    if (introStartRef.current === 0) introStartRef.current = now;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const introElapsed = now - introStartRef.current;
    const introRaw = Math.min(introElapsed / INTRO_DURATION, 1);
    const introScale = easeOutExpo(introRaw);
    const introOpacity = easeOutCubic(Math.min(introRaw * 1.5, 1));
    const introRotation = (1 - easeOutExpo(introRaw)) * INTRO_ROTATION_SWEEP;
    if (introRaw >= 1) introCompleteRef.current = true;

    const markersProgress = easeOutCubic(Math.max(0, (introRaw - 0.4) / 0.6));
    const arcsProgress = easeOutCubic(Math.max(0, (introRaw - 0.55) / 0.45));

    const cx = w / 2;
    const cy = h / 2;
    const baseRadius = Math.min(w, h) * 0.46;
    const radius = baseRadius * (INTRO_SCALE_START + (1 - INTRO_SCALE_START) * introScale);
    const scale = radius;

    const rotXVal = rotationRef.current.x;
    const rotYVal = rotationRef.current.y + introRotation;

    if (!isDragging.current) {
      rotationRef.current.y += AUTO_ROTATE_SPEED;
    }
    timeRef.current += 0.016;

    ctx.globalAlpha = introOpacity;

    /* Atmosphere glow */
    const atmosGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.4);
    atmosGrad.addColorStop(0, "transparent");
    atmosGrad.addColorStop(0.4, `rgba(255, 255, 255, ${0.03 * introScale})`);
    atmosGrad.addColorStop(1, "transparent");
    ctx.fillStyle = atmosGrad;
    ctx.fillRect(0, 0, w, h);

    /* Globe sphere */
    const sphereGrad = ctx.createRadialGradient(cx - radius * 0.25, cy - radius * 0.25, 0, cx, cy, radius);
    sphereGrad.addColorStop(0, "rgba(30, 30, 30, 0.4)");
    sphereGrad.addColorStop(0.6, "rgba(0, 0, 0, 0.35)");
    sphereGrad.addColorStop(1, "rgba(0, 0, 0, 0.25)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    /* Globe edge ring — soft faded blend */
    const edgeGrad = ctx.createRadialGradient(cx, cy, radius * 0.96, cx, cy, radius * 1.08);
    edgeGrad.addColorStop(0, "transparent");
    edgeGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.04)");
    edgeGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.06)");
    edgeGrad.addColorStop(0.8, "rgba(255, 255, 255, 0.03)");
    edgeGrad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
    ctx.lineWidth = radius * 0.12;
    ctx.strokeStyle = edgeGrad;
    ctx.stroke();

    /* Grid lines */
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 0.5;

    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lng = 0; lng <= 360; lng += 3) {
        let [x, y, z] = latLngToXYZ(lat, lng, 1);
        [x, y, z] = rotateX(x, y, z, rotXVal);
        [x, y, z] = rotateY(x, y, z, rotYVal);
        if (z < -0.1) { started = false; continue; }
        const [px, py] = project(x, y, z, cx, cy, scale);
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    for (let lng = 0; lng < 360; lng += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 3) {
        let [x, y, z] = latLngToXYZ(lat, lng, 1);
        [x, y, z] = rotateX(x, y, z, rotXVal);
        [x, y, z] = rotateY(x, y, z, rotYVal);
        if (z < -0.1) { started = false; continue; }
        const [px, py] = project(x, y, z, cx, cy, scale);
        if (!started) { ctx.moveTo(px, py); started = true; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    /* Continent outlines */
    for (const continent of CONTINENTS) {
      ctx.beginPath();
      ctx.fillStyle = LAND_FILL;
      ctx.strokeStyle = LAND_STROKE;
      ctx.lineWidth = 0.8;
      let started = false;
      const projected: [number, number][] = [];
      let allVisible = true;

      for (const [lng, lat] of continent) {
        let [x, y, z] = latLngToXYZ(lat, lng, 1.001);
        [x, y, z] = rotateX(x, y, z, rotXVal);
        [x, y, z] = rotateY(x, y, z, rotYVal);
        if (z < -0.05) allVisible = false;
        const [px, py] = project(x, y, z, cx, cy, scale);
        projected.push([px, py]);
      }

      if (!allVisible) {
        for (let i = 0; i < continent.length; i++) {
          const [lng, lat] = continent[i];
          let [x, y, z] = latLngToXYZ(lat, lng, 1.001);
          [x, y, z] = rotateX(x, y, z, rotXVal);
          [x, y, z] = rotateY(x, y, z, rotYVal);
          if (z < -0.05) { started = false; continue; }
          const [px, py] = project(x, y, z, cx, cy, scale);
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      } else {
        for (let i = 0; i < projected.length; i++) {
          if (i === 0) ctx.moveTo(projected[i][0], projected[i][1]);
          else ctx.lineTo(projected[i][0], projected[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    /* Connection arcs */
    const markerPositions: { x: number; y: number; label: string; z: number }[] = [];

    if (arcsProgress > 0) {
      for (let a = 0; a < ARCS.length; a++) {
        const [fromIdx, toIdx] = ARCS[a];
        const [lat1, lng1] = MARKERS[fromIdx];
        const [lat2, lng2] = MARKERS[toIdx];

        let [x1, y1, z1] = latLngToXYZ(lat1, lng1, 1.005);
        [x1, y1, z1] = rotateX(x1, y1, z1, rotXVal);
        [x1, y1, z1] = rotateY(x1, y1, z1, rotYVal);

        let [x2, y2, z2] = latLngToXYZ(lat2, lng2, 1.005);
        [x2, y2, z2] = rotateX(x2, y2, z2, rotXVal);
        [x2, y2, z2] = rotateY(x2, y2, z2, rotYVal);

        if (z1 < -0.2 && z2 < -0.2) continue;

        const arcColor = a % 2 === 0 ? ARC_COLOR_A : ARC_COLOR_B;
        const progress = ((timeRef.current * 0.3 + a * 0.5) % 2);
        const drawProgress = Math.min(progress, 1);
        const fadeProgress = Math.max(0, progress - 0.5) / 1.5;

        ctx.beginPath();
        ctx.strokeStyle = arcColor;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = (0.5 - fadeProgress * 0.5) * arcsProgress;

        const steps = 30;
        const stepsToRender = Math.floor(steps * drawProgress);
        let arcStarted = false;

        for (let s = 0; s <= stepsToRender; s++) {
          const t = s / steps;
          const lat = lat1 + (lat2 - lat1) * t;
          const lng = lng1 + (lng2 - lng1) * t;
          const alt = 1.005 + Math.sin(t * Math.PI) * 0.12;

          let [ax, ay, az] = latLngToXYZ(lat, lng, alt);
          [ax, ay, az] = rotateX(ax, ay, az, rotXVal);
          [ax, ay, az] = rotateY(ax, ay, az, rotYVal);

          if (az < -0.1) { arcStarted = false; continue; }
          const [px, py] = project(ax, ay, az, cx, cy, scale);
          if (!arcStarted) { ctx.moveTo(px, py); arcStarted = true; }
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.globalAlpha = introOpacity;
      }
    }

    /* Market markers */
    if (markersProgress > 0) {
      for (const [lat, lng, label] of MARKERS) {
        let [x, y, z] = latLngToXYZ(lat, lng, 1.005);
        [x, y, z] = rotateX(x, y, z, rotXVal);
        [x, y, z] = rotateY(x, y, z, rotYVal);

        if (z < 0) continue;

        const [px, py] = project(x, y, z, cx, cy, scale);
        const depthAlpha = (0.4 + z * 0.6) * markersProgress;

        // Pulse ring
        const pulse = Math.sin(timeRef.current * 2 + lat * 0.1) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(px, py, (5 + pulse * 5) * markersProgress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 119, 6, ${0.05 * depthAlpha})`;
        ctx.fill();

        // Outer glow
        ctx.beginPath();
        ctx.arc(px, py, 3.5 * markersProgress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${0.2 * depthAlpha})`;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(px, py, 2.2 * markersProgress, 0, Math.PI * 2);
        ctx.fillStyle = MARKER_COLOR;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();
        ctx.globalAlpha = introOpacity;

        markerPositions.push({ x: px, y: py, label, z });
      }
    }

    markerPositionsRef.current = markerPositions;
    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [render]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let found: string | null = null;
      for (const m of markerPositionsRef.current) {
        const dist = Math.sqrt((mx - m.x) ** 2 + (my - m.y) ** 2);
        if (dist < 12) { found = m.label; break; }
      }
      setHoveredMarker(found);
    }

    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    rotationRef.current.y += dx * DRAG_SENSITIVITY;
    rotationRef.current.x = Math.max(-1.2, Math.min(1.2, rotationRef.current.x + dy * DRAG_SENSITIVITY));
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const tooltipMarker = markerPositionsRef.current.find((m) => m.label === hoveredMarker);

  return (
    <div className="relative w-full h-full select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: isDragging.current ? "grabbing" : "grab", touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {hoveredMarker && tooltipMarker && (
        <div
          className="absolute pointer-events-none flex items-center gap-1.5 px-2.5 py-1.5 text-white/80"
          style={{
            left: tooltipMarker.x,
            top: tooltipMarker.y - 28,
            transform: "translateX(-50%)",
            fontSize: "var(--text-2xs)",
            background: "rgba(12,8,6,0.88)",
            backdropFilter: "blur(8px)",
            borderRadius: "var(--radius-element)",
            border: "1px solid rgba(217, 119, 6, 0.12)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: MARKER_COLOR }} />
          {hoveredMarker}
        </div>
      )}
    </div>
  );
}