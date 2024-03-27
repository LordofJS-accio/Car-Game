const score = document.querySelector('.score'); 
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);


// key identification: (keydown, keyup)

let keyObj = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed: 5,
    x: 0,
    y: 0
    
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);


function keyPressed(eventDetails){
    // console.log("key Pressed",eventDetails.key);
    let pressedKey = eventDetails.key;
    if(pressedKey in keyObj){
        keyObj[pressedKey] = true;
        // console.log(keyObj);
    }
}

function keyReleased(eventDetails){
//    console.log("key Released",eventDetails.key);
      let releasedKey = eventDetails.key;
        if(releasedKey in keyObj){
            keyObj[releasedKey] = false;
            // console.log(keyObj);
        }
}


// game play logic 

function gamePlay(){
    //  console.log('game started');
     let car = document.querySelector('.car');
     let road = gameArea.getBoundingClientRect()
    //  console.log(road);
     if(player.start){
        if(keyObj.ArrowUp == true  && road.top < player.y){
            // console.log(road.top, player.y)
            player.y = player.y - player.speed;
        }
        if(keyObj.ArrowDown && player.y < road.bottom - 60 ){
            player.y = player.y + player.speed;
        }
        if(keyObj.ArrowLeft && player.x >0){
            player.x = player.x - player.speed;
        }
        if(keyObj.ArrowRight && player.x< road.width - 55){
            player.x = player.x + player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        requestAnimationFrame(gamePlay);
     }
    
}


// starrt Game Logic
function start(){
    // console.log('clicked');
    startScreen.classList.add('hide'); // [startScreen, hide]
    gameArea.classList.remove('hide'); // [gameArea ]
    player.start = true;
    requestAnimationFrame(gamePlay);
    //generate Car 

    let car = document.createElement('div');
    car.innerText = "Car"; 
    // car.setAttribute('class', 'car');
    car.className = 'car';
    gameArea.append(car); // x and y coordinates
    // console.log("from top",car.offsetTop, "from left", car.offsetLeft);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log("from top",player.y, "from left", player.x);
}

// 4 controls: up, down, left, right