# Efectos de Sonido - Historia Interactiva

Esta carpeta contiene los efectos de sonido que se reproducen durante la interacción del usuario.

## Archivo requerido:

Coloca el siguiente archivo de audio en esta carpeta:

**choice-click.mp3** - Efecto de sonido que se reproduce al hacer clic en una opción de respuesta

## Especificaciones:

- **Formato:** MP3 o WAV
- **Duración:** 0.5 - 1.5 segundos (sonido corto y nítido)
- **Volumen:** Normalizado (el código lo ajusta al 60%)
- **Tamaño de archivo:** Máximo 100KB
- **Tipo de sonido sugerido:** 
  - Clic retrofuturista (beep/blip electrónico)
  - Sonido de botón mecánico vintage
  - Efecto de confirmación tipo "beep" o "bloop"
  - Sonido sintético de los años 50-60

## Comportamiento:

- El sonido se reproduce **inmediatamente** al hacer clic en cualquier opción de respuesta
- Se reproduce por **encima** de la música de fondo y la narración de voz
- Volumen configurado al **60%** para no ser invasivo
- Si el archivo no existe, la aplicación continuará funcionando sin el efecto de sonido

## Recursos recomendados para conseguir sonidos:

### Sitios de efectos de sonido gratuitos:
- **Freesound.org** - https://freesound.org/ (búsqueda: "retro beep", "button click", "ui click")
- **Zapsplat** - https://www.zapsplat.com/ (sección: UI/Interface)
- **Pixabay Sounds** - https://pixabay.com/sound-effects/ (búsqueda: "button")

### Búsquedas sugeridas:
- "retro button click"
- "sci-fi beep"
- "vintage ui sound"
- "electronic blip"
- "confirmation sound"

## Ejemplo de conversión (si tienes un WAV):

```bash
# Convertir WAV a MP3 con ffmpeg
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k choice-click.mp3
```

## Notas técnicas:

- El archivo debe estar en `/public/sounds/choice-click.mp3`
- La ruta en el código es: `/sounds/choice-click.mp3` (sin "public")
- El navegador debe soportar reproducción de audio HTML5
- El audio se crea dinámicamente en cada clic para evitar conflictos
