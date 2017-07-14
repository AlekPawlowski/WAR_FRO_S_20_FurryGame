var Furry = require("./furry_constructor.js");
var Coin = require("./coin_constructor.js");


var Game = function() {

    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    var self = this;
    this.coin = new Coin ();
    this.score = 0;

    this.index = function(x,y) {
        return x + (y * 10);
    }

    this.showFurry = function() {

        this.hideVisibleFurry();

        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    this.hideVisibleFurry = function() {

        var div = document.querySelector('.furry');

        if (div != null) {
            div.classList.remove('furry');
        }
    }

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.moveFurry = function() {
        if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;

       } else if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;

        } else if (this.furry.direction ==="up") {
            this.furry.y = this.furry.y - 1;

        } else if (this.furry.direction ==="down") {
            this.furry.y = this.furry.y + 1;
        }


        this.checkCoinCollision();
        this.gameOver();
        this.showFurry();

    }

    this.turnFurry = function(event) {

        switch (event.which) {
            case 37:
            this.furry.direction = 'left';
            break;
            case 38:
            this.furry.direction = 'up';
            break;
            case 39:
            this.furry.direction = 'right';
            break;
            case 40:
            this.furry.direction = 'down';
            break;
        }
    }

    this.checkCoinCollision = function() {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
            this.score++
            document.querySelector('#score div strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.gameOver = function() {

        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {

            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert('HAHAHAHA GAME OVER HAHAHA. Ale spoko udalo ci sie zebrać ' + this.score + ' monet!');

            this.furry = new Furry;
            this.score = 0;
            document.querySelector('#score div strong').innerText = this.score;
            this.startGame();
        }
    }

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
       } , 250);
    }
}

module.exports = Game;
