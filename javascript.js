document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const startButton = document.querySelector(".start");
  const resetButton = document.querySelector(".reset");
  const questionContainer = document.querySelector(".text_size");
  const choicesContainer = document.querySelector(".btn");
  const marksDisplay = document.querySelector(".marks");
  const timerDisplay = document.querySelector(".timer");
  const maindisplay = document.querySelector(".text_size");
  let displaynumber = document.createElement("h1");
  var markspan = document.createElement("span");
  var num3;
  let peep = document.querySelector("#peep"); // Define peep element
  let correct = document.querySelector("#correct"); // Define correct element
  peep.style.visibility = "hidden";
  const operator = ["+", "-"];
  let currentQuestionIndex = 0;
  var marks = 0;
  let timer;
  var isQuizStarted = false;
  let popup = false;
  // Event listener for Start Quiz button
  startButton.addEventListener("click", startQuiz);
  correct.style.visibility = "hidden";

  function startQuiz() {
    if (isQuizStarted) {
      isQuizStarted = !isQuizStarted;
      // If quiz is already started, reset the button text and clear the timer
      startButton.innerHTML = "Start";
      clearInterval(timer);
      timerDisplay.innerHTML = "Timer: 0s";
      displaynumber.textContent = "";
      marks = 0;
      marksDisplay.innerHTML = "Marks: 0";
      peep.style.visibility = "hidden";
      correct.style.visibility = "hidden";
      // Clear the text content of the buttons
      const buttons = document.querySelectorAll(".b");
      buttons.forEach((btn) => {
        btn.textContent = "";
      });
    } else {
      isQuizStarted = !isQuizStarted;
      // If quiz is not started, update the button text, start the timer, and display numbers in the buttons
      startButton.innerHTML = "Reset";
      display();

      displaybtn();
      markspan.textContent = 0;
      startTimer();
    }

    // Toggle the quiz state
  }

  function createButtons() {
    for (let i = 1; i <= 4; i++) {
      const button = document.createElement("button");
      button.id = "button" + i;
      button.textContent = "";
      button.classList.add("btnn");
      button.classList.add("b");

      choicesContainer.appendChild(button);
    }
  }
  // Call the function to generate buttons
  createButtons();

  const display = () => {
    let num1 = Math.floor(Math.random() * 100 + 1);
    let num2 = Math.floor(Math.random() * 100 + 1);
    let sign = operator[Math.floor(Math.random() * 2)];
    num3 = sign == "+" ? num1 + num2 : num1 - num2;
    displaynumber.textContent = `${num1} ${sign} ${num2}`;
    let display = document.querySelector(".display");
    display.innerHTML = ""; // Clear previous content
    display.append(displaynumber);
  };

  function displaybtn() {
    if (isQuizStarted) {
      const buttons = document.querySelectorAll(".b");

      // Create an array with random numbers and the correct answer
      let array = [
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        Math.floor(Math.random() * 100 + 1),
        num3,
      ];

      // Filter out duplicates and ensure all numbers are unique
      array = Array.from(new Set(array));

      // If the array length is less than 4, add more random numbers
      while (array.length < 4) {
        const randomNumber = Math.floor(Math.random() * 100 + 1);
        if (!array.includes(randomNumber)) {
          array.push(randomNumber);
        }
      }

      // Shuffle the array
      array = shuffleArray(array);

      // Pick a random index to replace with the correct answer
      const correctIndex = Math.floor(Math.random() * buttons.length);
      array[correctIndex] = num3;

      var stringNumber;
      addEventListener("click", () => {
        stringNumber = num3.toString();
      });
      buttons.forEach((btn, index) => {
        btn.textContent = array[index];
        btn.addEventListener("click", () => {
          // Update the display with a new question
          {
            correct.style.visibility = "visible";
            display();

            if (btn.textContent === stringNumber) {
              console.log(marks);
              marks++;
              markspan.textContent = marks;
              marksDisplay.textContent = "Marks: " + marks;
              correct.innerHTML = "Correct";
              correct.style.backgroundColor = "green";
            }
            if (btn.textContent !== stringNumber) {
              correct.innerHTML = "Incorrect";
              correct.style.backgroundColor = "red";
            }

            // Reshuffle the array for the next set of buttons
            array = shuffleArray(array);

            // Pick a new random index to replace with the correct answer
            const newCorrectIndex = Math.floor(Math.random() * buttons.length);
            array[newCorrectIndex] = num3;

            buttons.forEach((btn, index) => {
              btn.textContent = array[index];
            });
          }
        });
      });
      marksDisplay.appendChild(markspan);
    }
  }

  // Function to shuffle an array using the Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startTimer() {
    let seconds = 60;
    timer = setInterval(function () {
      timerDisplay.textContent = "Timer: " + seconds + "s";

      if (seconds === 0) {
        clearInterval(timer);
        endQuiz(); // Call your function when the timer reaches 0
      } else {
        seconds--;
      }
    }, 1000);
  }

  function endQuiz() {
    popup = true;
    peep.style.visibility = "visible";
    popups.innerHTML = marks;
    let display = document.querySelector(".display");
    display.innerHTML = "";
    marksDisplay.innerHTML = "Marks:";
    correct.style.visibility = "hidden";
  }
});
