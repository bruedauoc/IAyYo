import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  audioUrl: string;
  audioRef?: React.RefObject<HTMLAudioElement>; // opcional: ref externo
}

export function BackgroundMusic({ audioUrl, audioRef }: BackgroundMusicProps) {
  // Si nos pasan un ref desde fuera (App), lo usamos.
  // Si no, usamos uno interno como antes.
  const internalRef = useRef<HTMLAudioElement>(null);
  const refToUse = audioRef ?? internalRef;

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = refToUse.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log(
          "La reproducción automática está bloqueada. Esperando interacción del usuario."
        );
      }
    };

    playAudio();

    const handleCanPlay = () => {
      if (!isPlaying) {
        playAudio();
      }
    };

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]); // el ref es estable, no hace falta añadirlo

  const toggleMute = async () => {
    const audio = refToUse.current;
    if (!audio) return;

    if (!isPlaying) {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (error) {
        console.error("Error al reproducir audio:", error);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (refToUse.current) {
      refToUse.current.muted = isMuted;
    }
  }, [isMuted, refToUse]);

  return (
    <>
      <audio
        ref={refToUse}   //  AHORA ESTE ES EL QUE CONTROLA App con bgmRef
        loop
        preload="auto"
        src={audioUrl}
      />

      {/* Botón de control de audio flotante */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#2A3F5F] hover:bg-[#3a5a82] border-2 border-[#D4AF37] shadow-lg transition-all duration-300 hover:scale-110 group"
        style={{
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
        aria-label={isMuted || !isPlaying ? "Activar música" : "Silenciar música"}
      >
        <div className="flex items-center justify-center">
          {isMuted || !isPlaying ? (
            <VolumeX className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F4E8D0]" />
          ) : (
            <Volume2 className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F4E8D0]" />
          )}
        </div>
      </button>
    </>
  );
}
