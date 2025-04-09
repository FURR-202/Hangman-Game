let displayAns = document.getElementsByClassName("UserInput-box")[0].querySelector("h1");//Display user answer

let letters = Array.from(document.getElementsByClassName("letter"));// All letters

let ansfield = [];// No of letters a ans have 


let DisplayScore = document.getElementById("Score").querySelector("h2");//Dispalying score
let DisplayHighscore = document.getElementById("Highscore").querySelector("h2"); // Displaying Highscore

let score = 0;// scores
let highscore = 0;// highscore
if(JSON.parse(localStorage.getItem("highscore"))){
    DisplayHighscore.innerText = `Highscore : ${JSON.parse(localStorage.getItem("highscore"))}`;
}

// Selecting Hangman body parts
let chances = 1;
let bodyParts = document.getElementsByClassName("man-box")[0].querySelectorAll("span");

//winner
let win = document.getElementById("win");

let Ques = {
    broom : "A HouseHold item that used to clean floor",
    naruto : "An Anime character who have yellow hairs",
    berserk : "The Greatest Manga of All time",
    beautiful : "An adjective",
    mango : "Fruits King",
    spinach : "A green Vegetable",
    }
    let keys = Object.keys(Ques);// Correct answer
    let index = 0
    let Question = ""; 
    let word = "";
//Game ON/OFF
let onOff = false;//game off

//play btn
document.querySelector("#play-btn").addEventListener("click",()=>{
    onOff = true;
    start();
})

// Game OFF / Restart
function restart(){
    onOff = false;//game off
    highscore = 0;
    score = 0;
    Question = "";
    word = "";
    index = 0;
    chances = 1;
    localStorage.setItem("highscore",JSON.stringify(score));
    DisplayScore.innerText = `score : ${score}`;
    DisplayHighscore.innerText = `highscore : ${highscore}`;
    displayAns.textContent = "";
    document.querySelector("#question").querySelector("h1").innerText  = Question;
    for(let i = 1;i<bodyParts.length;i++){
        bodyParts[i].style.display = "none";
        chances = 1;
    }
    if(document.querySelector("#lose").style.display === "block"){
        document.querySelector("#lose").style.display = "none";
        document.querySelector(".letter-box").querySelector(".innerBox").style.display = "block";
    }
    if(win.style.display === "block"){
            win.style.display = "none";
            document.querySelector(".letter-box").querySelector(".innerBox").style.display = "block";
    }
}
//GAME ON
function start(){
    onOff = true;
    if(win.style.display === "block"){
    win.style.display = "none";
    document.querySelector(".letter-box").querySelector(".innerBox").style.display = "block";
    }
    if(document.querySelector("#lose").style.display === "block"){
        document.querySelector("#lose").style.display = "none";
        document.querySelector(".letter-box").querySelector(".innerBox").style.display = "block";
        }
    for(let i = 1;i<bodyParts.length;i++){
        bodyParts[i].style.display = "none";
        chances = 1;
    }
    if(index == keys.length){
        index = 0;
    }
    word = keys[index];
    Question = Ques[word];
    index++;
    fills();
}
function fills(){
    ansfield= new Array(word.length).fill("_");
    displayAns.textContent = ansfield.join(" ");
    document.querySelector("#question").querySelector("h1").innerText  = Question;
}

function checkletter(input){
    if(onOff){
        let flag = true
        for(let i = 0;i<word.length;i++){
            if(input.toLowerCase() === word[i] && ansfield[i] === "_"){
                ansfield[i] = input;
                displayAns.textContent = ansfield.join(" ");
                score += 1;
                DisplayScore.innerText = `Score : ${score}`;
                let Ans = ansfield.join("");
                if( Ans.toLowerCase() === word){
                    win.style.display = "block";
                    document.querySelector(".letter-box").querySelector(".innerBox").style.display = "none";
                    highscore = score;
                    if(JSON.parse(localStorage.setItem("highscore") < highscore))
                    localStorage.setItem("highscore",JSON.stringify(score));
                    DisplayHighscore.innerText = `highscore : ${highscore}`;
                    }
                    else{
                        highscore = JSON.parse(localStorage.getItem("highscore"));
                    }
                flag = false;
                break;
            }
            else{
                flag = true;
            }
        }
        if(flag){
            bodyParts[chances].style.display = "inline";
            chances += 1;
            if(chances === 3){
                chances = 4;
            }
        }
        if(chances === 9){
            document.querySelector("#lose").style.display = "block";
            bodyParts[2].style.display = "none";
            bodyParts[3].style.display = "inline";
        }

    }
   
}

letters.forEach(ele =>{
    ele.addEventListener("click",()=>{
        checkletter(ele.getAttribute("id"));
        
    })
})


