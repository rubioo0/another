let score = 0;
let gameOver = false;
let level = 1;
let obstacleSpeed = 1;

const victoryImageUrl = "https://example.com/your-image.jpg";

function setLevel() {
    if (score >= 0 && score < 7) {
        level = 1;
        obstacleSpeed = 1;
    } else if (score >= 7 && score < 14) {
        level = 2;
        obstacleSpeed = 1.5;
    } else if (score >= 14) {
        level = 3;
        obstacleSpeed = 2;
    }

    document.getElementById("level").textContent = "Рівень: " + level;
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
            scoreDisplay.textContent = "Очки: " + score;

            setLevel();

            if (score >= 24) {
                gameOver = true;
                showVictoryImage(); // Показати фото після перемоги
                alert("🎉 Молодчинка! Остаточний рахунок: " + score);
                location.reload();
            }
        }

        checkCollision();
    }, 20);
}
// affed
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
        alert("Нічого страшного! Остаточний рахунок: " + score);
        setTimeout(() => location.reload(), 2000);
    }
}

function showVictoryImage() {
    let img = document.createElement("img");
    img.src = victoryImageUrl;
    img.style.position = "fixed";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.zIndex = "9999"; // Зробити зображення поверх усіх інших елементів

    document.body.appendChild(img);
}

moveObstacle();
