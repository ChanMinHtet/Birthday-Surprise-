// ====== CONFIGURATION ======
const targetDate = new Date("2025-11-10T00:00:00");
const bgMusic = document.getElementById("bg-music");

// Elements
const countdown = document.getElementById("countdown");
const message = document.getElementById("birthday-message");
const canvas = document.getElementById("fireworks-canvas");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const gallery = document.getElementById("gallery-section");

// ====== COUNTDOWN ======
function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    triggerBirthdaySurprise();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ====== ZERO-HOUR EVENT ======
function triggerBirthdaySurprise() {
  countdown.style.display = "none";
  message.classList.remove("hidden");
  canvas.classList.remove("hidden");

  bgMusic.volume = 0.5;
  bgMusic.play();

  startFireworks();

  gallery.classList.remove("hidden");
  setTimeout(() => {
    gallery.classList.add("show");
  }, 500);

}

// ====== FIREWORKS ANIMATION ======
function startFireworks() {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fireworks = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    const x = random(0, canvas.width);
    const y = random(canvas.height / 2, canvas.height);
    const colors = ["#ffb6c1", "#ffc1cc", "#fff0f5", "#ffd6e0", "#ffcad4"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const sparks = [];
    for (let i = 0; i < 50; i++) {
      sparks.push({
        x, y,
        dx: random(-3, 3),
        dy: random(-3, 3),
        alpha: 1,
        color
      });
    }
    fireworks.push(sparks);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((sparks, i) => {
      sparks.forEach(s => {
        s.x += s.dx;
        s.y += s.dy;
        s.alpha -= 0.02;
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      if (sparks.every(s => s.alpha <= 0)) fireworks.splice(i, 1);
    });
    if (Math.random() < 0.05) createFirework();
    requestAnimationFrame(animate);
  }
  animate();

  setTimeout(() => { canvas.classList.add("hidden"); }, 10000);
}

// ====== IMAGE CAROUSEL (CLICK ONLY) ======
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});


showSlide(currentIndex);

