const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birdX = 50;
let birdY = canvas.height / 2;
let gravity = 1.5;
let velocity = 0;
let jump = -15;
let pipes = [];
let score = 0;
let gameSpeed = 2;

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(birdX, birdY, 40, 30);
}

function drawPipe() {
  pipes.forEach(pipe => {
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, 50, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 50, canvas.height - pipe.bottom);
  });
}

function updateBird() {
    velocity += gravity;
    birdY += velocity;
  
    if (birdY >= canvas.height - 30) {
      birdY = canvas.height - 30;
      velocity = 0;
    }
  
    if (birdY <= 0) {
      birdY = 0;
      velocity = 0;
    }
  }

function updatePipes() {
  pipes.forEach(pipe => {
    pipe.x -= gameSpeed;

    if (pipe.x <= birdX + 40 && pipe.x + 50 >= birdX && (birdY <= pipe.top || birdY + 30 >= pipe.bottom)) {
      location.reload(); // Reload the game if collision occurs
    }

    if (pipe.x + 50 === birdX) {
      score++;
    }
  });

  if (pipes.length > 0 && pipes[0].x + 50 < 0) {
    pipes.shift();
  }

  if (pipes.length < 2) {
    let pipeX = canvas.width;
    let topPipeHeight = Math.random() * canvas.height * 0.5 + 20;
    let bottomPipeHeight = canvas.height - topPipeHeight - 100;
    pipes.push({ x: pipeX, top: topPipeHeight, bottom: canvas.height - bottomPipeHeight });
  }
}

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipe();
  updateBird();
  updatePipes();
  drawScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'Spacebar' || event.keyCode === 32) {
      velocity = jump;
    }
  });  
