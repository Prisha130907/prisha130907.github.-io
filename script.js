// Floating Hearts Background
const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let hearts = [];

function createHeart() {
    hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
        alpha: Math.random() * 0.5 + 0.3
    });
}

function drawHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        ctx.fillStyle = `rgba(255, 105, 180, ${heart.alpha})`;
        ctx.beginPath();
        ctx.moveTo(heart.x, heart.y);
        ctx.bezierCurveTo(heart.x - heart.size, heart.y - heart.size,
            heart.x - heart.size * 1.5, heart.y + heart.size / 3,
            heart.x, heart.y + heart.size);
        ctx.bezierCurveTo(heart.x + heart.size * 1.5, heart.y + heart.size / 3,
            heart.x + heart.size, heart.y - heart.size,
            heart.x, heart.y);
        ctx.fill();
        heart.y -= heart.speed;
        if (heart.y < -20) {
            hearts.splice(index, 1);
        }
    });
    requestAnimationFrame(drawHearts);
}

setInterval(createHeart, 250);
drawHearts();

// Music Toggle
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const button = document.getElementById('musicButton');
    if (music.paused) {
        music.play();
        button.textContent = '⏸️ Pause Music';
    } else {
        music.pause();
        button.textContent = '🎵 Play Music';
    }
}

// Days Together Counter
const startDate = new Date('2022-10-06');
function updateDaysTogether() {
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    document.getElementById('daysTogether').textContent = diffDays;
}
updateDaysTogether();

// Quotes Scroller
const quotes = [
    "Love is just a word until someone gives it meaning...",
    "Every moment without you feels incomplete.",
    "One day closer to holding you for real.",
    "In a world of temporary things, you are my forever.",
    "Distance is just a test of how far love can travel.",
    "Soon, my waiting will end, and my forever will begin with you."
];

let quoteIndex = 0;
const quoteDisplay = document.getElementById('quoteDisplay');

function showNextQuote() {
    quoteDisplay.classList.remove('show');
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteDisplay.textContent = quotes[quoteIndex];
        quoteDisplay.classList.add('show');
    }, 800);
}

setInterval(showNextQuote, 7000);
quoteDisplay.classList.add('show');

// Secret Message + Confetti
function specialAction() {
    document.getElementById('secretMessage').style.display = 'block';
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Floating Hearts & Flowers Inside Third Card
const innerCanvas = document.querySelector('.innerCanvas');
const innerCtx = innerCanvas.getContext('2d');

function resizeInnerCanvas() {
    innerCanvas.width = innerCanvas.clientWidth;
    innerCanvas.height = innerCanvas.clientHeight;
}
resizeInnerCanvas();
window.addEventListener('resize', resizeInnerCanvas);

let floatingElements = [];

function createFloatingElement() {
    const types = ['heart', 'flower'];
    floatingElements.push({
        x: Math.random() * innerCanvas.width,
        y: innerCanvas.height + 20,
        size: Math.random() * 10 + 10,
        speed: Math.random() * 0.5 + 0.2,
        type: types[Math.floor(Math.random() * types.length)],
        alpha: Math.random() * 0.5 + 0.3
    });
}

function drawFloatingElements() {
    innerCtx.clearRect(0, 0, innerCanvas.width, innerCanvas.height);

    floatingElements.forEach((element, index) => {
        innerCtx.fillStyle = element.type === 'heart'
            ? `rgba(255, 105, 180, ${element.alpha})`
            : `rgba(255, 182, 193, ${element.alpha})`;

        innerCtx.beginPath();
        if (element.type === 'heart') {
            innerCtx.moveTo(element.x, element.y);
            innerCtx.bezierCurveTo(element.x - element.size, element.y - element.size,
                element.x - element.size * 1.5, element.y + element.size / 3,
                element.x, element.y + element.size);
            innerCtx.bezierCurveTo(element.x + element.size * 1.5, element.y + element.size / 3,
                element.x + element.size, element.y - element.size,
                element.x, element.y);
        } else {
            innerCtx.arc(element.x, element.y, element.size / 2, 0, 2 * Math.PI);
        }
        innerCtx.fill();

        element.y -= element.speed;
        if (element.y < -20) {
            floatingElements.splice(index, 1);
        }
    });

    requestAnimationFrame(drawFloatingElements);
}

setInterval(createFloatingElement, 400);
drawFloatingElements();

// Flip-style Countdown in Heart Digits
const targetDate = new Date("August 3, 2025 00:00:00").getTime();

function updateHeartCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

    updateDigit("days", days);
    updateDigit("hours", hours);
    updateDigit("minutes", minutes);
    updateDigit("seconds", seconds);

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "It's the day we meet! ❤️";
    }
}

function updateDigit(id, newValue) {
    const digitElement = document.getElementById(id);

    if (digitElement.textContent !== String(newValue).padStart(2, '0')) {
        digitElement.classList.add('flip');
        setTimeout(() => {
            digitElement.textContent = String(newValue).padStart(2, '0');
            digitElement.classList.remove('flip');
        }, 250);
    }
}

setInterval(updateHeartCountdown, 1000);
updateHeartCountdown();
