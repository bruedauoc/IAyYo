import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface AboutModalProps {
  onClose: () => void;
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-b from-[#2C5F5F] to-[#1E3A5F] border-4 border-[#D4A574] p-8 max-w-2xl w-full relative"
      >
        {/* Art Deco corner ornaments */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#98D8C8]" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-[#98D8C8]" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-[#98D8C8]" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#98D8C8]" />
        
        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-4 right-4 text-[#F5E6D3] hover:bg-[#F5E6D3]/10"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl mb-4 text-[#F5E6D3]" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
              Sobre el proyecto 'La IA y Yo'
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1 w-16 bg-[#D4A574]" />
              <div className="h-2 w-2 bg-[#98D8C8] rotate-45" />
              <div className="h-1 w-16 bg-[#D4A574]" />
            </div>
          </div>

          <div className="space-y-4 text-[#F5E6D3]">
            <p>
              <span className="text-[#E16B5A]">La IA y Yo</span> es una experiencia educativa interactiva 
              diseñada para enseñar a niños y adolescentes sobre el uso responsable de la inteligencia 
              artificial en el ámbito educativo midiendo el nivel de responsabilidad en base a 
			  las respuestas antes situaciones de varios tipos donde se hace uso de la IA.
            </p>

            <p>
              A través de situaciones realistas, explorarás junto a <span className="text-[#98D8C8]">AIA</span> 
              (Asistente Inteligente para el Aprendizaje) los beneficios, límites y riesgos del uso de IA 
              generativa en tus estudios. Cada decisión te ayudará a desarrollar pensamiento crítico y 
              ética digital.
            </p>

            <div className="bg-[#0F1E3A]/50 border-2 border-[#D4A574] p-4 relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#98D8C8]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#98D8C8]" />
              
              <h3 className="text-[#D4A574] mb-3" style={{ fontFamily: 'var(--font-display)' }}>Aprenderás sobre:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-[#E16B5A] mr-2">▸</span>
                  <span>Uso ético de la IA en tareas escolares</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E16B5A] mr-2">▸</span>
                  <span>Verificación de información y pensamiento crítico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E16B5A] mr-2">▸</span>
                  <span>Diferencia entre apoyo y dependencia tecnológica</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E16B5A] mr-2">▸</span>
                  <span>Integridad académica y originalidad</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-[#F5E6D3]/70">
              Proyecto educativo de divulgación sobre IA responsable en educación. Desarrollado por Beltrán Rueda Cruz para la UOC.
			  Copyright: CC-BY-NC-SA
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={onClose}
              className="px-8 py-3 bg-[#D4A574] hover:bg-[#C08F5A] text-[#1E3A5F] border-2 border-[#1E3A5F] tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Entendido
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
