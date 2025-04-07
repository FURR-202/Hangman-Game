let userInputBox = document.getElementsByClassName("UserInput-box")[0];//Display box
let letters = document.getElementsByClassName("letter");// All letters
let letters_arr = Array.from(letters);// converted into array
let userAns = userInputBox.querySelector("h1");
let userAns_arr = [];
let score = 0;// scores
let highscore = 0;// highscore
let TotalClick = 0;
let CorrectClick = 0;
let WrongClick = 0;
let chances = 7;

let word ="";
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

function start(){
    word = keys[index];
    Question = Ques[word];
    index++;
    fills();
}

function fills(){
    userAns_arr = new Array(word.length).fill("_");
    userAns.textContent = userAns_arr.join(" ");
}
function checkletter(input){
    for(let i = 0;i<word.length;i++){
        if(input.toLowerCase() === word[i] && userAns_arr[i] === "_"){
            userAns_arr[i] = input;
            userAns.textContent = userAns_arr.join(" ");
            console.log(userAns_arr);
            break;
        }
        else{
            chances--;
        }
    }
}
letters_arr.forEach(ele =>{
    ele.addEventListener("click",()=>{
        checkletter(ele.getAttribute("id"));
        
    })
})


