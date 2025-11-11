const playerContainer = document.getElementById("player_hp")
const enemyContainer = document.getElementById("enemy_hp")

const player = document.getElementById("player")
const enemy = document.getElementById("enemy")

const startButton = document.querySelector("#start-button")

const logContainer = document.querySelector("#combat-log")
const logMessage = document.getElementsByClassName("log-message")[0]
const max_logs = 6

const playerName = "mimimi"

function animateNode(node,animation) {
    // node.addEventListener("animationend webkitanimationEnd oAnimationEnd MSAnimationEnd", function() {
    //     node.classList.remove(animation)
    //     console.log("removed!")
    // })

    node.classList.remove(animation);
    void node.offsetWidth;
    node.classList.add(animation);
}

function combatlog(msg,type) {
    const newLog = logMessage.cloneNode(true)
    const msg_container = newLog.getElementsByClassName("msg")[0]
    const type_container = newLog.getElementsByClassName("type")[0]

    newLog.classList.remove("invisible")
    animateNode(newLog,"make_appear")

    msg_container.textContent = msg
    type_container.textContent = type

    logContainer.appendChild(newLog)
    
    let logs = logContainer.getElementsByClassName("log-message")
    if (logs.length > max_logs) {
        let remove_log = logs[0]
        logContainer.removeChild(remove_log)
    }
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
        //rolls a 20-sided dice for both player and enemy
        let player_roll = randi_range(1,20)
        let enemy_roll = randi_range(1,20)
        
        //checks if player- or enemyroll is higher, the one who has higher hits the other
        //if they roll the same they both block and nothing happens
        if (player_roll > enemy_roll) {
            combatlog("player hits enemy for:  " + String(player_roll),"Good")
            enemyHp-= player_roll
            animateNode(enemy,"hit")
        }
        else if (enemy_roll > player_roll) {
            combatlog("enemy hits player for:  " + String(enemy_roll),"Bad")
            playerHp -= enemy_roll
            animateNode(player,"hit")
        }
        else {
            animateNode(player,"hit")
            animateNode(enemy,"hit")
            combatlog("Both block, nothing happens","Neutral")
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
    },1000)
}






