import { Play, Pause } from 'lucide-react';
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types & Constants
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type PlayerVariant = 'custom' | 'waveform' | 'glassPill' | 'orb' | 'spotify';

const VARIANT_LABELS: Record<PlayerVariant, string> = {
  custom: 'Classic',
  waveform: 'Waveform',
  glassPill: 'Glass',
  orb: 'Orb',
  spotify: 'Spotify',
};

const VARIANT_ORDER: PlayerVariant[] = ['custom', 'waveform', 'glassPill', 'orb', 'spotify'];

const TOTAL_DURATION = 724;
const SEEK_STEP = 5; // seconds per arrow-key press
const COVER_IMAGE =
  'https://images.unsplash.com/photo-1652657201168-973a84230a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJicyUyMGJhc2lsJTIwcm9zZW1hcnl8ZW58MXx8fHwxNzcyMDI1MjY2fDA&ixlib=rb-4.1.0&q=80&w=400&utm_source=figma&utm_medium=referral';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared Context (playback state + variant)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  progress: number;
  isDragging: boolean;
}

interface PlayerContextType {
  variant: PlayerVariant;
  setVariant: (v: PlayerVariant) => void;
  playback: PlaybackState;
  togglePlay: () => void;
  setCurrentTime: (t: number) => void;
  setIsDragging: (d: boolean) => void;
  seekRelative: (delta: number) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  variant: 'custom',
  setVariant: () => {},
  playback: { isPlaying: false, currentTime: 0, progress: 0, isDragging: false },
  togglePlay: () => {},
  setCurrentTime: () => {},
  setIsDragging: () => {},
  seekRelative: () => {},
});

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<PlayerVariant>('custom');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTimeRaw] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const progress = currentTime / TOTAL_DURATION;

  const setCurrentTime = useCallback((t: number) => {
    setCurrentTimeRaw(Math.max(0, Math.min(TOTAL_DURATION, t)));
  }, []);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const seekRelative = useCallback(
    (delta: number) => {
      setCurrentTimeRaw((prev) => Math.max(0, Math.min(TOTAL_DURATION, prev + delta)));
    },
    []
  );

  // Playback tick
  useEffect(() => {
    if (isPlaying && !isDragging) {
      lastTimeRef.current = performance.now();
      const tick = (now: number) => {
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        setCurrentTimeRaw((prev) => {
          const next = prev + delta;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
        animationRef.current = requestAnimationFrame(tick);
      };
      animationRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, isDragging]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only respond if no input/textarea is focused
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekRelative(-SEEK_STEP);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        seekRelative(SEEK_STEP);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seekRelative]);

  const value = useMemo(
    () => ({
      variant,
      setVariant,
      playback: { isPlaying, currentTime, progress, isDragging },
      togglePlay,
      setCurrentTime,
      setIsDragging,
      seekRelative,
    }),
    [variant, isPlaying, currentTime, progress, isDragging, togglePlay, setCurrentTime, seekRelative]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

function usePlayer() {
  return useContext(PlayerContext);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Utilities
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function generateWaveform(count: number, seed: number = 42): number[] {
  const bars: number[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 16807 + 7) % 2147483647;
    const normalized = (s % 1000) / 1000;
    const center = Math.sin((i / count) * Math.PI);
    const value = 0.15 + (center * 0.55 + normalized * 0.3);
    bars.push(Math.min(1, value));
  }
  return bars;
}

/** Glass pill waveform — dramatic center peak, tiny dot-like edges */
function generateGlassWaveform(count: number, seed: number = 77): number[] {
  const bars: number[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 16807 + 7) % 2147483647;
    const normalized = (s % 1000) / 1000;
    // Steeper bell curve — edges are tiny, center is tall
    const t = i / (count - 1); // 0→1
    const bell = Math.pow(Math.sin(t * Math.PI), 1.8);
    const value = 0.06 + bell * 0.7 + normalized * 0.24;
    bars.push(Math.min(1, value));
  }
  return bars;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Reusable: Seek hook for progress bars
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useSeek(ref: React.RefObject<HTMLDivElement | null>) {
  const { setCurrentTime, setIsDragging, playback } = usePlayer();
  const { isDragging } = playback;

  const seekFromEvent = useCallback(
    (clientX: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setCurrentTime(ratio * TOTAL_DURATION);
    },
    [ref, setCurrentTime]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      seekFromEvent(e.clientX);
    },
    [setIsDragging, seekFromEvent]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      seekFromEvent(e.touches[0].clientX);
    },
    [setIsDragging, seekFromEvent]
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => seekFromEvent(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging, seekFromEvent, setIsDragging]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: TouchEvent) => seekFromEvent(e.touches[0].clientX);
    const end = () => setIsDragging(false);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging, seekFromEvent, setIsDragging]);

  return { handleMouseDown, handleTouchStart, seekFromEvent };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Reusable: Progress Bar with expanded touch target + hover tooltip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ProgressBar({
  height = 2,
  barColor = 'bg-white',
  trackColor = 'bg-[#4d4d4d]',
  gradient,
  rounded = false,
}: {
  height?: number;
  barColor?: string;
  trackColor?: string;
  gradient?: string;
  rounded?: boolean;
}) {
  const { playback } = usePlayer();
  const { progress } = playback;
  const ref = useRef<HTMLDivElement>(null);
  const { handleMouseDown, handleTouchStart } = useSeek(ref);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setHoverRatio(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  }, []);

  const hoverTime = hoverRatio !== null ? hoverRatio * TOTAL_DURATION : null;
  const roundedClass = rounded ? 'rounded-full' : '';

  return (
    <div
      ref={ref}
      className={`relative w-full cursor-pointer group ${roundedClass}`}
      style={{ height: 20 }} /* expanded touch target */
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverRatio(null)}
    >
      {/* Visual track — centered inside the 20px hit zone */}
      <div
        className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 ${trackColor} ${roundedClass}`}
        style={{ height }}
      >
        <div
          className={`h-full ${gradient ? '' : barColor} ${roundedClass} relative transition-[width] duration-75 ease-linear`}
          style={{
            width: `${progress * 100}%`,
            ...(gradient ? { background: gradient } : {}),
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            style={gradient ? { boxShadow: '0 0 6px rgba(176,31,36,0.4)' } : {}}
          />
        </div>
      </div>

      {/* Hover tooltip */}
      {hoverRatio !== null && hoverTime !== null && (
        <div
          className="absolute -top-7 pointer-events-none z-10 bg-black/80 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded tabular-nums whitespace-nowrap"
          style={{
            left: `clamp(16px, ${hoverRatio * 100}%, calc(100% - 16px))`,
            transform: 'translateX(-50%)',
          }}
        >
          {formatTime(hoverTime)}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Reusable: Play/Pause Button
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PlayPauseButton({
  size = 32,
  iconSize = 14,
  bg = 'bg-white',
  iconColor = 'text-black fill-black',
}: {
  size?: number;
  iconSize?: number;
  bg?: string;
  iconColor?: string;
}) {
  const { playback, togglePlay } = usePlayer();
  return (
    <button
      onClick={togglePlay}
      className={`flex-shrink-0 rounded-full ${bg} flex items-center justify-center hover:scale-[1.06] transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
      style={{ width: size, height: size }}
      aria-label={playback.isPlaying ? 'Pause' : 'Play'}
    >
      {playback.isPlaying ? (
        <Pause className={iconColor} style={{ width: iconSize, height: iconSize }} />
      ) : (
        <Play className={`${iconColor} ml-[1px]`} style={{ width: iconSize, height: iconSize }} />
      )}
    </button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 1: Classic (Spotify-compact)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CustomPlayer() {
  const { playback } = usePlayer();

  return (
    <div className="relative overflow-hidden bg-[#282828] shadow-lg shadow-black/40" style={{ borderRadius: 10 }}>
      <div className="flex items-center gap-3 p-2.5 pr-3">
        <div className="flex-1 min-w-0">
          <p className="text-white text-[13.5px] truncate">Qatar Fresh Herbs Market</p>
          <p className="text-[#a7a7a7] text-[11px] truncate mt-0.5">
            Audio Summary &middot; {formatTime(TOTAL_DURATION)}
          </p>
        </div>
        <span className="text-[#a7a7a7] text-[11px] tabular-nums flex-shrink-0">
          {formatTime(playback.currentTime)}
        </span>
        <PlayPauseButton size={38} iconSize={15} />
      </div>
      <div className="px-3 pb-3 -mt-0.5">
        <ProgressBar height={3} rounded />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 2: Waveform Scrubber
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WAVEFORM_BAR_COUNT = 60;

function WaveformPlayer() {
  const { playback, setCurrentTime, setIsDragging } = usePlayer();
  const { progress, isDragging, isPlaying, currentTime } = playback;
  const waveformRef = useRef<HTMLDivElement>(null);
  const bars = useMemo(() => generateWaveform(WAVEFORM_BAR_COUNT), []);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const seekFromEvent = useCallback(
    (clientX: number) => {
      if (!waveformRef.current) return;
      const rect = waveformRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setCurrentTime(ratio * TOTAL_DURATION);
    },
    [setCurrentTime]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      seekFromEvent(e.clientX);
    },
    [setIsDragging, seekFromEvent]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      seekFromEvent(e.touches[0].clientX);
    },
    [setIsDragging, seekFromEvent]
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => seekFromEvent(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging, seekFromEvent, setIsDragging]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: TouchEvent) => seekFromEvent(e.touches[0].clientX);
    const end = () => setIsDragging(false);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging, seekFromEvent, setIsDragging]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!waveformRef.current) return;
    const rect = waveformRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const idx = Math.floor(ratio * WAVEFORM_BAR_COUNT);
    setHoverIndex(Math.max(0, Math.min(WAVEFORM_BAR_COUNT - 1, idx)));
  }, []);

  const hoverTime =
    hoverIndex !== null ? (hoverIndex / WAVEFORM_BAR_COUNT) * TOTAL_DURATION : null;

  // Playhead position in %
  const playheadPercent = progress * 100;

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#1e1e1e] shadow-lg shadow-black/40 p-3 pb-2.5">
      {/* Top row: metadata + time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <PlayPauseButton size={28} iconSize={12} />
          <div className="min-w-0">
            <p className="text-white text-[13px] truncate">Qatar Fresh Herbs Market</p>
            <p className="text-[#a7a7a7] text-[10px] uppercase tracking-widest mt-px">Audio Summary</p>
          </div>
        </div>
        <span className="text-[#a7a7a7] text-[11px] tabular-nums flex-shrink-0 ml-3">
          {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
        </span>
      </div>

      {/* Waveform — center-aligned bars */}
      <div
        ref={waveformRef}
        className="relative flex items-center gap-[2px] h-[32px] cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {bars.map((amplitude, i) => {
          const barProgress = i / WAVEFORM_BAR_COUNT;
          const isPlayed = barProgress <= progress;
          const isHovered = hoverIndex !== null && i === hoverIndex;
          return (
            <div
              key={i}
              className="flex-1 rounded-full transition-colors duration-100"
              style={{
                height: `${amplitude * 100}%`,
                minHeight: 3,
                backgroundColor: isHovered
                  ? 'rgba(255,255,255,0.7)'
                  : isPlayed
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.18)',
              }}
            />
          );
        })}

        {/* Playhead line */}
        {currentTime > 0 && (
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-white/60 pointer-events-none z-10 transition-[left] duration-75 ease-linear"
            style={{ left: `${playheadPercent}%` }}
          />
        )}

        {/* Hover time tooltip — clamped */}
        {hoverIndex !== null && hoverTime !== null && (
          <div
            className="absolute -top-7 pointer-events-none z-20 bg-black/80 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded tabular-nums whitespace-nowrap"
            style={{
              left: `clamp(16px, ${(hoverIndex / WAVEFORM_BAR_COUNT) * 100}%, calc(100% - 16px))`,
              transform: 'translateX(-50%)',
            }}
          >
            {formatTime(hoverTime)}
          </div>
        )}
      </div>

      {/* Bottom status */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[#555] text-[10px]">
          {isPlaying ? 'Playing...' : 'Click waveform to seek'}
        </span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 3: Glass Pill (now with seeking + title)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const GLASS_BAR_COUNT = 42;

function GlassPillPlayer() {
  const { playback, setCurrentTime, setIsDragging } = usePlayer();
  const { isPlaying, currentTime, progress, isDragging } = playback;
  const bars = useMemo(() => generateGlassWaveform(GLASS_BAR_COUNT, 77), []);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Seeking on waveform
  const seekFromEvent = useCallback(
    (clientX: number) => {
      if (!waveformRef.current) return;
      const rect = waveformRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setCurrentTime(ratio * TOTAL_DURATION);
    },
    [setCurrentTime]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      seekFromEvent(e.clientX);
    },
    [setIsDragging, seekFromEvent]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      seekFromEvent(e.touches[0].clientX);
    },
    [setIsDragging, seekFromEvent]
  );

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: MouseEvent) => seekFromEvent(e.clientX);
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging, seekFromEvent, setIsDragging]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: TouchEvent) => seekFromEvent(e.touches[0].clientX);
    const end = () => setIsDragging(false);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', end);
    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [isDragging, seekFromEvent, setIsDragging]);

  return (
    <div className="relative space-y-2">
      {/* Title label */}
      <p className="text-white/30 text-[11px] tracking-[0.18em] uppercase pl-1">
        Audio Summary &middot; Qatar Fresh Herbs Market
      </p>

      {/* Glow behind pill */}
      <div
        className="absolute inset-0 top-6 rounded-full blur-xl transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(176,31,36,0.15) 0%, transparent 70%)',
          opacity: isPlaying ? 1 : 0,
        }}
      />

      <div className="relative inline-flex items-center gap-3.5 rounded-full bg-[#2a2a2a] border border-white/[0.08] px-2.5 py-2.5 pr-5 shadow-lg shadow-black/40 w-full">
        {/* Play button — larger */}
        <PlayPauseButton
          size={44}
          iconSize={17}
          bg="bg-[#b01f24] hover:bg-[#8f181d]"
          iconColor="text-white fill-white"
        />

        {/* Seekable waveform bars — taller, more dramatic */}
        <div
          ref={waveformRef}
          className="flex items-center gap-[2px] h-[28px] flex-1 min-w-0 cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {bars.map((amplitude, i) => {
            const barProgress = i / GLASS_BAR_COUNT;
            const isPlayed = barProgress <= progress;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${amplitude * 100}%`,
                  minHeight: 3,
                  backgroundColor: isPlayed
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.18)',
                  ...(isPlaying && !isPlayed
                    ? {
                        animation: `glassPulse ${0.8 + (i % 5) * 0.15}s ease-in-out ${(i % 7) * 0.08}s infinite alternate`,
                      }
                    : {}),
                }}
              />
            );
          })}
        </div>

        {/* Time — elapsed / total */}
        <span className="text-white/45 text-[11.5px] tabular-nums flex-shrink-0 ml-1">
          {formatTime(currentTime)}
          <span className="text-white/20 mx-0.5">/</span>
          {formatTime(TOTAL_DURATION)}
        </span>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VARIANT 4: Reactive Orb (fixed animations + mobile)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function OrbPlayer() {
  const { playback, togglePlay } = usePlayer();
  const { isPlaying, currentTime } = playback;

  const orbAnimDuration = isPlaying ? '3s' : '6s';

  return (
    <div className="relative rounded-xl bg-[#111111] shadow-lg shadow-black/50 p-3">
      <div className="flex items-center gap-3.5">
        {/* Reactive AI Orb */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 relative w-11 h-11 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {/* === Layer 1: Wide ambient bloom === */}
          <div
            className="absolute inset-[-18px] rounded-full pointer-events-none transition-all duration-1000"
            style={{
              background: isPlaying
                ? 'radial-gradient(circle, rgba(176,31,36,0.18) 0%, rgba(176,31,36,0.06) 40%, transparent 65%)'
                : 'radial-gradient(circle, rgba(176,31,36,0.1) 0%, rgba(176,31,36,0.03) 40%, transparent 65%)',
              animation: isPlaying ? 'orbGlowPulse 2.5s ease-in-out infinite' : 'orbGlowPulse 5s ease-in-out infinite',
              filter: 'blur(3px)',
            }}
          />

          {/* === Layer 1.5: Outer ring halo — glowing edge that bleeds into background === */}
          <div
            className="absolute inset-[-6px] rounded-full pointer-events-none transition-all duration-800"
            style={{
              border: isPlaying
                ? '1.5px solid rgba(176,31,36,0.5)'
                : '1px solid rgba(176,31,36,0.2)',
              boxShadow: isPlaying
                ? '0 0 8px 2px rgba(176,31,36,0.3), 0 0 18px 4px rgba(176,31,36,0.15), 0 0 30px 8px rgba(176,31,36,0.06), inset 0 0 6px 1px rgba(176,31,36,0.15)'
                : '0 0 5px 1px rgba(176,31,36,0.12), 0 0 12px 3px rgba(176,31,36,0.06), inset 0 0 4px 1px rgba(176,31,36,0.08)',
              animation: isPlaying ? 'orbHaloRing 2.5s ease-in-out infinite' : 'orbHaloRing 5s ease-in-out infinite',
            }}
          />

          {/* === Layer 5: Orb core — translucent glass gel sphere === */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ animation: isPlaying ? 'orbNeuralMorph 4s ease-in-out infinite' : 'orbBreathe 5s ease-in-out infinite' }}
          >
            {/* Glass shell — ultra-translucent so inner layers show through */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: isPlaying
                  ? `
                    radial-gradient(circle at 30% 25%, rgba(255,255,255,0.1) 0%, transparent 18%),
                    radial-gradient(circle at 70% 75%, rgba(176,31,36,0.15) 0%, transparent 25%),
                    radial-gradient(circle at 50% 50%, rgba(176,31,36,0.06) 0%, rgba(50,10,12,0.12) 30%, rgba(15,3,5,0.25) 60%, rgba(8,1,2,0.4) 100%)
                  `
                  : `
                    radial-gradient(circle at 30% 25%, rgba(255,255,255,0.06) 0%, transparent 18%),
                    radial-gradient(circle at 50% 50%, rgba(20,4,6,0.2) 0%, rgba(10,2,3,0.35) 50%, rgba(6,1,2,0.5) 100%)
                  `,
                boxShadow: isPlaying
                  ? 'inset 0 -3px 10px rgba(176,31,36,0.15), inset 0 2px 5px rgba(255,255,255,0.06), inset 0 0 12px rgba(176,31,36,0.08), 0 0 10px rgba(176,31,36,0.15)'
                  : 'inset 0 -2px 6px rgba(176,31,36,0.08), inset 0 1px 3px rgba(255,255,255,0.04), 0 0 6px rgba(176,31,36,0.06)',
                transition: 'background 0.8s ease, box-shadow 0.8s ease',
              }}
            />

            {/* Fluid wave layer 1 — large sweeping ink current */}
            <div
              className="absolute inset-[1px] rounded-full overflow-hidden"
              style={{ opacity: isPlaying ? 1 : 0.5, transition: 'opacity 0.8s ease' }}
            >
              <div
                className="absolute inset-[-30%]"
                style={{
                  background: `
                    radial-gradient(ellipse 90% 50% at 25% 40%, rgba(176,31,36,0.45) 0%, transparent 50%),
                    radial-gradient(ellipse 50% 90% at 70% 55%, rgba(248,113,113,0.3) 0%, transparent 45%),
                    radial-gradient(ellipse 70% 60% at 45% 65%, rgba(200,40,45,0.2) 0%, transparent 50%)
                  `,
                  animation: isPlaying ? 'orbFluidWave1 5s ease-in-out infinite' : 'orbFluidWave1 14s ease-in-out infinite',
                  mixBlendMode: 'screen',
                }}
              />
            </div>

            {/* Fluid wave layer 2 — counter-flowing, phase offset */}
            <div
              className="absolute inset-[1px] rounded-full overflow-hidden"
              style={{ opacity: isPlaying ? 0.9 : 0.4, transition: 'opacity 0.8s ease' }}
            >
              <div
                className="absolute inset-[-25%]"
                style={{
                  background: `
                    radial-gradient(ellipse 60% 80% at 65% 30%, rgba(252,165,165,0.25) 0%, transparent 45%),
                    radial-gradient(ellipse 80% 50% at 30% 70%, rgba(176,31,36,0.35) 0%, transparent 50%),
                    radial-gradient(ellipse 45% 55% at 55% 45%, rgba(255,100,100,0.15) 0%, transparent 45%)
                  `,
                  animation: isPlaying ? 'orbFluidWave2 7s ease-in-out 1s infinite' : 'orbFluidWave2 18s ease-in-out infinite',
                  mixBlendMode: 'screen',
                }}
              />
            </div>

            {/* Fluid wave layer 3 — fastest, smallest, brightest hot spots */}
            <div
              className="absolute inset-[2px] rounded-full overflow-hidden"
              style={{ opacity: isPlaying ? 0.7 : 0.3, transition: 'opacity 0.8s ease' }}
            >
              <div
                className="absolute inset-[-20%]"
                style={{
                  background: `
                    radial-gradient(ellipse 40% 40% at 40% 35%, rgba(255,180,170,0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 35% 45% at 60% 65%, rgba(248,113,113,0.25) 0%, transparent 45%)
                  `,
                  animation: isPlaying ? 'orbFluidWave3 3.5s ease-in-out 0.5s infinite' : 'orbFluidWave3 10s ease-in-out infinite',
                  mixBlendMode: 'screen',
                }}
              />
            </div>

            {/* Gel ripple — soft radial pulse from center */}
            <div
              className="absolute inset-[2px] rounded-full overflow-hidden"
              style={{ opacity: isPlaying ? 0.8 : 0.35, transition: 'opacity 0.8s ease' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(248,113,113,0.2) 0%, rgba(176,31,36,0.1) 25%, transparent 50%)',
                  animation: isPlaying ? 'orbGelRipple 2.5s ease-in-out infinite' : 'orbGelRipple 5s ease-in-out infinite',
                }}
              />
            </div>

            {/* Internal light caustics — refracted light bands */}
            <div
              className="absolute inset-[1px] rounded-full overflow-hidden pointer-events-none"
              style={{ opacity: isPlaying ? 0.6 : 0.25, transition: 'opacity 0.8s ease' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(125deg, transparent 15%, rgba(255,220,210,0.15) 28%, transparent 35%, transparent 42%, rgba(255,255,255,0.12) 48%, transparent 55%, transparent 62%, rgba(255,200,190,0.1) 70%, transparent 78%)
                  `,
                  animation: isPlaying ? 'orbCausticDrift 5s ease-in-out infinite' : 'orbCausticDrift 12s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          {/* === Layer 6: Glass refraction caustic bands (slow counter-rotate) === */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{ animation: `orbSpin 8s linear infinite reverse` }}
          >
            <div
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: `
                  linear-gradient(140deg, transparent 25%, rgba(255,255,255,0.06) 32%, rgba(255,220,210,0.15) 38%, rgba(255,255,255,0.25) 42%, rgba(255,220,210,0.12) 46%, rgba(255,255,255,0.04) 52%, transparent 58%),
                  linear-gradient(320deg, transparent 55%, rgba(255,200,190,0.08) 62%, rgba(255,255,255,0.1) 66%, transparent 72%)
                `,
                opacity: isPlaying ? 1 : 0.35,
              }}
            />
          </div>

          {/* === Layer 7: Glass Fresnel specular highlight === */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 55% 40% at 28% 22%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 35%, transparent 65%),
                radial-gradient(ellipse 30% 20% at 70% 78%, rgba(255,255,255,0.06) 0%, transparent 50%)
              `,
              opacity: isPlaying ? 1 : 0.7,
            }}
          />

          {/* === Layer 8: Internal caustic glow visible through glass === */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700 overflow-hidden"
            style={{
              opacity: isPlaying ? 0.9 : 0.25,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 68% 72%, rgba(248,113,113,0.3) 0%, rgba(176,31,36,0.15) 25%, transparent 45%)',
                animation: isPlaying ? 'orbCausticDrift 4s ease-in-out 1.5s infinite reverse' : 'orbCausticDrift 10s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* === Layer 9: Play/Pause icon overlay === */}
          <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity opacity-60 sm:opacity-0 sm:group-hover:opacity-100">
            <div className="w-full h-full rounded-full bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 text-white/90 fill-white/90 drop-shadow-sm" />
              ) : (
                <Play className="h-3.5 w-3.5 text-white/90 fill-white/90 ml-[1px] drop-shadow-sm" />
              )}
            </div>
          </div>
        </button>

        {/* Info + progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-white text-[13px] truncate">Qatar Fresh Herbs Market</p>
            <span className="text-[#777] text-[10px] tabular-nums flex-shrink-0 ml-2">
              {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
            </span>
          </div>
          <p className="text-[#666] text-[10px] mb-2">
            {isPlaying ? 'Playing audio summary...' : 'Audio Summary'}
          </p>

          {/* Progress bar */}
          <ProgressBar
            height={3}
            gradient="linear-gradient(90deg, #b01f24, #f87171)"
            trackColor="bg-white/[0.08]"
            rounded
          />
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Spotify Embed
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SpotifyEmbed() {
  return (
    <iframe
      style={{ borderRadius: 12 }}
      src="https://open.spotify.com/embed/episode/7makk4oTQel546B0PZlDM5?utm_source=generator&theme=0&t=0"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify podcast player"
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared Keyframes (single injection)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SharedStyles() {
  return (
    <style>{`
      @keyframes glassPulse {
        0% { opacity: 0.2; }
        100% { opacity: 0.35; }
      }
      @keyframes orbSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes orbPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.12); }
      }
      @keyframes orbBreathe {
        0%, 100% { transform: scale(0.94); }
        50% { transform: scale(1.06); }
      }
      @keyframes orbWaveRing {
        0% {
          transform: scale(1);
          opacity: 0.6;
          border-color: rgba(176,31,36,0.4);
        }
        50% {
          border-color: rgba(248,113,113,0.2);
        }
        100% {
          transform: scale(2.2);
          opacity: 0;
          border-color: rgba(176,31,36,0);
        }
      }
      @keyframes orbGlowPulse {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        30% { transform: scale(1.06); filter: brightness(1.3); }
        60% { transform: scale(0.97); filter: brightness(0.9); }
        80% { transform: scale(1.04); filter: brightness(1.15); }
      }
      /* Speaking state: ring vibration — erratic scale like frequency response */
      @keyframes orbRingVibrate {
        0% { border-width: 1.5px; filter: blur(0px); }
        15% { border-width: 2.5px; filter: blur(0.5px); }
        30% { border-width: 1px; filter: blur(0px); }
        50% { border-width: 2px; filter: blur(0.3px); }
        70% { border-width: 1.5px; filter: blur(0px); }
        85% { border-width: 2.5px; filter: blur(0.4px); }
        100% { border-width: 1.5px; filter: blur(0px); }
      }
      /* Speaking state: fluid ripple distortion on rings */
      @keyframes orbRingMorph {
        0%, 100% { border-radius: 50%; }
        20% { border-radius: 47% 53% 51% 49% / 52% 48% 53% 47%; }
        40% { border-radius: 53% 47% 46% 54% / 48% 52% 49% 51%; }
        60% { border-radius: 49% 51% 53% 47% / 51% 49% 47% 53%; }
        80% { border-radius: 51% 49% 47% 53% / 49% 51% 52% 48%; }
      }
      /* Speaking state: core blob morphing — cloud-like neural field */
      @keyframes orbNeuralMorph {
        0%, 100% { border-radius: 50%; }
        14% { border-radius: 46% 54% 52% 48% / 53% 47% 51% 49%; }
        28% { border-radius: 52% 48% 46% 54% / 48% 52% 49% 51%; }
        42% { border-radius: 48% 52% 54% 46% / 51% 49% 47% 53%; }
        57% { border-radius: 54% 46% 48% 52% / 47% 53% 52% 48%; }
        71% { border-radius: 47% 53% 51% 49% / 54% 46% 48% 52%; }
        85% { border-radius: 53% 47% 49% 51% / 49% 51% 54% 46%; }
      }
      /* Speaking state: internal cloud gradient drifts */
      @keyframes orbNeuralShift {
        0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        25% { transform: translate(3px, -2px) scale(1.1); opacity: 0.8; }
        50% { transform: translate(-2px, 3px) scale(0.95); opacity: 0.5; }
        75% { transform: translate(2px, 1px) scale(1.08); opacity: 0.75; }
        100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
      }
      /* Speaking state: ink swirls — slow, fluid motion */
      @keyframes orbInkSwirl {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.05); }
        100% { transform: rotate(360deg) scale(1); }
      }
      /* Speaking state: gel ripple — soft radial pulse */
      @keyframes orbGelRipple {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 0.5; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      /* Speaking state: caustic drift — refracted light bands */
      @keyframes orbCausticDrift {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(2px, -1px) scale(1.02); }
        100% { transform: translate(0, 0) scale(1); }
      }
      /* Speaking state: fluid wave 1 — large sweeping ink current */
      @keyframes orbFluidWave1 {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); }
        20% { transform: translate(4px, -3px) rotate(72deg) scale(1.08); }
        40% { transform: translate(-3px, 5px) rotate(144deg) scale(0.95); }
        60% { transform: translate(5px, 2px) rotate(216deg) scale(1.06); }
        80% { transform: translate(-2px, -4px) rotate(288deg) scale(0.97); }
        100% { transform: translate(0, 0) rotate(360deg) scale(1); }
      }
      /* Speaking state: fluid wave 2 — counter-flowing organic drift */
      @keyframes orbFluidWave2 {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); }
        25% { transform: translate(-5px, 3px) rotate(-90deg) scale(1.1); }
        50% { transform: translate(3px, -4px) rotate(-180deg) scale(0.93); }
        75% { transform: translate(-2px, 5px) rotate(-270deg) scale(1.07); }
        100% { transform: translate(0, 0) rotate(-360deg) scale(1); }
      }
      /* Speaking state: fluid wave 3 — fast hot spot shimmer */
      @keyframes orbFluidWave3 {
        0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        16% { transform: translate(3px, -2px) scale(1.12); opacity: 0.9; }
        33% { transform: translate(-4px, 1px) scale(0.9); opacity: 0.5; }
        50% { transform: translate(2px, 4px) scale(1.08); opacity: 0.85; }
        66% { transform: translate(-1px, -3px) scale(0.95); opacity: 0.55; }
        83% { transform: translate(4px, 2px) scale(1.1); opacity: 0.8; }
        100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
      }
      /* Orb halo ring — glowing edge that bleeds into background */
      @keyframes orbHaloRing {
        0% {
          border-color: rgba(176,31,36,0.5);
          box-shadow: 0 0 8px 2px rgba(176,31,36,0.3), 0 0 18px 4px rgba(176,31,36,0.15), 0 0 30px 8px rgba(176,31,36,0.06), inset 0 0 6px 1px rgba(176,31,36,0.15);
        }
        50% {
          border-color: rgba(248,113,113,0.2);
          box-shadow: 0 0 10px 3px rgba(176,31,36,0.4), 0 0 20px 6px rgba(176,31,36,0.2), 0 0 35px 10px rgba(176,31,36,0.1), inset 0 0 8px 2px rgba(176,31,36,0.2);
        }
        100% {
          border-color: rgba(176,31,36,0.5);
          box-shadow: 0 0 8px 2px rgba(176,31,36,0.3), 0 0 18px 4px rgba(176,31,36,0.15), 0 0 30px 8px rgba(176,31,36,0.06), inset 0 0 6px 1px rgba(176,31,36,0.15);
        }
      }
    `}</style>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AudioPlayer (entry point)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function AudioPlayer() {
  const { variant } = usePlayer();

  const renderPlayer = () => {
    switch (variant) {
      case 'custom':
        return <CustomPlayer />;
      case 'waveform':
        return <WaveformPlayer />;
      case 'glassPill':
        return <GlassPillPlayer />;
      case 'orb':
        return <OrbPlayer />;
      case 'spotify':
        return <SpotifyEmbed />;
    }
  };

  return (
    <div className="w-full">
      <SharedStyles />
      {renderPlayer()}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Floating Variant Switcher
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function PlayerVariantSwitcher() {
  const { variant, setVariant } = usePlayer();
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="inline-flex items-center rounded-full bg-[#1e1e1e] border border-white/[0.08] p-[3px] shadow-xl shadow-black/50">
        {VARIANT_ORDER.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-3 py-1.5 rounded-full text-[10px] tracking-wide transition-all duration-200 ${
              variant === v
                ? 'bg-white/[0.15] text-white shadow-sm'
                : 'text-white/35 hover:text-white/60'
            }`}
          >
            {VARIANT_LABELS[v]}
          </button>
        ))}
      </div>
    </div>
  );
}