// Uncomment CardDeck to run tests.
// const CardDeck = require('./createCardDeck.js');
//const blackjackDeck = CardDeck.getDeck();

const blackjackDeck = getDeck();  // Comment this out when testing.


// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
    drawCard() { 
        const newCard = blackjackDeck[Math.floor(Math.random() * 52)]  //draw a random card from the deck
        this.hand.push(newCard);
    }
}; 

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('dealer');
const player = new CardPlayer('Player');

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {
  const aces = hand.filter(card => card.displayVal === 'Ace');
  let blackjackScore = {};
  let total = 0;
  let isSoft = false;

  for (const card of hand) {
      total += card.val;
  }

  if (aces.length > 0) {
      // Check if the total is greater than 21 and there's at least one ace.
      for (i = 0; i < aces.length; i ++) {
        if (total > 21) {
            total -= 10; // subtract 10 from the total
            aces[i].val = 1; // set the value of ace to 1
        }
      }

      const aceAtEleven = aces.some(ace => ace.val === 11);

      // Check if the hand is soft.
      if (aceAtEleven === true) {
          isSoft = true;
      }
  }

  blackjackScore = {
      total: total,
      isSoft: isSoft
  };

  return blackjackScore;
}

// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
   const dealerBlackjackScore = calcPoints(dealerHand);
   if (dealerBlackjackScore.total < 16) {
    return true;
   } else if (dealerBlackjackScore.total === 17 && dealerBlackjackScore.isSoft) {
    return true;
   } else {
    return false;
   }

}

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore, messageContainer) => {
  let winningMessage = '';
  if (playerScore > 21) {
    winningMessage = "You went over 21. You lose.";
  } else if (dealerScore > 21) {
    winningMessage = "Dealer busts. You win!";
  } else {
    if (playerScore > dealerScore) {
      winningMessage = `${player.name} wins!`;
    } else if (dealerScore > playerScore ) {
      winningMessage = `${dealer.name} wins!`;
    } else {
      winningMessage = `Push! No winner!`;
    }
  }

  messageContainer.innerHTML = `Player score: ${playerScore}, Dealer score: ${dealerScore}. ${winningMessage}`;
  console.log(`Player score: ${playerScore}, Dealer score: ${dealerScore}. ${winningMessage}`);
}

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is <span id="count">${count}</span>.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player, container) => { //updating function to include a container parameter.
  const spanCount = document.getElementById("count");
  const score = calcPoints(player.hand).total;
  const displayHand = player.hand.map((card) => card.displayVal);
  
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${score})`);
  container.innerHTML = `${player.name}'s hand is ${displayHand.join(', ')} (${score})`;
  if (spanCount) {
    spanCount.innerHTML = score;
  }
}

const displayModal = (playerContainer, messageContainer, playerScore, dealerHandler) => {
  messageContainer.innerHTML = getMessage(playerScore, dealer.hand[0]);
  const hitButton = document.createElement("button");
  hitButton.innerHTML = "Hit";
  hitButton.addEventListener("click", () => {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player, playerContainer);
    if (playerScore > 21) {
        dealerHandler(playerScore);
      }
  });

  const standButton = document.createElement("button");
  standButton.innerHTML = "Stand";
  standButton.addEventListener("click", () => dealerHandler(playerScore));
  console.log("Player Score is: ", playerScore);
  messageContainer.innerHTML = getMessage(playerScore, dealer.hand[0]);
  messageContainer.appendChild(hitButton);
  messageContainer.appendChild(standButton);
  

  return playerScore;
}

const checkForBlackjack = (playerScore, dealerScore) => {
  if (playerScore === 21 || dealerScore === 21) {
    return true;
  } else {
    return false;
  }
}


/**
 * Runs Blackjack Game
 */
const startGame = function() {
  const playerContainer = document.getElementById('player-container');
  const dealerContainer = document.getElementById('dealer-container');
  const messageContainer = document.getElementById('message-container');

  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  //showHand(player, playerContainer);

  let playerScore = calcPoints(player.hand).total;
  let dealerScore = calcPoints(dealer.hand).total;

  if (checkForBlackjack === true) {
    determineWinner(playerScore, dealerScore, messageContainer);
  }

  showHand(player, playerContainer);
  const dealerHandler = (playerScore) => {
    showHand(dealer, dealerContainer);
    if (playerScore < 21 ) {
      while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
        dealer.drawCard();
        dealerScore = calcPoints(dealer.hand).total;
        showHand(dealer, dealerContainer);
      }
    }
    determineWinner(playerScore, dealerScore, messageContainer);
  }
  const dealerFirstCard = document.createElement("p");
  dealerFirstCard.innerText = dealer.hand[0].displayVal;
  dealerContainer.appendChild(dealerFirstCard);
  displayModal(playerContainer, messageContainer, playerScore, dealerHandler);

}

startGame();


// Uncomment when testing.
// module.exports = {
//   CardPlayer,
//   calcPoints,
// }