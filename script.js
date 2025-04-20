function greetUser() {
    const name = document.getElementById('nameInput').value.trim();
    const greetingEl = document.getElementById('greetingMessage');
  
    if (name) {
        greetingEl.innerHTML = `Hey ${name}, I'm thrilled to have the honor of hosting you on this page. Before you head off to explore other pages, I’d love for you to take a moment to check mine out too! o(*￣▽￣*)ブ<span class="close-btn" onclick="closeGreeting()">close</span>`;
    } else {
        greetingEl.innerHTML = `Please enter your name!<span class="close-btn" onclick="closeGreeting()">close</span>`;
    }
}

function closeGreeting() {
    document.getElementById('greetingMessage').textContent = '';
}

// Emoji messages
const emojiComments = {
    happy: "Of course you liked it, I’m glad too, mate (●ˇ∀ˇ●)",
    angry: "Oh, calm down, what are you angry about? OwO",
    crying: "Wowwww, my, did you really get that emotional? ::>_<::",
    laughing: "What are you laughing at, man? (⊙_⊙;)",
    poker: "Hey, I don’t like this reaction of you! Choose another one ┗|｀O′|┛",
    evil: "Keep your devilish thoughts to yourself; I’m a good boy (✿◠‿◠)"
  };
  
  let currentEmoji = null; // Track the current emoji
  
  function toggleComment(emoji) {
    const commentsContainer = document.getElementById('emojiComments');
  
    if (currentEmoji === emoji) {
      // If the same emoji is clicked again, hide the message
      commentsContainer.innerHTML = '';
      currentEmoji = null;
    } else {
      // Show the new message and update the tracker
      commentsContainer.innerHTML = `<p>${emojiComments[emoji]}</p>`;
      currentEmoji = emoji;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Accordion behavior
    document.querySelectorAll('.accordion-btn').forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isOpen = content.style.display === 'block';
        document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
        content.style.display = isOpen ? 'none' : 'block';
      });
    });
  
    // Random dark color generator
    const darkColors = [
      '#2c3e50', '#34495e', '#16a085', '#27ae60', '#2980b9',
      '#8e44ad', '#2d3436', '#d35400', '#c0392b', '#7f8c8d'
    ];
  
    document.querySelectorAll('.colorize').forEach(container => {
      container.innerHTML = container.innerText.split(' ').map(word => {
        const color = darkColors[Math.floor(Math.random() * darkColors.length)];
        return `<span style="color: ${color};">${word}</span>`;
      }).join(' ');
    });
  });

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 5 * box, y: 5 * box }];
let direction = "RIGHT";
let food = randomFood();
let score = 0;

const scoreEl = document.getElementById("score");
const submitBtn = document.getElementById("submitBtn");

function randomFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

function setDirection(dir) {
  if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  else if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
  else if (dir === "UP" && direction !== "DOWN") direction = "UP";
  else if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#2e7d32" : "#66bb6a";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "#f44336";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Wrap around edges
  if (head.x < 0) head.x = canvas.width - box;
  if (head.x >= canvas.width) head.x = 0;
  if (head.y < 0) head.y = canvas.height - box;
  if (head.y >= canvas.height) head.y = 0;

  // Game over on self collision
  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    clearInterval(game);
    alert("Game Over! Try again.");
    resetGame();
    return;
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  if (score >= 7) { // at least you should get 7 score
    submitBtn.disabled = false;
    submitBtn.classList.add("enabled");
  }
}

function resetGame() {
  snake = [{ x: 5 * box, y: 5 * box }];
  direction = "RIGHT";
  score = 0;
  scoreEl.textContent = 0;
  food = randomFood();
  game = setInterval(draw, 150); // smoother speed
}

let game = setInterval(draw, 150);
