# Animaciones con Anime.js - RentGamer

## 📦 Instalación
```bash
npm install animejs
```

## ✨ Animaciones Implementadas

### 1. **CoverImage (Página Principal)**
- **Animación de entrada de imagen**: Zoom out con fade in (escala de 1.2 a 1)
- **Título animado**: Entrada desde arriba con fade in
- **Subtítulo**: Entrada desde abajo con fade in
- **Botón**: Entrada elástica con efecto pulsante continuo
- **Efecto hover en botón**: Brillo deslizante y transformación

### 2. **Header**
- **Animación de entrada**: Slide down desde arriba con fade in
- Duración: 1000ms con easing exponencial

### 3. **InfoSection**
- **Logo con rotación**: Gira 360° mientras escala desde 0 a 1
- **Título**: Entrada desde la izquierda con fade in
- **Texto**: Entrada desde abajo con fade in
- **Observador de intersección**: Las animaciones se activan cuando el elemento entra en vista

### 4. **GameCard (Tarjetas de Juegos)**
- **Animación de entrada**: Fade in desde abajo cuando entra en vista
- **Hover en imagen**: Zoom suave (escala 1.1) con anime.js
- **Hover en tarjeta**: Elevación con sombra animada
- **Efecto de brillo en borde**: Gradiente azul en hover
- **Botones mejorados**: Gradiente animado con efecto ripple

### 5. **Modal**
- **Apertura**: Animación elástica de escala (0.7 a 1) con fade in
- **Cierre**: Escala inversa con fade out
- **Overlay**: Fade in/out del fondo oscuro

### 6. **ShoppingCart**
- **Ícono animado**: Sacudida y escala cuando se agrega un item
- **Rotación y escala**: Efecto de celebración al agregar productos
- Duración: 500ms

## 🎨 Estilos CSS Mejorados

### Mejoras Visuales
- **Gradientes**: Fondos con degradados azules
- **Sombras dinámicas**: Box-shadow animado en hover
- **Bordes brillantes**: Efectos de borde con colores temáticos
- **Transiciones suaves**: Todas las animaciones con easing apropiado

### Botones Interactivos
- Gradientes de fondo
- Efectos ripple (onda de agua)
- Sombras elevadas en hover
- Transformaciones 3D sutiles

## 📁 Archivo de Utilidades

Se creó `src/utils/animations.js` con funciones reutilizables:

### Funciones Disponibles:
- `fadeInUp()` - Entrada desde abajo
- `fadeInDown()` - Entrada desde arriba
- `fadeInLeft()` - Entrada desde la izquierda
- `fadeInRight()` - Entrada desde la derecha
- `scaleIn()` - Animación de escala
- `rotateIn()` - Rotación con escala
- `pulse()` - Pulso continuo
- `buttonHover()` / `buttonHoverOut()` - Efectos de hover
- `shake()` - Sacudida
- `bounce()` - Rebote
- `fadeOut()` - Desvanecimiento
- `staggerFadeIn()` - Efecto cascada
- `float()` - Flotación continua
- `modalOpen()` / `modalClose()` - Animaciones de modal

### Uso Ejemplo:
```javascript
import { fadeInUp, pulse } from '../../utils/animations';

useEffect(() => {
  fadeInUp(elementRef.current, 300);
  pulse(buttonRef.current);
}, []);
```

## 🎯 Características Principales

### Intersection Observer
Se implementó para optimizar el rendimiento:
- Las animaciones solo se ejecutan cuando el elemento es visible
- Reduce el uso de recursos
- Mejora la experiencia del usuario

### Easing Functions Utilizados
- `easeOutExpo` - Desaceleración exponencial (suave)
- `easeOutElastic` - Efecto elástico
- `easeInOutSine` - Sinusoidal bidireccional
- `easeOutQuad` - Desaceleración cuadrática

### Duración de Animaciones
- **Rápidas (300-500ms)**: Hover effects, interacciones
- **Medias (800-1000ms)**: Entradas de elementos
- **Lentas (1500-2000ms)**: Animaciones principales, hero section
- **Continuas**: Pulsos, flotación (con loop: true)

## 🚀 Mejoras de UX

1. **Feedback Visual**: Todas las interacciones tienen respuesta animada
2. **Jerarquía Visual**: Las animaciones guían la atención del usuario
3. **Microinteracciones**: Detalles sutiles que mejoran la experiencia
4. **Performance**: Uso de IntersectionObserver para optimización
5. **Consistencia**: Mismo lenguaje de animación en todo el sitio

## 📱 Responsive

Todas las animaciones son responsive y se adaptan a:
- Desktop
- Tablet
- Mobile

## 🎨 Paleta de Colores Animados

- **Azul Principal**: #007bff
- **Azul Hover**: #0056b3
- **Azul Oscuro**: #003d82
- **Sombras**: rgba(0, 123, 255, 0.3-0.5)

## 💡 Consejos de Uso

1. No abuses de las animaciones
2. Usa delays escalonados para múltiples elementos
3. Mantén la duración entre 300-1000ms para la mayoría de casos
4. Usa easing apropiado según el contexto
5. Prueba en diferentes dispositivos

## 🔧 Personalización

Para modificar las animaciones, puedes ajustar:
- `duration`: Duración en milisegundos
- `delay`: Retraso antes de iniciar
- `easing`: Función de interpolación
- `loop`: true para animaciones continuas
- Valores iniciales y finales en los arrays

## 📈 Performance

- Las animaciones usan transform y opacity (GPU-accelerated)
- IntersectionObserver reduce la carga
- Animaciones se desconectan después de ejecutarse
- Sin re-renders innecesarios

---

**¡Disfruta de las animaciones en RentGamer! 🎮✨**
