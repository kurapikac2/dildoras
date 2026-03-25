import { motion } from "framer-motion";
import { useState } from "react";

export const VideoBlock = () => {
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const videoSources = ["/videos/video-main.mp4", "/videos/video-main.MP4"];
  const currentVideoSrc = videoSources[videoSourceIndex];

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
            {currentVideoSrc ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover"
                src={currentVideoSrc}
                onError={() => {
                  setVideoSourceIndex((prev) => (prev + 1 < videoSources.length ? prev + 1 : prev));
                }}
              />
            ) : (
              <span className="font-heading text-3xl text-foreground/30">Main Highlight Video</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
