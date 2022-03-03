/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

// Setting Levels
const lvls = {
  "Easy": 5,
  "Normal": 3,
  "Hard": 2
};

// Defalt Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let select = document.querySelector("#lvl");
let selected = document.createAttribute("selected");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Save Score To Local Storage With Date
if (localStorage.getItem("score"))
{
  scoreGot.innerHTML = localStorage.getItem("score");
}
if (localStorage.getItem("lvl"))
{
  lvlNameSpan.innerHTML = localStorage.getItem("lvl");
}
if (localStorage.getItem("sec")){
  timeLeftSpan.innerHTML = localStorage.getItem("sec");
  secondsSpan.innerHTML = localStorage.getItem("sec");
}else{
  timeLeftSpan.innerHTML = defaultLevelSeconds;
}

// Add Lvls To Select
const propertyNames = Object.keys(lvls);
for (let item of propertyNames)
{
  let selectOption = new Option(item, item);
  select.appendChild(selectOption);
}
select.addEventListener("click", function ()
{
  lvlNameSpan.innerHTML = select.value;
  secondsSpan.innerHTML = lvls[select.value];
  localStorage.setItem("lvl", select.value);
  localStorage.setItem("sec", lvls[select.value]);
  timeLeftSpan.innerHTML = lvls[select.value];
})

// Disable Past Event
input.addEventListener("paste", function (e)
{
  e.preventDefault();
});

// Start Game
startButton.addEventListener("click", function ()
{
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
});

function genWords()
{
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove Word From Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let item of words)
  {
    // Create Div Element
    let div = document.createElement("div");
    div.innerHTML = item;
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
};
function startPlay()
{
  // Save Score To Local Storage With Date
  if (words.length === scoreTotal.innerHTML - 1)
  {
    localStorage.setItem("score", "0");
    scoreGot.innerHTML = "0";
  } else
  {
    localStorage.setItem("score", scoreGot.innerHTML);
    scoreGot.innerHTML = localStorage.getItem("score");
  }

  if (localStorage.getItem("sec")){
    timeLeftSpan.innerHTML = localStorage.getItem("sec");
  }else{
    timeLeftSpan.innerHTML = defaultLevelSeconds;
  }

  let start = setInterval(() =>
  {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0")
    {
      //Stop Timer
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase())
      {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0)
        {
          // Call Generate Word Function
          genWords();
        } else
        {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulation, You Won");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
          let ref = document.createElement("button");
          ref.innerHTML = "Reload";
          span.appendChild(ref);
          ref.addEventListener("click", function ()
          {
            location.reload();
          });
        }
      } else
      {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
        let ref = document.createElement("button");
        ref.innerHTML = "Reload";
        span.appendChild(ref);
        ref.addEventListener("click", function ()
        {
          location.reload();
        });
      }
    }
  }, 1000);
}

