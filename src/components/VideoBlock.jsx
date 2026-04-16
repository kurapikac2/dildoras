import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const VideoBlock = () => {
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const videoRef = useRef(null);
  const videoSources = ["/videos/video-main.mp4", "/videos/video-main.MP4"];
  const currentVideoSrc = videoSources[videoSourceIndex];

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!shouldLoadVideo || !videoElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoInView(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 0.7] }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoadVideo]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!shouldLoadVideo || !videoElement) {
      return;
    }

    if (isVideoInView) {
      const playAttempt = videoElement.play();
      if (playAttempt?.catch) {
        playAttempt.catch(() => {});
      }
      return;
    }

    videoElement.pause();
  }, [isVideoInView, shouldLoadVideo, currentVideoSrc]);

  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-4">
            Visual storytelling through motion
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            Cinematic moments captured with softness, rhythm and emotion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full max-w-5xl mx-auto bg-black overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 flex items-center justify-center bg-[#D4CFC9]">
            {shouldLoadVideo && currentVideoSrc ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  controls={false}
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                  preload="metadata"
                  className="w-full h-full object-cover pointer-events-none select-none transform-gpu will-change-transform"
                  src={currentVideoSrc}
                  onLoadedData={() => {
                    setIsVideoLoading(false);
                    if (isVideoInView) {
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  onCanPlay={() => {
                    setIsVideoLoading(false);
                    if (isVideoInView) {
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  onContextMenu={(event) => event.preventDefault()}
                  onError={() => {
                    if (videoSourceIndex + 1 < videoSources.length) {
                      setVideoSourceIndex(videoSourceIndex + 1);
                      setIsVideoLoading(true);
                      return;
                    }
                    setIsVideoLoading(false);
                  }}
                />
                {isVideoLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-white">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <p className="text-sm tracking-[0.08em] uppercase">Loading video...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShouldLoadVideo(true);
                  setIsVideoLoading(true);
                }}
                className="group relative w-full h-full"
                aria-label="Play highlight video"
              >
                <img
                  src="/images/main-preview.webp"
                  alt="Video preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="h-16 w-16 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Play size={28} className="ml-0.5" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
