"use client";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface LazyYouTubeIframeProps {
  videoId: string;
}

const LazyYouTubeIframe = ({ videoId }: LazyYouTubeIframeProps) => {
  const [isIframeLoaded, setIframeLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
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
    <div className="aspect-[16/9] w-full">
      {isIframeLoaded ? (
        <iframe
          allow="autoplay"
          loading="lazy"
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allowFullScreen
        ></iframe>
      ) : (
        <div className="relative h-full">
          <img
            className="h-full w-full cursor-pointer object-cover"
            src={thumbnailUrl}
            alt="YouTube Video Thumbnail"
          />

          <button
            onClick={handleLoadIframe}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30"
          >
            <PlayIcon className="h-16 w-16 fill-white text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LazyYouTubeIframe;
