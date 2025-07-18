// Floating Hearts Background for Whole Page
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

// Days Counter
const startDate = new Date('2022-10-06');
function updateDaysTogether() {
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysTogether').textContent = diffDays;
}
updateDaysTogether();

// Quotes Fader (Optional Enhancement)

// Secret Message Button Confetti
function specialAction() {
    document.getElementById('secretMessage').style.display = 'block';
    confetti();
}

// Floating Hearts & Flowers inside Third Card
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