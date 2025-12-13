import { useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";
import { motion } from "motion/react";

interface VoiceNarrationProps {
  audioUrl: string;
  sceneId: number;
  onStart?: () => void; //  NUEVO: callback al empezar la narración
  onEnd?: () => void;   //  NUEVO: callback al terminar la narración
}

export function VoiceNarration({
  audioUrl,
  sceneId,
  onStart,
  onEnd,
}: VoiceNarrationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Crear nuevo elemento de audio cuando cambia la escena
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audio.volume = 0.8; // Volumen alto para que se escuche sobre la música
    audioRef.current = audio;
	
	// Handlers para eventos
    const handlePlay = () => {
      if (onStart) onStart(); //  avisar que empieza
    };
	
	const handleEnded = () => {
      if (onEnd) onEnd(); // avisar que termina
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("ended", handleEnded);

    // Reproducir automáticamente
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Error al reproducir audio de narración:", error);
      }
    };

    playAudio();

    // Cleanup al desmontar o cambiar de escena
    return () => {
       audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("ended", handleEnded);
	  
	  if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [sceneId, audioUrl, onStart, onEnd]); // Se ejecuta cada vez que cambia la escena

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50"
    >
      <div className="bg-[#0F1E3A]/90 backdrop-blur-md border-2 border-[#D4A574] rounded-full p-2 sm:p-3 shadow-2xl">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#98D8C8]" />
        </motion.div>
      </div>
    </motion.div>
  );
}