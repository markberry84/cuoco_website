import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { MEDIA, mediaUrl, type MediaSlot } from "@/content/media";
import { useInView } from "@/hooks/useInView";
import { usePageVisible } from "@/hooks/usePageVisible";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type { Caption } from "@/content/media";

type ClipProps = {
  slot: MediaSlot;
  /** When false the clip is paused and rewound. */
  active?: boolean;
  loop?: boolean;
  /** Fires at the end of each play-through when `loop` is false. */
  onEnded?: () => void;
  /** Fires once if the clip cannot play by itself: autoplay refused, load error or reduced motion. */
  onUnavailable?: () => void;
  onTime?: (seconds: number) => void;
  /** Show a "Tap for sound" button. */
  sound?: boolean;
  /** How long a slot with no video counts as one play-through. */
  stillSeconds?: number;
  className?: string;
};

export function Clip({
  slot,
  active = true,
  loop = true,
  onEnded,
  onUnavailable,
  onTime,
  sound = false,
  stillSeconds,
  className,
}: ClipProps) {
  const media = MEDIA[slot];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrapperRef, { amount: 0.4 });
  const pageVisible = usePageVisible();
  const reducedMotion = usePrefersReducedMotion();

  const [unavailable, setUnavailable] = useState(false);
  const [startedByHand, setStartedByHand] = useState(false);
  const [muted, setMuted] = useState(true);

  // Callbacks are read through refs so a parent re-render never restarts playback.
  const onEndedRef = useRef(onEnded);
  const onUnavailableRef = useRef(onUnavailable);
  const onTimeRef = useRef(onTime);
  onEndedRef.current = onEnded;
  onUnavailableRef.current = onUnavailable;
  onTimeRef.current = onTime;

  const reportedRef = useRef(false);
  const markUnavailable = useCallback(() => {
    setUnavailable(true);
    if (!reportedRef.current) {
      reportedRef.current = true;
      onUnavailableRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) markUnavailable();
  }, [reducedMotion, markUnavailable]);

  const shouldPlay = active && inView && pageVisible && !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay && !unavailable) {
      video.preload = "auto";
      video.play().catch(markUnavailable);
    } else if (!startedByHand || !inView || !active || !pageVisible) {
      video.pause();
    }
  }, [shouldPlay, unavailable, startedByHand, inView, active, pageVisible, markUnavailable]);

  useEffect(() => {
    if (active) return;
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = true;
    }
    setMuted(true);
    setStartedByHand(false);
  }, [active]);

  // A slot with no recording yet behaves like a clip of `stillSeconds`.
  useEffect(() => {
    if (media.hasVideo || loop || !stillSeconds || !shouldPlay) return;
    const timer = window.setTimeout(() => onEndedRef.current?.(), stillSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [media.hasVideo, loop, stillSeconds, shouldPlay]);

  const playByHand = () => {
    const video = videoRef.current;
    if (!video) return;
    video
      .play()
      .then(() => {
        setStartedByHand(true);
        setUnavailable(false);
      })
      .catch(() => undefined);
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const showVideo = media.hasVideo && (!unavailable || startedByHand);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: media.aspect }}
      data-slot={slot}
    >
      {media.hasStill ? (
        <img
          src={mediaUrl(slot, "jpg")}
          alt={media.alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          role="img"
          aria-label={media.alt}
          className="absolute inset-0 flex items-center justify-center bg-card-cream px-6 text-center text-sm text-body"
        >
          {media.placeholder}
        </div>
      )}

      {media.hasVideo && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            showVideo ? "opacity-100" : "opacity-0",
          )}
          muted
          playsInline
          loop={loop}
          preload="none"
          aria-label={media.alt}
          onEnded={() => onEndedRef.current?.()}
          onError={markUnavailable}
          onTimeUpdate={(e) => onTimeRef.current?.(e.currentTarget.currentTime)}
        >
          <source src={mediaUrl(slot, "webm")} type="video/webm" onError={() => undefined} />
          <source src={mediaUrl(slot, "mp4")} type="video/mp4" onError={markUnavailable} />
        </video>
      )}

      {media.hasVideo && unavailable && !startedByHand && (
        <button
          type="button"
          onClick={playByHand}
          aria-label="Play clip"
          className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors duration-150 hover:bg-ink/30"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream text-ink shadow-lg">
            <Play className="ml-0.5 h-6 w-6" />
          </span>
        </button>
      )}

      {sound && media.hasVideo && media.hasSound && showVideo && (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-cream"
        >
          {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          {muted ? "Tap for sound" : "Mute"}
        </button>
      )}
    </div>
  );
}
