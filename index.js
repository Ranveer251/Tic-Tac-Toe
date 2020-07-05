let pattern = ["", "", "","", "", "","", "", ""];
const winingPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let visited = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gameRunning = true;
let currentPlayer = "X";
const displayText = document.querySelector(".turn");
let xScore = 0;
let oScore = 0;
let tie = 0;

function handleClick(event){
      let index = event.target.id;
      index--;
      if(visited[index]===0 && gameRunning){
        visited[index]=1;
        let ans= -1;
        event.target.innerHTML = currentPlayer;
        if(currentPlayer==="O"){event.target.style.color = "#b336b3";}
        if(pattern[index]===""){
          pattern[index]=currentPlayer;
          ans = checkWin();
          if(currentPlayer==="X"){
            currentPlayer="O";
          } else{
            currentPlayer="X";
          }
        }
        if(ans===0){
          let flag = checkEnd();
          if(flag===0){
            displayText.innerHTML = "It's a Tie";
            tie++;
            document.getElementById("tie").innerHTML = tie;
            gameRunning=false;
          } else{
             displayText.innerHTML = "Player " + currentPlayer + "'s turn";
          }
        }
      }
}

function checkWin(){
  for(let i=0;i<winingPatterns.length;i++){
    const first = winingPatterns[i][0];
    const second = winingPatterns[i][1];
    const third = winingPatterns[i][2];
    if(pattern[first]==="" || pattern[second]==="" || pattern[third]==="")
      continue;
    else if(pattern[first]===pattern[second] && pattern[first]===pattern[third]){
      displayText.innerHTML = "Player " + currentPlayer + " wins";
      if(currentPlayer==="X"){xScore++;document.getElementById(currentPlayer).innerHTML = xScore;}
      if(currentPlayer==="O"){oScore++;document.getElementById(currentPlayer).innerHTML = oScore;}
      gameRunning=false;
      let id = strikeThrough(i);
      $(id).removeClass("invisible");
      return 1;
    }
  }
  return 0;
}

function checkEnd(){
  let flag=0;
  for(let i=0;i<9;i++){
    if(pattern[i]==="")
      flag=1;
  }
  return flag;
}

function restart(){
    pattern = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".box").forEach( box => {box.innerHTML = "";box.style.color="black";box.style.opacity=1;});
    if(currentPlayer==="X"){
      currentPlayer="O";
    } else{
      currentPlayer="X";
    }
    visited = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameRunning=true;
    displayText.innerHTML = "Player " + currentPlayer + " will start the game";
    $(".strike").addClass("invisible");
}

function reset(){
  document.getElementById("X").innerHTML = 0;xScore=0;
  document.getElementById("O").innerHTML = 0;oScore=0;
  document.getElementById("tie").innerHTML = 0;tie=0;
  restart();
}

function strikeThrough(index){
  let id="";
  switch (index) {
    case 0:
      id=".row1";
      break;
    case 1:
      id=".row2";
      break;
    case 2:
      id=".row3";
      break;
    case 3:
      id=".col1";
      break;
    case 4:
      id=".col2";
      break;
    case 5:
      id=".col3";
      break;
    case 6:
      id=".dgn1";
      break;
    case 7:
      id=".dgn2";
      break;
    default:
      id="";
  }
  return id;
}

document.querySelectorAll(".box").forEach( box => box.addEventListener('click', handleClick));
document.querySelector(".restart").addEventListener("click", restart);
document.querySelector(".reset").addEventListener("click", reset);
