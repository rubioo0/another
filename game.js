let score = 0;
let gameOver = false;
let level = 1;
let obstacleSpeed = 2;

// Виведення повідомлення про перемогу
function showVictoryMessage() {
    let victoryMessage = document.createElement("div");
    victoryMessage.style.position = "absolute";
    victoryMessage.style.top = "50%";
    victoryMessage.style.left = "50%";
    victoryMessage.style.transform = "translate(-50%, -50%)";
    victoryMessage.style.fontSize = "40px";
    victoryMessage.style.color = "white";
    victoryMessage.style.fontWeight = "bold";
    victoryMessage.innerText = "🎉 You Win! Final Score: " + score;

    // Додаємо повідомлення на сторінку
    document.body.appendChild(victoryMessage);
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

function jump() {
    if (gameOver) return;

    let player = document.getElementById("player");
    if (!player.classList.contains("jumping")) {
        player.classList.add("jumping");
        let bottom = 40;
        let upInterval = setInterval(() => {
            if (bottom >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (bottom <= 40) {
                        clearInterval(downInterval);
                        player.classList.remove("jumping");
                    }
                    bottom -= 5;
                    player.style.bottom = bottom + "px";
                }, 20);
            }
            bottom += 5;
            player.style.bottom = bottom + "px";
        }, 20);
    }
}

function moveObstacle() {
    let obstacle = document.querySelector(".obstacle");
    let scoreDisplay = document.getElementById("score");
    let position = 100;

    let obstacleInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        position -= obstacleSpeed;
        obstacle.style.left = position + "%";

        if (position < -10) {
            position = 100;
            score++;
            scoreDisplay.textContent = "Score: " + score;

            if (score >= 1) {
                gameOver = true;
                showVictoryMessage(); // Показати повідомлення після перемоги
                alert("🎉 You Win! Final Score: " + score);
                location.reload();
            }
        }

        checkCollision();
    }, 20);
}

function checkCollision() {
    let player = document.getElementById("player");
    let obstacle = document.querySelector(".obstacle");

    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
    ) {
        gameOver = true;
        alert("Game Over! Final Score: " + score);
        location.reload();
    }
}

moveObstacle();
