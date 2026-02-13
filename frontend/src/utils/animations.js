import anime from 'animejs';

/**
 * Utilidades de animación con Anime.js para RentGamer
 */

// Animación de fade in desde abajo
export const fadeInUp = (target, delay = 0) => {
  return anime({
    targets: target,
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay,
    easing: 'easeOutExpo'
  });
};

// Animación de fade in desde arriba
export const fadeInDown = (target, delay = 0) => {
  return anime({
    targets: target,
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay,
    easing: 'easeOutExpo'
  });
};

// Animación de fade in desde la izquierda
export const fadeInLeft = (target, delay = 0) => {
  return anime({
    targets: target,
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay,
    easing: 'easeOutExpo'
  });
};

// Animación de fade in desde la derecha
export const fadeInRight = (target, delay = 0) => {
  return anime({
    targets: target,
    translateX: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay,
    easing: 'easeOutExpo'
  });
};

// Animación de escala
export const scaleIn = (target, delay = 0) => {
  return anime({
    targets: target,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 800,
    delay,
    easing: 'easeOutElastic(1, .6)'
  });
};

// Animación de rotación
export const rotateIn = (target, delay = 0) => {
  return anime({
    targets: target,
    rotate: [360, 0],
    scale: [0, 1],
    opacity: [0, 1],
    duration: 1200,
    delay,
    easing: 'easeOutElastic(1, .6)'
  });
};

// Animación de pulso continuo
export const pulse = (target, scale = 1.05) => {
  return anime({
    targets: target,
    scale: [1, scale, 1],
    duration: 2000,
    loop: true,
    easing: 'easeInOutSine'
  });
};

// Animación de hover para botones
export const buttonHover = (target) => {
  return anime({
    targets: target,
    scale: 1.1,
    duration: 300,
    easing: 'easeOutQuad'
  });
};

// Animación de hover leave para botones
export const buttonHoverOut = (target) => {
  return anime({
    targets: target,
    scale: 1,
    duration: 300,
    easing: 'easeOutQuad'
  });
};

// Animación de shake (sacudida)
export const shake = (target) => {
  return anime({
    targets: target,
    translateX: [
      { value: -10, duration: 100 },
      { value: 10, duration: 100 },
      { value: -10, duration: 100 },
      { value: 10, duration: 100 },
      { value: 0, duration: 100 }
    ],
    easing: 'easeInOutSine'
  });
};

// Animación de bounce
export const bounce = (target) => {
  return anime({
    targets: target,
    translateY: [
      { value: -20, duration: 300 },
      { value: 0, duration: 300 }
    ],
    easing: 'easeOutBounce'
  });
};

// Animación de fade out
export const fadeOut = (target, onComplete) => {
  return anime({
    targets: target,
    opacity: [1, 0],
    duration: 500,
    easing: 'easeOutExpo',
    complete: onComplete
  });
};

// Animación de stagger (efecto cascada para múltiples elementos)
export const staggerFadeIn = (targets, delayAmount = 100) => {
  return anime({
    targets: targets,
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(delayAmount),
    easing: 'easeOutExpo'
  });
};

// Animación de flotación continua
export const float = (target) => {
  return anime({
    targets: target,
    translateY: [0, -10, 0],
    duration: 3000,
    loop: true,
    easing: 'easeInOutSine'
  });
};

// Animación de carga (spinner)
export const spinnerRotate = (target) => {
  return anime({
    targets: target,
    rotate: 360,
    duration: 1000,
    loop: true,
    easing: 'linear'
  });
};

// Animación de modal
export const modalOpen = (target) => {
  return anime({
    targets: target,
    scale: [0.7, 1],
    opacity: [0, 1],
    duration: 400,
    easing: 'easeOutExpo'
  });
};

// Animación de cierre de modal
export const modalClose = (target, onComplete) => {
  return anime({
    targets: target,
    scale: [1, 0.7],
    opacity: [1, 0],
    duration: 300,
    easing: 'easeInExpo',
    complete: onComplete
  });
};
