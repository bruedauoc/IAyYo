import { Button } from "./ui/button";
import { motion } from "motion/react";
import aiaImage from "figma:asset/b92a43b5b6248f2a9fcccb48b00a61f8d883ba51.png";

interface StartScreenProps {
  onStart: () => void;
  onAbout: () => void;
}

export function StartScreen({ onStart, onAbout }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E3A5F] via-[#4A9B9B] to-[#2C5F5F] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Art Deco geometric background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(212, 165, 116, 0.3) 50px, rgba(212, 165, 116, 0.3) 51px),
            repeating-linear-gradient(-45deg, transparent, transparent 50px, rgba(152, 216, 200, 0.3) 50px, rgba(152, 216, 200, 0.3) 51px)
          `,
        }} />
      </div>
      
      {/* Animated rays */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#D4A574] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#98D8C8] rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* Art Deco header decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-[#D4A574]" />
            <div className="w-3 h-3 bg-[#D4A574] rotate-45" />
            <div className="w-3 h-3 bg-[#98D8C8] rotate-45" />
            <div className="w-3 h-3 bg-[#D4A574] rotate-45" />
            <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-[#D4A574]" />
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl mb-4 text-[#F5E6D3] tracking-wider" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212, 165, 116, 0.5)' }}>
            IA y Yo
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-16 bg-[#D4A574]" />
            <div className="h-2 w-2 bg-[#98D8C8] rotate-45" />
            <div className="h-1 w-16 bg-[#D4A574]" />
          </div>
        </motion.div>

        {/* AIA Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 relative"
        >
          {/* Art Deco frame */}
          <div className="relative w-80 h-80 mx-auto">
            <div className="absolute inset-0 border-4 border-[#D4A574]" style={{
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
            }}>
              <img
                src={aiaImage}
                alt="AIA - Asistente de Inteligencia Avanzada"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Corner decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-[#98D8C8]" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-[#98D8C8]" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-[#98D8C8]" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-[#98D8C8]" />
            
            {/* Animated orbital rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-80 h-80 mx-auto pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#D4A574] -translate-x-1/2" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-[#98D8C8] -translate-x-1/2" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-[#F5E6D3] mb-8 text-lg tracking-wide"
        >
          ¿Quieres comprobar si eres un usuario responsable de la IA?
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onStart}
            className="px-8 py-6 bg-[#D4A574] hover:bg-[#C08F5A] text-[#1E3A5F] border-2 border-[#1E3A5F] shadow-lg tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Comenzar Aventura
          </Button>
          <Button
            onClick={onAbout}
            variant="outline"
            className="px-8 py-6 border-2 border-[#F5E6D3] text-[#F5E6D3] hover:bg-[#F5E6D3]/10 tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Sobre el Proyecto
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
