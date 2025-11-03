playerContainer = document.getElementById("player_hp")
enemyContainer = document.getElementById("enemy_hp")

const playerName = "mimimi"
let playerHp = 100
let enemyHp = 100

let game = true

// returns a number value between given interval, 
// min is minimum return and max is maximum return
function randi_range(min,max) {
    let range = (max-min) + 1
    return min + Math.floor(Math.random() * range)
}


//a function which is the main loop for the game
while (game) {
    //rolls a 6-sided dice for both player and enemy
    let player_roll = randi_range(1,6)
    let enemy_roll = randi_range(1,6)
    
    //checks if player- or enemyroll is higher, the one who has higher hits the other
    //if they roll the same they both block and nothing happens
    if (player_roll > enemy_roll) {
        console.log("player hits enemy!")
        enemyHp-= 10
    }
    else if (enemy_roll > player_roll) {
        console.log("enemy hits player!")
        playerHp -= 10
    }
    else {
        console.log("both block, nothing happens")
    }
    playerContainer.textContent = playerHp
    enemyContainer.textContent = enemyHp

    //Checks if either enemy or player has 0 or less hp, if true then it ends the game
    if (enemyHp <= 0 || playerHp <= 0) {
        game = false
        //prints out the winner depending on which character has the highest hp

        if (enemyHp > playerHp) {
            console.log("enemy has won!!!!!!!!")
        }
        else {
            console.log("player has won!!!!!!!")
        }
    }
}





