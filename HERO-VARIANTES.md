# Alternância do hero

As duas versões do header continuam preservadas em `app/page.tsx`.

- `const heroBackgroundMode = "video"` usa `public/assets/hero-mar-video.mp4`.
- `const heroBackgroundMode = "image"` restaura a imagem com o efeito de mar anterior.

O arquivo original enviado pela cliente também foi mantido sem alterações
localmente em `public/assets/magnific_use-the-provided-image-as_s77nNnJl8e.mp4`.
Ele não é enviado ao GitHub nem ao deploy para evitar peso desnecessário. A
página usa uma cópia otimizada para web, reduzindo o carregamento de 22 MB para
9,4 MB.
No mobile, o navegador recebe uma versão 720p ainda menor.

Quando a pessoa tem a preferência de movimento reduzido ativada no sistema, a
página troca automaticamente o vídeo pela versão estática anterior.
