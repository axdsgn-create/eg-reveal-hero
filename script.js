const hero = document.querySelector("#hero");
const coarsePointer = window.matchMedia("(pointer: coarse)");

let targetX = window.innerWidth * 0.64;
let targetY = window.innerHeight * 0.56;
let currentX = targetX;
let currentY = targetY;
let frame = 0;

function updatePointer(event) {
  targetX = event.clientX;
  targetY = event.clientY;
  hero.classList.add("is-active");
}

function render() {
  const easing = coarsePointer.matches ? 0.24 : 0.12;
  currentX += (targetX - currentX) * easing;
  currentY += (targetY - currentY) * easing;

  hero.style.setProperty("--mask-x", `${currentX}px`);
  hero.style.setProperty("--mask-y", `${currentY}px`);
  frame = requestAnimationFrame(render);
}

hero.addEventListener("pointermove", updatePointer, { passive: true });
hero.addEventListener("pointerdown", updatePointer, { passive: true });
hero.addEventListener("pointerleave", () => hero.classList.remove("is-active"));

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(frame);
  } else {
    frame = requestAnimationFrame(render);
  }
});

frame = requestAnimationFrame(render);
