// ==== Fondo estrellas + fugaces ====
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// estrellas normales
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    opacity: Math.random()
  });
}

// crear fugaz con ángulo aleatorio
function createShootingStar() {
  const angle = Math.random() * Math.PI / 3 + Math.PI / 6; // entre 30° y 60°
  const speed = Math.random() * 10 + 6;
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height / 2),
    length: Math.random() * 80 + 50,
    speedX: Math.cos(angle) * speed,
    speedY: Math.sin(angle) * speed,
    opacity: 1
  });
}

setInterval(createShootingStar, 5000);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // estrellas titilando
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255," + star.opacity + ")";
    ctx.fill();
    star.opacity += (Math.random() - 0.5) * 0.05;
    if (star.opacity < 0) star.opacity = 0;
    if (star.opacity > 1) star.opacity = 1;
  });

  // fugaces
  for (let i = 0; i < shootingStars.length; i++) {
    let s = shootingStars[i];

    // estela difuminada
    let grad = ctx.createLinearGradient(
      s.x, s.y,
      s.x - s.length * s.speedX / 10,
      s.y - s.length * s.speedY / 10
    );
    grad.addColorStop(0, "rgba(255,255,255," + s.opacity + ")");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length * s.speedX / 10, s.y - s.length * s.speedY / 10);
    ctx.stroke();

    // punto brillante
    ctx.beginPath();
    ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255," + s.opacity + ")";
    ctx.fill();

    // movimiento
    s.x += s.speedX;
    s.y += s.speedY;
    s.opacity -= 0.015;

    if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
      shootingStars.splice(i, 1);
    }
  }

  requestAnimationFrame(animateStars);
}
animateStars();

// ==== Diapositivas automáticas ====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

// Pasar automáticamente cada 5 segundos
function autoSlides() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
    setTimeout(autoSlides, 5000); // cambia cada 5s
  }
}

// Iniciar presentación
showSlide(currentSlide);
setTimeout(autoSlides, 5000);

// Botón final
function cambiarBoton() {
  const btn = document.getElementById("finalBtn");
  btn.innerText = "📱 Revisa tu WhatsApp 💌";
  alert("Ya te mandé algo especial 💖 Revisa tu WhatsApp 📲");
}
