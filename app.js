document.addEventListener('DOMContentLoaded', () => {
    createGameBoard()
});

const cardArray = [{
    name: "condemn",
    image: "images/condemn.png"
},{
    name: "condemn",
    image: "images/condemn.png"
},{
    name: "flurry",
    image: "images/flurry.png"
},{
    name: "flurry",
    image: "images/flurry.png"
},{
    name: "kindling",
    image: "images/kindling.png"
},{
    name: "kindling",
    image: "images/kindling.png"
},{
    name: "pride",
    image: "images/pride.png"
},{
    name: "pride",
    image: "images/pride.png"
},{
    name: "sunwell",
    image: "images/sunwell.png"
},{
    name: "sunwell",
    image: "images/sunwell.png"
},{
    name: "tavish",
    image: "images/tavish.png"
},{
    name: "tavish",
    image: "images/tavish.png"
},{
    name: "blaclrock",
    image: "images/blackrock.png"
},{
    name: "blaclrock",
    image: "images/blackrock.png"
},{
    name: "burn",
    image: "images/burn.png"
},{
    name: "burn",
    image: "images/burn.png"
},{
    name: "castor",
    image: "images/castor.png"
},{
    name: "castor",
    image: "images/castor.png"
},{
    name: "demon",
    image: "images/demon.png"
},{
    name: "demon",
    image: "images/demon.png"
},{
    name: "pollux",
    image: "images/pollux.png"
},{
    name: "pollux",
    image: "images/pollux.png"
},{
    name: "scorpius",
    image: "images/scorpius.png"
},{
    name: "scorpius",
    image: "images/scorpius.png"
}
];



function createGameBoard() {
    let gameboard = document.getElementById('gameBoard');

    let gridContainer = document.createElement('div');
    gridContainer.className = 'grid';

    

    for (let index = 0; index < 24; index++) {
        let item = document.createElement('div');
        item.className = 'item';
        let card = document.createElement('img');
        card.setAttribute('src','images/card_back.png');
        card.setAttribute('id',index);
        //card.setAttribute('onclick','flipcard()');
        card.addEventListener('click',flipcard);
        item.appendChild(card);
        gridContainer.appendChild(item);
    }
    

    
    gameboard.appendChild(gridContainer);

    cardArray.sort(() =>  0.5 - Math.random());
}

let clickCount = 0;
let cardChoosen = [];
let cardChoosenID = [];
let score = 0;

function flipcard() {
    let cardID = parseInt(this.getAttribute('id'));
    this.setAttribute('src',cardArray[cardID].image);
    cardChoosen.push(cardArray[cardID]);
    cardChoosenID.push(cardID+1);
    clickCount = clickCount+1;
    if (clickCount <= 35) {
        document.getElementById('diff').textContent = 'Good ('+clickCount+' Click)';
    }else if (clickCount >= 36 && clickCount <= 45) {
        document.getElementById('diff').style.color = 'aqua';
        document.getElementById('diff').textContent = 'Normal ('+clickCount+' Click)';
    }else {
        document.getElementById('diff').style.color = 'red';
        document.getElementById('diff').textContent = 'Bad ('+clickCount+' Click)';
    }
    if(cardChoosen.length === 2) {
        document.getElementById('gameConsole').style.color = 'black';
        document.getElementById('gameConsole').textContent = 'Checking....';
        setTimeout(checkForMatch,500);
    }
    console.log(cardChoosenID[0],cardChoosenID[1]);
}



function checkForMatch() {
    const cards = document.querySelectorAll('img');

    let selectedCardOne = cardChoosenID[0];
    let selectedCardTwo = cardChoosenID[1];

    let consoleMessage = "";
    
    if(cardChoosen[0].name === cardChoosen[1].name && cardChoosenID[0] !== cardChoosenID[1]) {
        cards[selectedCardOne].setAttribute('src','images/white.png');
        cards[selectedCardTwo].setAttribute('src','images/white.png');
        cards[selectedCardOne].removeEventListener('click',flipcard);
        cards[selectedCardTwo].removeEventListener('click',flipcard);
        score = score+1;
        document.getElementById('gameConsole').style.color = 'lime';
        consoleMessage = 'You found a match!!'
    }else{
        cards[selectedCardOne].setAttribute('src','images/card_back.png');
        cards[selectedCardTwo].setAttribute('src','images/card_back.png');
        document.getElementById('gameConsole').style.color = 'red';
        consoleMessage = 'Sorry, try again...'
    }

    document.getElementById('gameScore').textContent = score;
    document.getElementById('gameConsole').textContent = consoleMessage;


    
    cardChoosen = [];
    cardChoosenID = [];

    if(score === cardArray.length / 2) {
        document.getElementById('gameConsole').textContent = 'Congratulation! You win'
    }
}