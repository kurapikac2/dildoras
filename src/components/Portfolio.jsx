import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { SectionTitle } from "./SectionTitle";
import { portfolioItems } from "@/data/portfolio";
import { Play } from "lucide-react";

export const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState("All");
  const [mediaFilter, setMediaFilter] = useState("image"); // 'image', 'video'
  const [imageTryIndex, setImageTryIndex] = useState({});
  const [videoTryIndex, setVideoTryIndex] = useState({});
  const [activePreview, setActivePreview] = useState(null);
  const [isPreviewVideoLoading, setIsPreviewVideoLoading] = useState(false);
  const [weddingsLoaded, setWeddingsLoaded] = useState(false);

  const buildSrcCandidates = (source, variants) => {
    const lastSlash = source.lastIndexOf("/");
    const fileName = source.slice(lastSlash + 1);
    const dotIndex = fileName.lastIndexOf(".");
    const base = dotIndex > -1 ? source.slice(0, source.length - (fileName.length - dotIndex)) : source;
    const candidates = [source, ...variants.map((ext) => `${base}${ext}`)];
    return [...new Set(candidates)];
  };

  const imageSrcCandidates = useMemo(() => {
    const variants = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];

    return Object.fromEntries(
      portfolioItems
        .filter((item) => item.type === "image")
        .map((item) => [item.id, buildSrcCandidates(item.src, variants)])
    );
  }, []);

  const videoSrcCandidates = useMemo(() => {
    const variants = [".mp4", ".webm", ".mov", ".MP4", ".WEBM", ".MOV"];

    return Object.fromEntries(
      portfolioItems
        .filter((item) => item.type === "video")
        .map((item) => [item.id, buildSrcCandidates(item.src, variants)])
    );
  }, []);
  
  const getCategoryLabel = (category) => {
    const labels = {
      "All": t('portfolio.all'),
      "Brands": t('portfolio.categories.brands'),
      "Weddings": t('portfolio.categories.weddings'),
      "Lifestyle": t('portfolio.categories.lifestyle'),
      "Clothing brands": t('portfolio.categories.clothingBrands')
    };
    return labels[category] || category;
  };

  const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];

  // Check if current category has images or videos
  const getItemsForCategory = (category) => {
    let items = portfolioItems;
    const hiddenInAllItems = [3, 8, 11, 13, 6, 25, 26];
    
    if (category === "Weddings" && !weddingsLoaded) {
      items = items.filter(item => item.category !== "Weddings");
    }
    if (category === "All") {
      items = items.filter(item => !hiddenInAllItems.includes(item.id));
    }
    if (category !== "All") {
      items = items.filter(item => item.category === category);
    }
    return items;
  };

  const currentCategoryItems = getItemsForCategory(filter);
  const hasImages = currentCategoryItems.some(item => item.type === "image");
  const hasVideos = currentCategoryItems.some(item => item.type === "video");

  useEffect(() => {
    if (filter === "Weddings" && !weddingsLoaded) {
      setWeddingsLoaded(true);
    }
    // Reset media filter when category changes
    // If no images, switch to video; if no videos, switch to image
    if (!hasImages && hasVideos) {
      setMediaFilter("video");
    } else {
      setMediaFilter("image");
    }
  }, [filter, weddingsLoaded, hasImages, hasVideos]);

  const filteredItems = useMemo(() => {
    let items = portfolioItems;

    // Items hidden from All but visible in their own categories
    const hiddenInAllItems = [3, 8, 11, 13, 6, 25, 26];
    if (filter === "Weddings" && !weddingsLoaded) {
      items = items.filter(item => item.category !== "Weddings");
    }

    // Hide selected items from the "All" view
    if (filter === "All") {
      items = items.filter(item => !hiddenInAllItems.includes(item.id));
    }

    // Filter by category
    if (filter !== "All") {
      items = items.filter((item) => item.category === filter);
    }

    // Filter by media type (photo/video)
    if (mediaFilter !== "All") {
      items = items.filter((item) => item.type === mediaFilter);
    }

    // Sorting logic to maintain a consistent order
    const rowOrder = ["Brands", "Clothing brands", "Weddings", "Lifestyle"];
    const imageItems = items.filter((item) => item.type === "image");
    const videoItems = items.filter((item) => item.type === "video");

    const orderedImages = rowOrder.flatMap((category) =>
      imageItems.filter((item) => item.category === category)
    );
    const remainingImages = imageItems.filter(
      (item) => !rowOrder.includes(item.category)
    );

    return [...orderedImages, ...remainingImages, ...videoItems];
  }, [filter, mediaFilter, weddingsLoaded]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePreview(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!activePreview) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activePreview]);

  const getCurrentImageSrc = (item) => imageSrcCandidates[item.id]?.[imageTryIndex[item.id] ?? 0] ?? item.src;
  const getCurrentVideoSrc = (item) => videoSrcCandidates[item.id]?.[videoTryIndex[item.id] ?? 0] ?? item.src;

  return (
    <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="container mx-auto">
        <SectionTitle title={t('portfolio.title')} />
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`text-sm md:text-base tracking-wide transition-all pb-1 border-b-2 ${
                filter === category
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* Media Type Filters */}
        {(hasImages || hasVideos) && (
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {hasImages && (
              <button
                onClick={() => setMediaFilter('image')}
                className={`text-sm md:text-base tracking-wide transition-all pb-1 border-b-2 ${
                  mediaFilter === 'image'
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t('portfolio.photos')}
              </button>
            )}
            {hasVideos && (
              <button
                onClick={() => setMediaFilter('video')}
                className={`text-sm md:text-base tracking-wide transition-all pb-1 border-b-2 ${
                  mediaFilter === 'video'
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t('portfolio.videos')}
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.05
                }}
                key={item.id}
                className="group relative aspect-[4/5] overflow-hidden bg-muted cursor-pointer will-change-transform"
                onClick={() => {
                  if (item.type === "image") {
                    setIsPreviewVideoLoading(false);
                    setActivePreview({ type: "image", src: getCurrentImageSrc(item), title: item.title });
                  }

                  if (item.type === "video") {
                    setIsPreviewVideoLoading(true);
                    setActivePreview({ type: "video", src: getCurrentVideoSrc(item), title: item.title });
                  }
                }}
              >
                <div className="absolute inset-0 bg-[#E8DFDC] transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform">
                  {item.type === 'image' ? (
                    <img
                      src={getCurrentImageSrc(item)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => {
                        const nextIndex = (imageTryIndex[item.id] ?? 0) + 1;
                        const maxIndex = (imageSrcCandidates[item.id]?.length ?? 1) - 1;
                        if (nextIndex <= maxIndex) {
                          setImageTryIndex((prev) => ({ ...prev, [item.id]: nextIndex }));
                        }
                      }}
                    />
                  ) : (
                    (() => {
                      const fallbackPosterByCategory = {
                        Brands: "/images/brand2.webp",
                        Weddings: "/images/weddings1.webp",
                        Lifestyle: "/images/lifestyle1.webp",
                        "Clothing brands": "/images/clothes-preview1.webp",
                      };

                      // Specific video posters
                      const videoPosters = {
                        "/videos/brand1.mp4": "/images/brand1.webp",
                        "/videos/brand2.mp4": "/images/brand6.webp",
                        "/videos/weddings1.mp4": "/images/weddings1.webp",
                        "/videos/weddings2.mp4": "/images/weddings4.webp",
                        "/videos/weddings3.mp4": "/images/weddings7.webp",
                        "/videos/weddings4.mp4": "/images/weddings8.webp",
                        "/videos/weddings5.mp4": "/images/weddings9.webp",
                        "/videos/clothes1.mp4": "/images/clothes-preview1.webp",
                        "/videos/clothes2.mp4": "/images/clothes-preview2.webp",
                        "/videos/lifestyle1.mp4": "/images/lifestyle1.webp",
                        "/videos/lifestyle2.mp4": "/images/lifestyle3.webp",
                      };

                      return (
                        <img
                          src={videoPosters[item.src] ?? fallbackPosterByCategory[item.category] ?? "/images/main-preview.webp"}
                          alt={item.title}
                          className="w-full h-full object-cover pointer-events-none select-none"
                          loading="lazy"
                        />
                      );
                    })()
                  )}
                </div>

                {/* Video Icon Indicator */}
                {item.type === 'video' && (
                  <div className="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-sm p-2 rounded-full text-white">
                    <Play size={16} className="fill-white" />
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex flex-col justify-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <p className="text-white/80 text-sm tracking-widest uppercase mb-2">{item.category}</p>
                    <h3 className="text-white font-heading text-2xl">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activePreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
              onClick={() => {
                setActivePreview(null);
                setIsPreviewVideoLoading(false);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                {activePreview.type === "image" ? (
                  <img
                    src={activePreview.src}
                    alt={activePreview.title}
                    className="max-w-full max-h-[90vh] object-contain"
                  />
                ) : (
                  <div className="relative max-w-full max-h-[90vh]">
                    <video
                      src={activePreview.src}
                      className="max-w-full max-h-[90vh] object-contain pointer-events-none select-none"
                      autoPlay
                      loop
                      muted
                      playsInline
                      disablePictureInPicture
                      controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
                      preload="metadata"
                      onLoadedData={(e) => {
                        setIsPreviewVideoLoading(false);
                        e.target.play().catch(() => {});
                      }}
                      onCanPlay={(e) => {
                        setIsPreviewVideoLoading(false);
                        e.target.play().catch(() => {});
                      }}
                      onError={() => setIsPreviewVideoLoading(false)}
                      onContextMenu={(event) => event.preventDefault()}
                    />
                    {isPreviewVideoLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-white">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-10 w-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <p className="text-sm tracking-[0.08em] uppercase">{t('portfolio.loading')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setActivePreview(null);
                    setIsPreviewVideoLoading(false);
                  }}
                  className="absolute top-3 right-3 md:top-4 md:right-4 h-10 w-10 rounded-full bg-black/50 text-white text-xl leading-none hover:bg-black/70 transition-colors"
                  aria-label="Close preview"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
