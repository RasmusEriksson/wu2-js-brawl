const playerContainer = document.getElementById("player_hp")
const enemyContainer = document.getElementById("enemy_hp")

const startButton = document.querySelector("#start-button")

const logContainer = document.querySelector("#combat-log")
const logMessage = document.getElementsByClassName("log-message")[0]

const playerName = "mimimi"

function combatlog(msg,type) {
    const newLog = logMessage.cloneNode(true)
    const msg_container = newLog.getElementsByClassName("msg")[0]
    const type_container = newLog.getElementsByClassName("type")[0]

    msg_container.textContent = msg
    type_container.textContent = type

    logContainer.appendChild(newLog)
}
    

// returns a number value between given interval, 
// min is minimum return and max is maximum return
function randi_range(min,max) {
    let range = (max-min) + 1
    return min + Math.floor(Math.random() * range)
}

    

startButton.addEventListener("click",startGame)

function startGame() {
    let playerHp = 100
    let enemyHp = 100
    //a function which is the main loop for the game
    let game = setInterval(() =>{
        //rolls a 6-sided dice for both player and enemy
        let player_roll = randi_range(1,6)
        let enemy_roll = randi_range(1,6)
        
        //checks if player- or enemyroll is higher, the one who has higher hits the other
        //if they roll the same they both block and nothing happens
        if (player_roll > enemy_roll) {
            combatlog("player hits enemy for:  " + String(player_roll),"Good")
            enemyHp-= player_roll
        }
        else if (enemy_roll > player_roll) {
            combatlog("enemy hits player for:  " + String(enemy_roll),"Bad")
            playerHp -= enemy_roll
        }
        else {
            combatlog("Both block, nothing happens","Neautral")
        }
        playerContainer.textContent = playerHp
        enemyContainer.textContent = enemyHp

        //Checks if either enemy or player has 0 or less hp, if true then it ends the game
        if (enemyHp <= 0 || playerHp <= 0) {
            clearInterval(game)
            //prints out the winner depending on which character has the highest hp

            if (enemyHp > playerHp) {
                combatlog("ENEMY WINS!","Terrible")
            }
            else {
                combatlog("PLAYER WINS!","Incredible")
            }
        }
    },150)
}






