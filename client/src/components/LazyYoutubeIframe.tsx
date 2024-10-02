"use client";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

const LazyYouTubeIframe = ({ videoId }: { videoId: string }) => {
  const [isIframeLoaded, setIframeLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );

  useEffect(() => {
    // Try to render the high-quality thumbnail or fallback to the default one
    // if it doesn't exist (renders a placeholder)
    const img = new Image();
    img.src = thumbnailUrl;
    img.onload = () => {
      if (img.width === 120 && img.height === 90) {
        setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      }
    };
  }, [videoId]);

  const handleLoadIframe = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="w-full aspect-[16/9]">
      {isIframeLoaded ? (
        <iframe
          allow="autoplay"
          loading="lazy"
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allowFullScreen
        ></iframe>
      ) : (
        <div className="relative h-full">
          <img
            className="w-full h-full object-cover cursor-pointer"
            src={thumbnailUrl}
            alt="YouTube Video Thumbnail"
          />

          <button
            onClick={handleLoadIframe}
            className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30"
          >
            <PlayIcon className="w-16 h-16 text-white fill-white " />
          </button>
        </div>
      )}
    </div>
  );
};

export default LazyYouTubeIframe;
