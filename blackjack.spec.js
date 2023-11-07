const { JSDOM } = require('jsdom');
const { document } = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Blackjack</title>
    </head>
    <body>
      <h2>Dealer</h2>
      <div id="dealer-container">
        <div id="card-deck"></div>
      </div>
      <h2>Player</h2>
      <div id="player-container">
        <div class="card-deck"></div>
      </div>
      <h2>Messages</h2>
      <div id="message-container"></div>
    </body>
  </html>
`).window;

global.document = document;


const { CardPlayer, calcPoints } = require('./blackjack.js');
const CardDeck = require('./createCardDeck.js');

describe('CardPlayer', () => {
    it('should create a player with an empty hand', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        expect(player.name).toBe('Test Player');
        expect(player.hand).toEqual([]);
    })

    it('should allow the player to draw a card', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        player.drawCard();
        expect(player.hand.length).toBe(1);
    })
})

describe('calcPoints', () => {
    it('should take two cards of value 7 and 6 and calculate a total of 13', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 7, displayVal: 7, suit: 'hearts'},
            {val: 6, displayVal: 6, suit: 'spades'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(13);
    })

    it('should take three cards of value 7, 4, and 6 and calculate a total of 17', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 7, displayVal: 7, suit: 'hearts'},
            {val: 6, displayVal: 6, suit: 'spades'},
            {val: 4, displayVal: 4, suit: 'clubs'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(17);
    })

    it('should take three cards of value 7, 4, and Ace and calculate a total of 12', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 7, displayVal: 7, suit: 'hearts'},
            {val: 4, displayVal: 4, suit: 'spades'},
            {val: 11, displayVal: 'Ace', suit: 'clubs'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(12);
    })

    it('should take two cards of value Ace, 10 and calculate a total of 21', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 10, displayVal: 10, suit: 'spades'},
            {val: 11, displayVal: 'Ace', suit: 'clubs'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(21);
    })

    it('should take two aces and calculate a total of 12', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 11, displayVal: 'Ace', suit: 'spades'},
            {val: 11, displayVal: 'Ace', suit: 'clubs'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(12);
    })

    it('should take two aces and a king and calculate a total of 12', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 11, displayVal: 'Ace', suit: 'spades'},
            {val: 11, displayVal: 'Ace', suit: 'clubs'},
            {val: 10, displayVal: 'King', suit: 'hearts'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(12);
    })

    it('should take three aces and calculate a total of 13', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 11, displayVal: 'Ace', suit: 'spades'},
            {val: 11, displayVal: 'Ace', suit: 'clubs'},
            {val: 11, displayVal: 'Ace', suit: 'hearts'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.total).toBe(13);
    })

    it('should take an ace and an eight and return isSoft equals true and total to be 19', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 11, displayVal: 'Ace', suit: 'spades'},
            {val: 8, displayVal: 8, suit: 'clubs'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.isSoft).toBe(true);
        expect(blackjackScore.total).toBe(19);
    })

    it('should take two aces and an eight and return isSoft equals true and total to be 20', () => {
        const blackjackDeck = CardDeck.getDeck();
        const player = new CardPlayer('Test Player');
        const cards = [
            {val: 11, displayVal: 'Ace', suit: 'spades'},
            {val: 11, displayVal: 'Ace', suit: 'clubs'},
            {val: 8, displayVal: 8, suit: 'clubs'}
        ]
        player.hand = [...cards];
        const blackjackScore = calcPoints(player.hand);
        expect(blackjackScore.isSoft).toBe(true);
        expect(blackjackScore.total).toBe(20);
    })

})