const board = document.getElementsByClassName("board")[0]

const playerContainer = document.getElementById("player_hp")
let enemyContainer =  undefined

const player_card = document.getElementById("player")
const og_enemy_card = document.getElementsByClassName("enemy")[0]
let enemy_card = undefined

const p_roll = document.querySelector("#player_roll")
let e_roll = undefined

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
    setTimeout(() => {
        if (animation == "killed") {
            node.remove()
        }
        node.classList.remove(animation);
    },500)
    
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
function update_stats() {
    p_roll.textContent = player_roll
   

    playerContainer.textContent = playerHp
   

    if (currentEnemy) {
        enemyContainer.textContent = currentEnemy.hp
        e_roll.textContent = enemy_roll
    }
}  

class enemy {
    constructor(name,hp,attack,speed) {
        this.name = name
        this.hp = hp
        this.attack = attack
        this.speed = speed
    }
}

let player_speed = 1

let last = 0
let player_wait = 0
let enemy_wait = 0
let game_wait = 0


let currentEnemy = undefined
let playerHp = 100
let player_roll = randi_range(1,20)
let enemy_roll = 0


update_stats()

function make_new_enemy() {
    currentEnemy = new enemy("spurt", randi_range(20,50),randi_range(10,20),randi_range(1,3))
    enemy_card = og_enemy_card.cloneNode(true)

    enemyContainer = enemy_card.getElementsByClassName("enemy_hp")[0]
    e_roll = enemy_card.getElementsByClassName("enemy_roll")[0]

    board.appendChild(enemy_card)
    enemy_card.classList.remove("invisible")
    animateNode(enemy_card,"make_appear")
    update_stats()
}

function kill_enemy() {
    animateNode(enemy_card,"killed")
    game_wait = 2000
    currentEnemy = undefined
}

function player_attack() {
    player_roll = randi_range(1,20)
    animateNode(p_roll,"make_appear")

    if (player_roll > enemy_roll) {
        combatlog("player hits enemy for:  " + String(player_roll),"Good")
        currentEnemy.hp -= player_roll
        animateNode(enemy_card,"hit")

        if (currentEnemy.hp <= 0){
            kill_enemy()
        }
    }
    else {
        animateNode(enemy_card,"block")
        combatlog("The enemy blocks your attack!!:  ","Bad")
    }
    update_stats()
}

function enemy_attack() {
    enemy_roll = randi_range(1,currentEnemy.attack)
    animateNode(e_roll,"make_appear")

    if (enemy_roll > player_roll) {
        combatlog("Enemy hits you for:  " + String(enemy_roll),"Good")
        playerHp -= enemy_roll
        animateNode(player_card,"hit")
    }
    else {
        animateNode(player_card,"block")
        combatlog("You block the enemy's attack!!!:  ","Good")
    }
    update_stats()
}








function gameLoop(Timestamp) {
    if (last === 0) {
        last = Timestamp
    }
    let delta = Timestamp - last
    last = Timestamp

    if (game_wait <= 0){
        if (!currentEnemy) {
            make_new_enemy()
        }
        
        if (!isNaN(delta)) {
            player_wait += delta
            enemy_wait += delta
        }

        if (player_wait > player_speed * 1000) {
            player_attack()
            player_wait = 0
        }

        if (currentEnemy) {
            if (enemy_wait > currentEnemy.speed * 1000) {
                enemy_attack()
                enemy_wait = 0
            }
        }

        
    }
    else {
        game_wait -= delta
    }

    
        
    round = window.requestAnimationFrame(gameLoop)
}

startButton.addEventListener("click",gameLoop)




