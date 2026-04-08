import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const videoRef = useRef(null);
  const [isVideoInView, setIsVideoInView] = useState(false);

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
  }, [isVideoInView]);

  return (
    <section className="relative min-h-[100svh] w-full bg-[#F5EDEE] overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] via-[#F5EDEE] to-[#EFE3E0]" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 min-h-[100svh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-24 lg:py-0">

          {/* Left side — Text */}
          <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans">
                Dildora Photography
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading text-foreground mb-8 tracking-tight leading-[1.1]"
            >
              Dildora
              <br />
              <span className="italic text-muted-foreground/70">visuals</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="text-lg md:text-xl text-muted-foreground font-sans max-w-md mb-10 font-light tracking-wide leading-relaxed mx-auto lg:mx-0"
            >
              Soft visuals for brands, weddings and personal moments
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-sans tracking-wide rounded-none h-12 px-8"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View portfolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-foreground border-foreground/20 hover:bg-muted font-sans tracking-wide rounded-none h-12 px-8"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact
              </Button>
            </motion.div>
          </div>

          {/* Right side — Vertical Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] xl:w-[420px] aspect-[9/16] overflow-hidden rounded-[2px] shadow-2xl shadow-black/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] via-[#F5EDEE] to-[#EFE3E0]">
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
                  src="/videos/hero-video1.mp4"
                  poster="/images/photo1.webp"
                  onContextMenu={(event) => event.preventDefault()}
                />
              </div>

              {/* Soft border glow */}
              <div className="absolute inset-0 ring-1 ring-black/5 rounded-[2px]" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground/50"
      >
        <span className="text-xs tracking-[0.2em] uppercase mb-2 font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
};
