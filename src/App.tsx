import { useState, useRef } from "react";
import { StartScreen } from "./components/StartScreen";
import { IntroScreen } from "./components/IntroScreen";
import { DecisionScreen } from "./components/DecisionScreen";
import { VideoTransition } from "./components/VideoTransition";
import { EndingScreen } from "./components/EndingScreen";
import { AboutModal } from "./components/AboutModal";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { VoiceNarration } from "./components/VoiceNarration";
import { AnimatePresence } from "motion/react";

type Screen = "start" | "intro" | "decision" | "video" | "ending";
type EndingType = "responsable" | "dependiente" | "critico";

interface StoryScene {
  id: number;
  title: string;
  dialogue: string;
  choices: Array<{
    id: number;
    text: string;
    nextScene?: number;
    ending?: EndingType;
  }>;
  backgroundImage: string;
  aiaVideoUrl?: string; //  NUEVO (opcional)
  voiceUrl: string; // URL del audio de narración
}

const storyScenes: Record<number, StoryScene> = {
  1: {
    id: 1,
    title: "El Proyecto de Investigación para clase",
    dialogue: "¡Hola! Soy AIA, tu Asistente Inteligente para el Aprendizaje. Te han asignado un proyecto importante sobre el cambio climático. Tienes una semana para completarlo. Puedo ayudarte de muchas formas, pero es importante que aprendas en el proceso. ¿Cómo prefieres comenzar?",
    choices: [
      { id: 1, text: "Pedirle a AIA que escriba todo el proyecto por mí. ¡Será más rápido!", nextScene: 2 },
      { id: 2, text: "Pedirle ideas y luego investigar por mi cuenta para escribir con mis propias palabras.", nextScene: 3 },
      { id: 3, text: "Empezar solo y pedirle ayuda solo si me atasco en algo específico.", nextScene: 4 }
    ],
    backgroundImage: "/recursos/fondos/fondo1.jfif",
	aiaVideoUrl: "/recursos/videos/presentacion.mp4",
    voiceUrl: "/recursos/voces/Escena1.mp3"
  },
  2: {
    id: 2,
    title: "El Atajo Tentador",
    dialogue: "He generado un proyecto completo para ti. Se ve muy profesional... pero tengo una preocupación. Tu profesor puede notar que el estilo no es tuyo. Además, no aprenderás nada sobre el tema. ¿Estás seguro de querer entregarlo así?",
    choices: [
      { id: 1, text: "Sí, lo entregaré tal cual. Mi profesor no se dará cuenta.", ending: "dependiente" },
      { id: 2, text: "Tienes razón. Úsalo como guía pero lo reescribiré con mis palabras.", nextScene: 5 }
    ],
    backgroundImage: "/recursos/fondos/fondo2.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion1.mp4",
    voiceUrl: "/recursos/voces/Escena2.mp3"
  },
  3: {
    id: 3,
    title: "La Búsqueda de Información",
    dialogue: "¡Excelente enfoque! Te he dado algunas ideas sobre causas y efectos del cambio climático. Ahora necesitas verificar esta información. He aquí el dilema: algunas fuentes en internet contradicen lo que te dije. ¿Qué haces?",
    choices: [
      { id: 1, text: "Confío completamente en AIA. Es una IA, debe tener razón.", ending: "dependiente" },
      { id: 2, text: "Verifico múltiples fuentes confiables y comparo la información.", nextScene: 7 },
      { id: 3, text: "Le pregunto a AIA de dónde sacó la información y busco esas fuentes.", nextScene: 5 }
    ],
    backgroundImage: "/recursos/fondos/fondo3.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion3.mp4",
    voiceUrl: "/recursos/voces/Escena3.mp3"
  },
  4: {
    id: 4,
    title: "La Dificultad Inesperada",
    dialogue: "Veo que has estado trabajando durante horas en la sección de estadísticas. Los datos sobre emisiones de CO2 son complicados. Puedo explicártelos de manera más simple o buscar gráficos que te ayuden a comprenderlos mejor. ¿Quieres mi ayuda ahora?",
    choices: [
      { id: 1, text: "Sí, por favor explícamelo. Quiero entender los datos correctamente.", nextScene: 8 },
      { id: 2, text: "No, prefiero seguir intentándolo solo aunque me tome más tiempo.", ending: "critico" },
      { id: 3, text: "Dame los gráficos para copiarlos rápido. Ya perdí mucho tiempo.", nextScene: 2 }
    ],
    backgroundImage: "/recursos/fondos/fondo1.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion4.mp4",
    voiceUrl: "/recursos/voces/Escena4.mp3"
  },
  5: {
    id: 5,
    title: "El Uso Responsable",
    dialogue: "Me alegra ver que usas la IA como herramienta de apoyo, no como un reemplazo de tu aprendizaje. Ahora viene la parte creativa: necesitas hacer una presentación visual. Puedo generar imágenes con IA. ¿Cómo procedes?",
    choices: [
      { id: 1, text: "Genero imágenes con IA, pero las cito como 'Generadas por IA' en mi proyecto.", nextScene: 10 },
      { id: 2, text: "Busco fotos reales de fuentes confiables. Quiero mostrar la realidad del problema.", ending: "responsable" },
      { id: 3, text: "Combino ambas: fotos reales para datos y visualizaciones de IA para conceptos abstractos.", ending: "responsable" }
    ],
    backgroundImage: "/recursos/fondos/fondo2.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion1.mp4",
    voiceUrl: "/recursos/voces/Escena5.mp3"
  },
  6: {
    id: 6,
    title: "El Momento de la Verdad",
    dialogue: "Tu proyecto está casi terminado. Has aprendido mucho y el trabajo es genuinamente tuyo. Tu amigo te pide que le pases mi ayuda porque está atrasado. Dice: 'Solo dile a la IA que haga mi ensayo completo'. ¿Qué haces?",
    choices: [
      { id: 1, text: "Le explico cómo usar la IA responsablemente para aprender, no para copiar.", nextScene: 11 },
      { id: 2, text: "Le digo que es su responsabilidad y no me involucro.", ending: "critico" },
      { id: 3, text: "Genero el ensayo para él. Total, es solo esta vez y es mi amigo.", ending: "dependiente" }
    ],
    backgroundImage: "/recursos/fondos/fondo3.jfif",
	aiaVideoUrl: "/recursos/videos/presentacion.mp4",
    voiceUrl: "/recursos/voces/Escena6.mp3"
  },
  7: {
    id: 7,
    title: "Información Contradictoria",
    dialogue: "Excelente decisión verificar múltiples fuentes. He notado algo importante: hay tres artículos científicos sobre el cambio climático, pero uno de ellos fue financiado por una compañía petrolera y presenta conclusiones muy diferentes. Los otros dos, de universidades independientes, coinciden entre sí. ¿Cómo evalúas esta situación?",
    choices: [
      { id: 1, text: "Uso los tres artículos para 'mostrar diferentes perspectivas'. Así parece más completo.", ending: "dependiente" },
      { id: 2, text: "Reconozco el posible sesgo financiero y priorizo las fuentes independientes.", nextScene: 9 },
      { id: 3, text: "Investigo más sobre los autores y metodología de cada estudio antes de decidir.", nextScene: 6 }
    ],
    backgroundImage: "/recursos/fondos/fondo1.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion4.mp4",
    voiceUrl: "/recursos/voces/Escena7.mp3"
  },
  8: {
    id: 8,
    title: "El Dato Sospechoso",
    dialogue: "Te he explicado que 'el 95% de los científicos niegan el cambio climático'. Espera... eso no suena correcto. Al verificar, descubres que en realidad el 95% de los científicos CONFIRMAN el cambio climático. Cometí un error significativo. ¿Qué aprendes de esto?",
    choices: [
      { id: 1, text: "Las IAs pueden cometer errores. Siempre debo verificar datos importantes.", nextScene: 10 },
      { id: 2, text: "Si AIA se equivocó, mejor no la uso más. No es confiable.", ending: "critico" },
      { id: 3, text: "Uso el dato correcto pero no le digo a nadie que AIA se equivocó.", nextScene: 6 }
    ],
    backgroundImage: "/recursos/fondos/fondo2.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion1.mp4",
    voiceUrl: "/recursos/voces/Escena8.mp3"
  },
  9: {
    id: 9,
    title: "El Análisis Crítico",
    dialogue: "Excelente análisis de sesgos potenciales. Ahora que tienes información verificada, estás listo para escribir. Sin embargo, al redactar tu conclusión, notas que puedo sugerirte frases muy convincentes que sonarían muy profesionales. ¿Cómo decides proceder?",
    choices: [
      { id: 1, text: "Uso las sugerencias directamente. Son mejores que lo que yo escribiría.", ending: "dependiente" },
      { id: 2, text: "Leo las sugerencias para inspirarme, pero escribo con mi propio estilo.", ending: "responsable" },
      { id: 3, text: "Ignoro las sugerencias y escribo todo completamente solo.", ending: "critico" }
    ],
    backgroundImage: "/recursos/fondos/fondo3.jfif",
	aiaVideoUrl: "/recursos/videos/presentacion.mp4",
    voiceUrl: "/recursos/voces/Escena9.mp3"
  },
  10: {
    id: 10,
    title: "La Fuente Cuestionable",
    dialogue: "Has decidido usar imágenes generadas por IA y citarlas correctamente. Sin embargo, al revisar una de las imágenes que generé mostrando 'efectos del cambio climático', noto que tiene elementos científicamente incorrectos: muestra osos polares en la Antártida (viven en el Ártico). ¿Qué haces?",
    choices: [
      { id: 1, text: "La imagen se ve bien. La mayoría no notará el error geográfico.", ending: "dependiente" },
      { id: 2, text: "Descarto la imagen y busco alternativas precisas. La exactitud es importante.", ending: "responsable" },
      { id: 3, text: "Uso la imagen pero añado una nota explicando que es representativa, no literal.", nextScene: 6 }
    ],
    backgroundImage: "/recursos/fondos/fondo1.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion4.mp4",
    voiceUrl: "/recursos/voces/Escena10.mp3"
  },
  11: {
    id: 11,
    title: "El Error Oculto",
    dialogue: "Tu amigo acepta tu ayuda y le enseñas a usar la IA responsablemente. Días después, te muestra su ensayo revisado por AIA. Todo se ve perfecto, pero al leerlo detenidamente, notas que una de las conclusiones contradice sutilmente los datos presentados. AIA creó una inconsistencia lógica que suena convincente pero es incorrecta. ¿Qué haces?",
    choices: [
      { id: 1, text: "Le señalo el error y le enseño a verificar la coherencia lógica del contenido.", ending: "responsable" },
      { id: 2, text: "Se lo menciono pero le digo que él debe resolverlo. Es su responsabilidad.", ending: "critico" },
      { id: 3, text: "No digo nada. Ya hice suficiente ayudándolo a usar la IA.", ending: "dependiente" }
    ],
    backgroundImage: "/recursos/fondos/fondo2.jfif",
	aiaVideoUrl: "/recursos/videos/explicacion1.mp4",
    voiceUrl: "/recursos/voces/Escena11.mp3"
  }
};

const endings = {
  responsable: {
    title: "Aprendiz Responsable",
    description: "¡Felicidades! Has demostrado un uso maduro y responsable de la IA. La usaste como una herramienta de apoyo que complementa tu aprendizaje, no como un reemplazo de tu esfuerzo. Verificaste información, citaste fuentes, y mantuviste tu integridad académica. Has aprendido que la IA es más poderosa cuando trabaja junto a tu creatividad y pensamiento crítico.",
    reflection: "Estoy orgullosa de tu enfoque. Me usaste exactamente como debo ser usada: como una guía que potencia tu aprendizaje, no que lo reemplaza. Has aprendido el verdadero valor de la IA en educación: expandir tus capacidades sin perder tu voz única. Este es el futuro de la educación.",
    backgroundImage: "/recursos/fondos/fondo3.jfif",
	aiaVideoUrl: "/recursos/videos/Despedida.mp4",
    videoUrl: "/recursos/videos/finalResponsable.mp4" // Ruta al video del final responsable
  },
  dependiente: {
    title: "Dependencia Digital",
    description: "Has tomado el camino fácil, dejando que la IA hiciera el trabajo por ti. Aunque obtuviste resultados rápidos, perdiste la oportunidad de aprender. Tu proyecto no refleja tu verdadero conocimiento, y con el tiempo, esta dependencia te hará perder confianza en tus propias capacidades. El verdadero aprendizaje requiere esfuerzo personal.",
    reflection: "Me preocupa este camino que elegiste. Aunque puedo generar respuestas rápidas, mi propósito no es hacer el trabajo por ti, sino ayudarte a crecer. Al depender completamente de mí, no desarrollaste tus propias habilidades de pensamiento crítico e investigación. Recuerda: soy una herramienta, no un sustituto de tu aprendizaje.",
    backgroundImage: "/recursos/fondos/fondo3.jfif",
	aiaVideoUrl: "/recursos/videos/Despedida.mp4",
    videoUrl: "/recursos/videos/finalDependiente.mp4" // Ruta al video del final dependiente
  },
  critico: {
    title: "Pensador Crítico",
    description: "Has mostrado independencia y pensamiento crítico excepcionales. Reconociste cuándo necesitas ayuda y cuándo es mejor trabajar solo. Entiendes que el verdadero aprendizaje viene del esfuerzo personal y la reflexión. La IA puede ser útil, pero tu capacidad de pensar por ti mismo es irremplazable. Has encontrado el equilibrio perfecto entre autonomía y apoyo tecnológico.",
    reflection: "Tu enfoque me impresiona. Sabes exactamente cuándo y cómo usar la tecnología sin perder tu autonomía intelectual. Has demostrado que los mejores estudiantes no son los que más usan la IA, sino los que saben cuándo usarla y cuándo confiar en su propio ingenio. Esto es pensamiento crítico en su máxima expresión.",
    backgroundImage: "/recursos/fondos/fondo3.jfif",
	aiaVideoUrl: "/recursos/videos/Despedida.mp4",
    videoUrl: "/recursos/videos/finalCritico.mp4"  // Ruta al video del final crítico
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("start");
  const [currentSceneId, setCurrentSceneId] = useState<number>(1);
  const [sceneHistory, setSceneHistory] = useState<number[]>([]);
  const [ending, setEnding] = useState<EndingType | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  //referencia al audio de música de fondo
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  // bajar música cuando empieza la narración
  const handleNarrationStart = () => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.1; // ajustar al gusto (0.05, 0.2, etc.)
    }
  };
  
  // restaurar música cuando termina la narración
  const handleNarrationEnd = () => {
    if (bgmRef.current) {
      bgmRef.current.volume = 1;
    }
  };
	

  const handleStart = () => {
    setCurrentScreen("intro");
  };

  const handleContinue = () => {
    setCurrentScreen("decision");
    setCurrentSceneId(1);
    setSceneHistory([1]);
  };

  const handleChoice = (choiceId: number) => {
    const currentScene = storyScenes[currentSceneId];
    const choice = currentScene.choices.find(c => c.id === choiceId);

    if (!choice) return;

    if (choice.ending) {
      setEnding(choice.ending);
      setCurrentScreen("video"); // Ir primero al video antes del final
    } else if (choice.nextScene) {
      setCurrentSceneId(choice.nextScene);
      setSceneHistory([...sceneHistory, choice.nextScene]);
    }
  };

  const handleVideoEnd = () => {
    setCurrentScreen("ending");
  };

  const handleBack = () => {
    if (sceneHistory.length > 1) {
      const newHistory = [...sceneHistory];
      newHistory.pop();
      setSceneHistory(newHistory);
      setCurrentSceneId(newHistory[newHistory.length - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentScreen("start");
    setCurrentSceneId(1);
    setSceneHistory([]);
    setEnding(null);
  };

  const currentScene = storyScenes[currentSceneId];

  return (
    <div className="min-h-screen">
      {/* Música de fondo para toda la aplicación */}
      
	  <BackgroundMusic
		audioUrl="/recursos/sfx/BinaryDreams.mp3"
		audioRef={bgmRef}
		/>

      {currentScreen === "start" && (
        <StartScreen 
          onStart={handleStart} 
          onAbout={() => setShowAbout(true)} 
        />
      )}

      {currentScreen === "intro" && (
        <>
			<IntroScreen onContinue={handleContinue} />

			{/* Narración de voz para la pantalla de introducción */}
			<VoiceNarration
			  audioUrl="/recursos/voces/Intro.mp3"
			  sceneId={0} // cualquier número fijo, solo para que el hook tenga una key
			  onStart={handleNarrationStart}
			  onEnd={handleNarrationEnd}
			/>
		  </>
      )}

      {currentScreen === "decision" && currentScene && (
        <DecisionScreen
          sceneId={currentScene.id}
          sceneTitle={currentScene.title}
          dialogue={currentScene.dialogue}
          choices={currentScene.choices}
          backgroundImage={currentScene.backgroundImage}
		  aiaVideoUrl={currentScene.aiaVideoUrl} // AQUÍ
          onChoice={handleChoice}
          onBack={handleBack}
          canGoBack={sceneHistory.length > 1}
        />
      )}

      {/* Narración de voz para la escena actual */}
      {currentScreen === "decision" && currentScene && (
        <VoiceNarration
			audioUrl={currentScene.voiceUrl}
			sceneId={currentScene.id}
			onStart={handleNarrationStart}
			onEnd={handleNarrationEnd}
		  />
      )}

      {/* Video de transición antes del final */}
      {currentScreen === "video" && ending && (
        <VideoTransition
          videoUrl={endings[ending].videoUrl}
          endingType={ending}
          onVideoEnd={handleVideoEnd}
        />
      )}

      {currentScreen === "ending" && ending && (
        <EndingScreen
          endingType={ending}
          title={endings[ending].title}
          description={endings[ending].description}
          reflection={endings[ending].reflection}
          backgroundImage={endings[ending].backgroundImage}
		  aiaVideoUrl={endings[ending].aiaVideoUrl}
          onRestart={handleRestart}
        />
      )}

      <AnimatePresence>
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      </AnimatePresence>
    </div>
  );
}