import { Button } from "./ui/button";
import { motion } from "motion/react";

interface IntroScreenProps {
  onContinue: () => void;
}

export function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C5F5F] via-[#1E3A5F] to-[#0F1E3A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Art Deco grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#D4A574 1px, transparent 1px), linear-gradient(90deg, #D4A574 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Radiating lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-[#98D8C8] to-transparent"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full relative z-10"
      >
        {/* AIA Video Animation */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* Art Deco frame for AIA Video */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 border-3 border-[#D4A574]" style={{
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
              }}>
                <video
				  src="/recursos/videos/video1.mp4"
				  className="w-full h-full object-cover"
				  style={{
					clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
					border: 'none'
				  }}
				  autoPlay
				  muted
				  loop
				  playsInline
				/>
              </div>
              
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#98D8C8]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#98D8C8]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#98D8C8]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#98D8C8]" />
            </div>
            
            {/* Pulsing geometric shapes */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-[#D4A574]"
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 border-2 border-[#98D8C8]"
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
            />
          </div>
        </motion.div>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-[#0F1E3A]/80 backdrop-blur-sm border-2 border-[#D4A574] p-8 mb-8 relative"
        >
          {/* Art Deco corner decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#98D8C8]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#98D8C8]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#98D8C8]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#98D8C8]" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 text-[#F5E6D3]"
          >
            <p className="text-xl text-[#D4A574]" style={{ fontFamily: 'var(--font-display)' }}>
              "¡Hola! Soy <span className="text-[#98D8C8]">AIA</span>, tu Asistente Inteligente para el Aprendizaje."
            </p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              La inteligencia artificial puede ser una herramienta increíble para aprender, pero como cualquier 
              tecnología poderosa, debemos usarla con responsabilidad y pensamiento crítico.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              En esta aventura, te enfrentarás a situaciones reales que los estudiantes encuentran al usar IA 
              en sus estudios. Tus decisiones mostrarán si comprendes cómo usar esta tecnología de manera ética 
              y beneficiosa para tu aprendizaje.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              className="text-[#E16B5A]"
            >
              ¿Estás listo para aprender sobre el uso responsable de la IA en la educación?
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={onContinue}
            className="px-10 py-6 bg-[#D4A574] hover:bg-[#C08F5A] text-[#1E3A5F] border-2 border-[#1E3A5F] shadow-lg tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Continuar →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}