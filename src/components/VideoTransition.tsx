import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { SkipForward } from "lucide-react";

interface VideoTransitionProps {
  videoUrl: string;
  endingType: "responsible" | "dependent" | "critical";
  onVideoEnd: () => void;
}

export function VideoTransition({ videoUrl, endingType, onVideoEnd }: VideoTransitionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Intentar reproducir automáticamente
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Error al reproducir video automáticamente:", error);
      }
    };

    playVideo();

    // Listener para cuando el video termina
    const handleVideoEnd = () => {
      onVideoEnd();
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [onVideoEnd]);

  const getEndingColor = () => {
    switch (endingType) {
      case "responsible":
        return "#98D8C8";
      case "dependent":
        return "#E16B5A";
      case "critical":
        return "#D4A574";
      default:
        return "#D4A574";
    }
  };

  const color = getEndingColor();

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0F1E3A]">
      {/* Geometric accent borders */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />

      {/* Art Deco corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 opacity-30" style={{ borderColor: color }} />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 opacity-30" style={{ borderColor: color }} />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 opacity-30" style={{ borderColor: color }} />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 opacity-30" style={{ borderColor: color }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl relative"
        >
          {/* Art Deco frame */}
          <div className="relative border-4 border-[#D4A574] shadow-2xl" style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
          }}>
            <video
              ref={videoRef}
              className="w-full aspect-video bg-black"
              controls
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          {/* Decorative corners */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4" style={{ borderColor: color }} />
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4" style={{ borderColor: color }} />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4" style={{ borderColor: color }} />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4" style={{ borderColor: color }} />
        </motion.div>

        {/* Skip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Button
            onClick={onVideoEnd}
            className="px-8 py-4 border-2 border-[#D4A574] text-[#F5E6D3] hover:bg-[#D4A574]/20 backdrop-blur-sm shadow-lg relative group"
            variant="outline"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <SkipForward className="w-5 h-5 mr-2" />
            Continuar al Final
          </Button>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-[#98D8C8] text-sm text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#98D8C8] animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            REPRODUCIENDO FINAL
            <div className="w-2 h-2 bg-[#98D8C8] animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
