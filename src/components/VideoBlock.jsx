import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

export const VideoBlock = () => {
  const { t } = useTranslation();
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const videoRef = useRef(null);
  const videoSources = ["/videos/video-main.mp4", "/videos/video-main.MP4"];
  const currentVideoSrc = videoSources[videoSourceIndex];

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
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
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
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
  }, [isVideoInView, currentVideoSrc]);

  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading text-foreground mb-4">
            {t('videoBlock.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            {t('videoBlock.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 60, damping: 25 }}
          className="relative aspect-video w-full max-w-5xl mx-auto bg-black overflow-hidden shadow-2xl will-change-transform"
        >
          <div className="relative w-full h-full bg-[#D4CFC9]">
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
              poster="/images/main-preview.webp"
              onLoadedData={() => {
                setIsVideoLoading(false);
              }}
              onCanPlay={() => {
                setIsVideoLoading(false);
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-sm text-white">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-2 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ 
                          duration: 1.2, 
                          delay: i * 0.2, 
                          repeat: Infinity 
                        }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-sm tracking-[0.08em] uppercase">{t('portfolio.loading')}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
