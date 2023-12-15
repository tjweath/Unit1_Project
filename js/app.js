function init() {
    // ! Variables & Elemnets
  
    // ? Elements
    //CREATE GRID
    const grid = document.querySelector(".grid");
    //console.log(grid)
  
    // ? Variables
    //Board CONFIG
    const width = 10;
    const height = 10;
    const cellCount = width * height;
    let cells = [];
  
    //CHARACTER CONFIG
    const startingPosition = 2;
    let currentPosition = startingPosition;
    let snakeCells = [2, 1, 0];
    let gameOver = false;
    let intervalId = null;
    let direction = 1;
    let gameStarted = false;
    let intervalTime = 500;
    let score = 0;
  
  
    //! Functions
    function moveSnake() {
        if (direction === 1 && currentPosition % width !== width - 1) {
            currentPosition++;
        } else if (direction === -1 && currentPosition % width !== 0) {
            currentPosition--;
        } else if (direction === -width && currentPosition >= width) {
            currentPosition -= width;
        } else if (direction === width && currentPosition + width <= cellCount - 1) {
            currentPosition += width;
        } else {
            gameOver = true;
            clearInterval(intervalId);
            var crashAudio = document.getElementById("crashSound");
            crashAudio.play(); 
            alert('No more pies for you!!');
            window.location.reload();
            return;
        }
        handleFoodConsumption(direction);
        updatePosition(currentPosition);
        checkCollision(direction);
    }
    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            intervalId = setInterval(moveSnake, intervalTime);
        }
    }

    function createGrid() {
      //use cellCount to create grid cells
      for (let i = 0; i < cellCount; i++) {
        //Create div cell
        const cell = document.createElement("div");
        //Add index as an attribute
        cell.dataset.index = i;
        // Add height and width to each grid cell (div)
        cell.style.height = `${100 / height}`;
        cell.style.width = `${100 / width}`;
        // Add cell to grid
        grid.appendChild(cell);
        // Add newly created div cell to cell array
        cells.push(cell);
      }
      // Add snake to starting position
      addSnake();
      addFood();
    }
  
    // ? Add snake class to board - start
    function addSnake() {
      snakeCells.forEach((snake) => {
        cells[snake].classList.add("snake");
      });
    }
  
    function addFood() {
        let generateFoodPosition = Math.floor(Math.random() * cells.length);
        // Checks if generated position is already occupied by snake
        while (snakeCells.includes(generateFoodPosition)) {
            generateFoodPosition = Math.floor(Math.random() * cells.length);
        }
        cells[generateFoodPosition].classList.add("food");
    }
  
    function updatePosition(currentPosition) {
      snakeCells.forEach((snake) => {
        cells[snake].classList.remove("snake");
      });
      snakeCells.unshift(currentPosition);
      snakeCells.pop();
      snakeCells.forEach((snake) => {
        cells[snake].classList.add("snake");
      });
    }
    function removeFood() {
      cells[currentPosition].classList.remove("food");
    }
  
    function handleFoodConsumption(direction) {
        if (cells[currentPosition].classList.contains("food")) {
            removeFood();
            snakeCells.push(currentPosition);
            addFood();
            score += 1; 
            updateScore();

            var eatAudio = document.getElementById("eatSound");
            eatAudio.play(); 

            // Increase the speed more after eating food
            if (intervalTime > 100) { // Adjust the threshold based on your preference
                intervalTime -= 20; // Decrease by a larger value
                clearInterval(intervalId);
                intervalId = setInterval(moveSnake, intervalTime);
            }
        }
    }

    function updateScore() {
        const scoreElement = document.querySelector(".score");
        scoreElement.textContent = `MINCE PIES: ${score}`;
    }
      
    
    // Check for collision with wall 
    function checkCollision(direction) {
        if (gameOver || snakeCells.length !== new Set(snakeCells).size) {

            var crashAudio = document.getElementById("crashSound");
            crashAudio.play(); 
            
            alert ('No more pies for you!!')
            window.location.reload()
        
        }
    }
    // ? Handle movement
    function handleMovement(event) {
        const key = event.keyCode;
        const up = 38;
        const down = 40;
        const left = 37;
        const right = 39;
    
        if (!gameStarted && (key === up || key === down || key === left || key === right)) {
          startGame();
        }
        if (key === up && currentPosition >= width && direction !== width) {
          direction = -width;
        } else if (key === down && currentPosition + width <= cellCount - 1 && direction !== -width) {
          direction = width;
        } else if (key === left && currentPosition % width !== 0 && direction !== 1) {
          direction = -1;
        } else if (key === right && currentPosition % width !== width - 1 && direction !== -1) {
          direction = 1;
        } else {
          console.log("INVALID KEY");
          gameOver = true;
        }
      }


    //! Events
    document.addEventListener("keydown", handleMovement);
  
    //! Page Load
    createGrid();
  }

const snowfall = document.getElementById('snowfall');

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.innerHTML = '❄'; // You can use other snowflake characters or images

  const size = Math.random() * 20 + 10;
  snowflake.style.fontSize = `${size}px`;

  const startLeft = Math.random() * window.innerWidth;
  snowflake.style.left = `${startLeft}px`;

  const startTop = -50; // Start the snowflakes just above the viewport
  snowflake.style.top = `${startTop}px`;

  snowfall.appendChild(snowflake);

  const endTop = window.innerHeight + 50; // End the snowflakes slightly below the viewport

  const duration = Math.random() * 5 + 3; // Adjust the falling speed
  snowflake.style.animation = `fall ${duration}s linear infinite, fall-top ${duration}s linear ${startTop}px ${endTop}px forwards`;

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}

setInterval(createSnowflake, 500); // Adjust the interval to control snowflake generation rate


  window.addEventListener("DOMContentLoaded", init);