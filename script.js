const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".new-game");

let currentplayer;
let gameGrid;

let winningPositions=
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialize the game 

function initGame()
{
    currentplayer = "X";
    // newGameBtn.classList.remove("active");
    // grid ke elements ko empty kr diya 
    gameGrid=["","","","","","","","",""];

    // newGameBtn.classList.remove("active");
    // ui pe bhi empty kr diya 

    // boxes[index].style.pointerEvents = "none";    

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;

    });

    gameInfo.innerText=`Currret Player - ${currentplayer}`;
    newGameBtn.classList.remove("active");
}

initGame();


function swapTurn(position)
{
    if(gameGrid[position] === "X")
    {
        currentplayer="0";
        // gameGrid[position]=currentplayer;
    }
    else
    {
        currentplayer="X";
        // gameGrid[position]=currentplayer;
    }
    gameInfo.innerText=`Curret Player - ${currentplayer}`;
}

function checkGameOver()
{
    let answer = "";
    
    winningPositions.forEach((position) => {

        // ye condition satisfies ki tbhi winner milega 

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            // X ya 0 me se ek koi winnner hoga 

            if(gameGrid[position[0]] === "X")
            {
                answer="X";
            }
            else{
                answer="0";
            }

            // disable pointer events 
            boxes.forEach( (box) =>
             { box.style.pointerEvents="none"; })

            // winner position ko green kr diya
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        // we have a winner 

        if(answer !== "")
        {
            gameInfo.innerText=`Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
        }

        // if no winner then 

        let fillCount=0;

        gameGrid.forEach( (box) => {
            if( box !== "")
            {
                fillCount++;
            }
        })

        // game tied 

        if(fillCount == 9)
        {
            gameInfo.innerText=`Game Tied !`;
            newGameBtn.classList.add("active");
        }
    });
}

function handleClick(index)
{
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentplayer;
        gameGrid[index] = currentplayer;
        console.log(gameGrid[index]); 
        boxes[index].style.pointerEvents = "none";
        // gameInfo.innerText=`Curret Player - ${currentplayer}`;

    // to swap the turns of players 

    swapTurn(index);

    // check if X/0 wins 

    checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click" , initGame)