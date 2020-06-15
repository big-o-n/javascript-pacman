//declaring the objects and variables used 
var score = 0,  //player score
    gscore = 0, //ghost score
    ghost = false,//ghost=presnce of ghost
    ghost2 = false, //presence of 2nd ghost
    countblink = 20;//for proper eye blinking
var player = {
    x : 50,
    y : 100,
    pacmouth:320,
    pacdir:0,
    psize:32,
    speed:5
}
var enemy = {
    x : 150,
    y : 200,
    speed:5,
    moving:0,
    dirx:0,
    diry:0,
    flash:0,
    ghosteat:false
}
var enemy2 = {
    x : 150,
    y : 200,
    speed:5,
    moving:0,
    dirx:0,
    diry:0,
    flash:0,
    ghosteat:false
}
var powerdot = {
    x : 10,
    y : 10,
    powerup:false,
    pcountdown:0,
    ghostNum:0,
    ghostNum2:0
}
//creating the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
//creating the image object
mainImage = new Image();
mainImage.ready=false;
mainImage.onload = checkReady;
mainImage.src= "pac.png";

//detectign and adding the value of the key clicks
var keyClick = {};
document.addEventListener("keydown", function(event){
    keyClick[event.keyCode]=true;
    move(keyClick);
}, false);
//remove the value of previos clicks from the object
document.addEventListener("keyup", function(event){
    delete keyClick[event.keyCode];
}, false);

function move(keyClick) {
    
    //on pressing a key, detect key and move accordingly
    if(37 in keyClick) {
        player.x -= player.speed;
        player.pacdir=64;
    }
    if(38 in keyClick) {
        player.y -= player.speed;
        player.pacdir=96;
    }
    if(39 in keyClick) {
        player.x += player.speed;
        player.pacdir=0;
    }
    if(40 in keyClick) {
        player.y += player.speed;
        player.pacdir=32;
    }
    //at the end of the canvas crossover to the other side
    if (player.x >=(canvas.width-32)) {
        player.x=0;
    }
    if (player.y >=(canvas.height-32)) {
        player.y=0;
    }
    if(player.x < 0) {
        player.x=(canvas.width-32);
    }
    if(player.y < 0) {
        player.y=(canvas.height-32);
    }
    //opening and closing of the mouth of the pacman
    if(player.pacmouth===320) {
        player.pacmouth=352;
    }
    else {
        player.pacmouth=320;
    }
    render();
}
function checkReady(){
    this.ready=true;
    playgame();
}

function playgame(){
    render();
    //conntinuous looping of the render functon
    window.requestAnimationFrame(playgame);
}

function myNum(n){
    //can take any formula to randomise the position of the ghost
    return Math.floor(Math.random() * n );
}

function render(){
    //Canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    //if power dot does not exist then create one and also it did not disappear when pacman ate the powerdot so counter<5
    if(!powerdot.powerup && powerdot.pcountdown<5) {
        powerdot.x = myNum(420)+30;//random location below the scorecard
        powerdot.y = myNum(250)+30;
        powerdot.powerup=true;//indicates that the powedot now exists
    }
    
    //if ghost doesnt exist then create one
    if(!ghost) {
        enemy.ghostNum = myNum(5)*64;
        enemy.x=myNum(450);
        enemy.y=myNum(250)+30;
        ghost = true;
    }
    if(!ghost2) {
        enemy2.ghostNum = myNum(5)*64;
        enemy2.x=myNum(350);
        enemy2.y=myNum(280)+30;
        ghost2 = true;
    }
    
    //moving the enemy 1
    if(enemy.moving<0) {
        //randomly setting the enemy movement
        enemy.moving = (myNum(20)*3)+myNum(1);
        //setting a random speed
        enemy.speed = myNum(2);
        enemy.dirx = 0;
        enemy.diry = 0;
        
        //incase if the powerdot has been eaten up then ghost wants to move away from pacman
        if(powerdot.ghosteat) {
            enemy.speed*=-1;
        }
        
        //moves up or down | left or rigth d/o if odd or even value
        if(enemy.moving % 2) {
            //trying to move towards the pacman
            if(player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            }else{
                enemy.dirx = enemy.speed;
            }
        } else {
            //trying to move towards the pacman
            if(player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            }else{
                enemy.diry = enemy.speed;
            }
        }
    }
    
    //updating the positon of the enemy
    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy. diry;
    //checking if teh enemy does not flow out of the screen
    if (enemy.x >=(canvas.width-32)) {
        enemy.x=0;
    }
    if (enemy.y >=(canvas.height-32)) {
        enemy.y=0;
    }
    if(enemy.x < 0) {
        enemy.x=(canvas.width-32);
    }
    if(enemy.y < 0) {
        enemy.y=(canvas.height-32);
    }
    
    
    //enemy2-same
    /*?????????*/
     if(enemy2.moving<0) {
        //randomly setting the enemy movement
        enemy2.moving = (myNum(20)*3)+myNum(1);
        //setting a random speed
        enemy2.speed = myNum(2);
        enemy2.dirx = 0;
        enemy2.diry = 0;
        
        //incase if the powerdot has been eaten up then ghost wants to move away from pacman
        if(powerdot.ghosteat) {
            enemy2.speed*=-1;
        }
        
        //moves up or down | left or rigth d/o if odd or even value
        if(enemy2.moving % 2) {
            //trying to move towards the pacman
            if(player.x < enemy2.x) {
                enemy2.dirx = -enemy2.speed;
            }else{
                enemy2.dirx = enemy2.speed;
            }
        } else {
            //trying to move towards the pacman
            if(player.y < enemy2.y) {
                enemy2.diry = -enemy2.speed;
            }else{
                enemy2.diry = enemy2.speed;
            }
        }
    }
    
    //updating the positon of the enemy
    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2. diry;
    //checking if teh enemy does not flow out of the screen
    if (enemy2.x >=(canvas.width-32)) {
        enemy2.x=0;
    }
    if (enemy2.y >=(canvas.height-32)) {
        enemy2.y=0;
    }
    if(enemy2.x < 0) {
        enemy2.x=(canvas.width-32);
    }
    if(enemy2.y < 0) {
        enemy2.y=(canvas.height-32);
    }
    /*??????????????????????*/
    
    
    //Collision detection with the ghost
    //enemy1
    if(player.x<=(enemy.x+26) && enemy.x<=(player.x+26) && player.y<=(enemy.y+26) && enemy.y<=(player.y+32))  {
        console.log('hit ghost1');
        if(powerdot.ghosteat) {
            score++;
            enemy.ghostNum = powerdot.ghostNum;//gets the orignal ghost color  
            enemy2.ghostNum = powerdot.ghostNum2;
        }else{
            gscore++;
        }
        player.x=10;//resets the position of player
        player.y=100;
        enemy.x=300;//resets the position of the ghost
        enemy.y=200;
        powerdot.ghosteat=false;//disables the poweredup mode
        powerdot.pcountdown=0;//reduces the countdown to zero
    }
    //enemy2
    if(player.x<=(enemy2.x+26) && enemy2.x<=(player.x+26) && player.y<=(enemy2.y+26) && enemy2.y<=(player.y+32))  {
        console.log('hit ghost2');
        if(powerdot.ghosteat) {
            score++;
            enemy.ghostNum = powerdot.ghostNum;//gets the orignal ghost color  
            enemy2.ghostNum = powerdot.ghostNum2;
        }else{
            gscore++;
        }
        player.x=10;//resets the position of player
        player.y=100;
        enemy2.x=250;//resets the position of the ghost
        enemy2.y=100;
        powerdot.ghosteat=false;//disables the poweredup mode
        powerdot.pcountdown=0;//reduces the countdown to zero
        
    }
    
    //Collision detection with the power up dot
    if(player.x<=powerdot.x && powerdot.x<=(player.x+32) && player.y<=powerdot.y && powerdot.y<=(player.y+32))  {
        console.log('hit');
        powerdot.powerup=false;//indicates now the powerdot has dissappeared after collision
        powerdot.pcountdown=500;//starts a counter
        powerdot.ghostNum=enemy.ghostNum;// temporariy saving the ghost number(WHICH COLOR TO DISPLAY)
        powerdot.ghostNum2=enemy2.ghostNum;//same for ghost 2
        enemy.ghostNum=384;//turns to the blue and white ghost that flash
        enemy2.ghostNum=384;
        powerdot.x=0;//powerdot dissapears
        powerdot.y=0;
        powerdot.ghosteat= true;//just a flag
        player.speed = 10; //increase the speed of player when it eats the power up
    }
    //when collision with power up happens
    if(powerdot.ghosteat) {
        powerdot.pcountdown--;//countdown keeps running
        if(powerdot.pcountdown<=0) {
            powerdot.ghosteat = true; // now countdown ends and no flash reqd
            enemy.ghostNum = powerdot.ghostNum;//gets the orignal ghost color  
            enemy2.ghostNum = powerdot.ghostNum2;
            player.speed=5;//decrease the speed back to normal when couner is zero
        }
    }
    
    //if power dot exists then draw it on the canvas
    if(powerdot.powerup) {
        context.fillStyle = "#ffffff";
        //creation of a circle using the draw arc function
        context.beginPath();
        context.arc( powerdot.x , powerdot.y, 10 , 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }
    
    //enemy flashing when countdown running +/- 32 to select the lower image
    if(countblink>0){
        countblink--; //adds a wait period before switching state
    }else{
        countblink=20; // resets the wait counter
        if(enemy.flash==0) { //check for both the enemies is universal
            enemy.flash=32;
            enemy2.flash=32;
        }
        else {
            enemy.flash=0;
            enemy2.flash=0;
        }
    }
    
    //Score Card
    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2, 18);
    
    //adding enemy before
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);
    context.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32, 32);
    //adding pacman at the end so it can go over every other object
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);
    
}
//links the canves set in JavaScript to the index.html
document.body.appendChild(canvas);


