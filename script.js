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


// move Lines 

function moveLines(){
    let lines = document.querySelectorAll('.line');
    for(let t of lines){
    //    console.log(t.y);
        if(t.y >=662){
            t.y = t.y - 750;
        }

        t.y = t.y + player.speed; // 5px
        t.style.top = t.y + "px";
    }

}


function isCollide(a,b){
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();


  return !(
         (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right) // discuss again
         )
}


function moveEnemy(car){

    let enemyies = document.querySelectorAll('.enemy');
    for(let t of enemyies){
          
        if(isCollide(car,t) == true){
            console.log("Collided");
            player.start = false;
        }


        if(t.y >= 662){
            t.y = t.y - 650;
            t.style.left = parseInt(Math.random()*150) + "px";

        }

        t.y = t.y + player.speed; // 5px
        t.style.top = t.y + "px";
    }

}



// game play logic 

function gamePlay(){
    //  console.log('game started');
     let car = document.querySelector('.car');
     let road = gameArea.getBoundingClientRect()
    //  console.log(road);
    moveLines()
    moveEnemy(car)
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
    
    // generate raod divider: 

    for(let x = 0; x<5; x++){
        let div = document.createElement('div');
        div.className = 'line';
        div.y = x*150
        div.style.top = x*150 + "px";   // 0, 150, 300, 450, 600
        gameArea.append(div);
    }

    // generate enemy cars: 

    for(let x = 0 ; x<3; x++){
        let enemy = document.createElement('div'); 
        enemy.className = 'enemy';
        enemy.style.backgroundColor = "red"; 
        enemy.y = (x+1)*300*-1;  // -300, -600, -900
        enemy.style.top = enemy.y + "px";
        enemy.style.left = parseInt(Math.random()*150) + "px";
        gameArea.append(enemy);
    }
}

// 4 controls: up, down, left, right







// placement criterai: 
// todoApp application => JS and React (15 mins screen share)
// 24-48 to do a samll projects 
// Swiggy Home page clone 
// Amazon Home page clone
// Twitter Home page clone









// car a , car b



