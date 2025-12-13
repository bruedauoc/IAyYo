# Videos de Transición - Finales

Esta carpeta contiene los videos que se reproducen antes de mostrar cada final de la historia interactiva.

## Archivos requeridos:

Coloca los siguientes archivos de video en esta carpeta:

1. **final-responsible.mp4** - Video para el final "Aprendiz Responsable"
2. **final-dependent.mp4** - Video para el final "Dependencia Digital"
3. **final-critical.mp4** - Video para el final "Pensador Crítico"

## Especificaciones:

- **Formato:** MP4 (H.264)
- **Duración:** 10 segundos exactos
- **Resolución:** 1920x1080 (Full HD) o 1280x720 (HD)
- **Aspect ratio:** 16:9
- **Tamaño de archivo:** Máximo 5-10MB por video
- **Audio:** Opcional (puede incluir música/narración)

## Notas:

- Los videos se reproducirán automáticamente cuando el usuario llegue a un final
- El usuario puede saltar el video haciendo clic en "Continuar al Final"
- Cuando el video termina, automáticamente avanza a la pantalla del final correspondiente
- Los videos incluyen controles básicos de reproducción (play/pause)

## Cómo convertir/optimizar videos:

Si necesitas reducir el tamaño o convertir el formato:

```bash
# Usando ffmpeg (herramienta gratuita de línea de comandos)
ffmpeg -i input.mov -vcodec h264 -acodec aac -vf scale=1280:720 final-responsible.mp4
```

O usa herramientas online como:
- https://www.freeconvert.com/video-converter
- https://cloudconvert.com/mp4-converter