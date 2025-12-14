import { Button } from "./ui/button";
import { motion } from "motion/react";
import aiaImage from "figma:asset/b92a43b5b6248f2a9fcccb48b00a61f8d883ba51.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Choice {
  id: number;
  text: string;
  consequence?: string;
}

interface DecisionScreenProps {
  sceneId: number;
  sceneTitle: string;
  dialogue: string;
  choices: Choice[];
  backgroundImage: string;
  aiaVideoUrl?: string; // NUEVO
  onChoice: (choiceId: number) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export function DecisionScreen({
  sceneId,
  sceneTitle,
  dialogue,
  choices,
  backgroundImage,
  aiaVideoUrl,
  onChoice,
  onBack,
  canGoBack = false
}: DecisionScreenProps) {
  // Función para reproducir el sonido de clic
  const playChoiceSound = () => {
    const audio = new Audio("/recursos/sfx/button-sfx-1.mp3");
    audio.volume = 0.6; // Volumen moderado
    audio.play().catch(error => {
      console.log("Error al reproducir sonido de clic:", error);
    });
  };

  // Handler que reproduce el sonido y ejecuta la acción
  const handleChoiceClick = (choiceId: number) => {
    playChoiceSound();
    onChoice(choiceId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Scene background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/85 via-[#2C5F5F]/70 to-[#0F1E3A]/90" />
      </div>

      {/* Art Deco pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, #D4A574 3px, #D4A574 4px)`,
        }} />
      </div>
      
      {/* Geometric accent borders */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#D4A574] to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3 md:mb-4"
        >
          <div className="inline-block bg-[#0F1E3A]/80 backdrop-blur-sm border-2 border-[#D4A574] px-4 py-2 md:px-6 md:py-3 relative">
            {/* Art Deco corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#98D8C8]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#98D8C8]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#98D8C8]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#98D8C8]" />
            <h2 className="text-[#D4A574] text-base md:text-lg" style={{ fontFamily: 'var(--font-display)' }}>{sceneTitle}</h2>
          </div>
        </motion.div>

        {/* Central Dialogue Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex items-center justify-center px-2 md:px-4 py-4 md:py-0"
        >
          <div className="max-w-3xl w-full">
            {/* AIA Avatar - Responsive */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 mb-4 sm:mb-6"
            >
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                {/* Art Deco avatar frame - Responsive */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
                  <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-[#D4A574] shadow-2xl" style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                  }}>
                    {aiaVideoUrl ? (
					  <video
						key={aiaVideoUrl}        // cambia al cambiar de escena
						src={aiaVideoUrl}
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
						className="w-full h-full object-cover"
					  />
					) : (
					  <img
						src={aiaImage}
						alt="AIA"
						className="w-full h-full object-cover"
					  />
					)}
                  </div>
                  {/* Indicador de actividad responsive */}
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-[#98D8C8] border-2 border-[#0F1E3A] animate-pulse shadow-lg" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                  {/* Marco decorativo adicional responsive */}
                  <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-[#98D8C8]" />
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-[#98D8C8]" />
                </div>
              </div>

              {/* Dialogue Box */}
              <div className="flex-1 w-full bg-[#0F1E3A]/90 backdrop-blur-sm border-2 border-[#D4A574] p-4 sm:p-6 relative">
                {/* Art Deco pointer - solo en desktop */}
                <div className="hidden sm:block absolute -left-3 top-8 w-6 h-6 bg-[#0F1E3A] border-l-2 border-b-2 border-[#D4A574] rotate-45" />
                {/* Corner decorations */}
                <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#98D8C8]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#98D8C8]" />
                <p className="text-[#F5E6D3] text-sm sm:text-base md:text-lg leading-relaxed">{dialogue}</p>
              </div>
            </motion.div>

            {/* Choice Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 sm:space-y-4"
            >
              {choices.map((choice, index) => (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Button
                    onClick={() => handleChoiceClick(choice.id)}
                    className="w-full p-4 sm:p-6 bg-[#2C5F5F]/80 hover:bg-[#4A9B9B]/80 border-2 border-[#D4A574] hover:border-[#F5E6D3] text-left justify-start text-[#F5E6D3] backdrop-blur-sm shadow-lg relative group transition-all text-sm sm:text-base"
                  >
                    {/* Corner accents that appear on hover */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#98D8C8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="text-[#D4A574] mr-2 sm:mr-3" style={{ fontFamily: 'var(--font-display)' }}>{index + 1}.</span>
                    {choice.text}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-between items-center mt-4"
        >
          <Button
            onClick={onBack}
            disabled={!canGoBack}
            variant="outline"
            className="border-2 border-[#D4A574] text-[#F5E6D3] hover:bg-[#D4A574]/10 disabled:opacity-30 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Volver
          </Button>

          <div className="bg-[#0F1E3A]/80 backdrop-blur-sm border-2 border-[#D4A574] px-3 py-1 sm:px-6 sm:py-2 relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#98D8C8]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#98D8C8]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <span className="text-[#D4A574] text-sm sm:text-base" style={{ fontFamily: 'var(--font-display)' }}>Escena {sceneId}</span>
          </div>

          <div className="w-16 sm:w-24" /> {/* Spacer for alignment */}
        </motion.div>
      </div>
    </div>
  );
}