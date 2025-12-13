import { Button } from "./ui/button";
import { motion } from "motion/react";
import aiaImage from "figma:asset/b92a43b5b6248f2a9fcccb48b00a61f8d883ba51.png";
import { RotateCcw, Share2 } from "lucide-react";

interface EndingScreenProps {
  endingType: "harmony" | "conflict" | "transcendence";
  title: string;
  description: string;
  reflection: string;
  backgroundImage: string;
  onRestart: () => void;
}

export function EndingScreen({
  endingType,
  title,
  description,
  reflection,
  backgroundImage,
  onRestart
}: EndingScreenProps) {
  const getEndingColor = () => {
    switch (endingType) {
      case "responsible":
        return { primary: "#98D8C8", secondary: "#4A9B9B" };
      case "dependent":
        return { primary: "#E16B5A", secondary: "#8B2635" };
      case "critical":
        return { primary: "#D4A574", secondary: "#E8D5C4" };
      default:
        return { primary: "#D4A574", secondary: "#98D8C8" };
    }
  };
  
  const colors = getEndingColor();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Ending background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/90 via-[#2C5F5F]/75 to-[#0F1E3A]/95" />
      </div>

      {/* Art Deco sunburst pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-0.5"
            style={{
              background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
              transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            style={{ 
              background: i % 2 === 0 ? colors.primary : colors.secondary,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0.3
            }}
            animate={{
              y: -20,
              opacity: [0.3, 0.7, 0.3],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl w-full"
        >
          {/* Ending Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center mb-8"
          >
            <div className="relative px-8 py-3 border-4 border-[#D4A574] bg-[#0F1E3A]/90">
              {/* Art Deco corner ornaments */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4" style={{ borderColor: colors.primary }} />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4" style={{ borderColor: colors.primary }} />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4" style={{ borderColor: colors.primary }} />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4" style={{ borderColor: colors.primary }} />
              
              <span className="text-[#D4A574] uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                Final Alcanzado
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl mb-4 text-[#F5E6D3]" style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 900,
              textShadow: `2px 2px 4px rgba(0,0,0,0.7), 0 0 30px ${colors.primary}`
            }}>
              {title}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-24" style={{ background: colors.primary }} />
              <div className="h-2 w-2 rotate-45" style={{ background: colors.secondary }} />
              <div className="h-1 w-24" style={{ background: colors.primary }} />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0F1E3A]/85 backdrop-blur-sm border-2 border-[#D4A574] p-8 mb-6 relative"
          >
            {/* Art Deco corner decorations */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#98D8C8]" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#98D8C8]" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#98D8C8]" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#98D8C8]" />
            
            <p className="text-[#F5E6D3] text-lg mb-6 relative z-10">
              {description}
            </p>
            
            {/* AIA's Reflection */}
            <div className="border-t-2 border-[#D4A574] pt-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <div className="absolute inset-0 border-2 border-[#D4A574]" style={{
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
                  }}>
                    <img
                      src={aiaImage}
                      alt="AIA"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#E16B5A] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Reflexión de AIA:</p>
                  <p className="text-[#F5E6D3] italic">"{reflection}"</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onRestart}
              className="px-8 py-6 border-2 border-[#1E3A5F] text-[#1E3A5F] shadow-lg tracking-wider uppercase hover:opacity-90"
              style={{ 
                background: colors.primary,
                fontFamily: 'var(--font-display)'
              }}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reiniciar Aventura
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex gap-8 bg-[#0F1E3A]/70 backdrop-blur-sm border-2 border-[#D4A574] px-8 py-4 relative">
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#98D8C8]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#98D8C8]" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              <div>
                <div className="text-[#D4A574] text-sm" style={{ fontFamily: 'var(--font-display)' }}>Tu Final</div>
                <div className="text-[#F5E6D3] capitalize">{endingType}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
