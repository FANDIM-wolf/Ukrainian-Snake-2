var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');

const ground = new Image(); // Create Object
ground.src = "img/ground.png"; // Set ground image

const foodImg = new Image(); // Create Object
foodImg.src = "img/dumpling.png"; // Set food image


let box = 32; // size of the box on the map

let score = 0; // default score

let difficult = 1 ;

let death = false ;

// it contains coordinates of food on the map 
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
};

//apply Event Listener and hand it to function Direction.

document.addEventListener("keydown", Direction);

let dir;

// manage direction of the snake .

function Direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}
//describe , what if  snake bytes herself.
function EatSnakeTail(head , arr){
    for(let i = 0 ; i< arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y  ){
            //stop game
            clearInterval(game);
            alert("Ви мертві. Зроблено в легкому режимі");
            ctx.fillStyle = "red";
        }    
    }
}

function DrawGameProcess(){
    //draw background of the game . picture "ground.png"
    ctx.drawImage(ground,0,0);
    //Display food 
    ctx.drawImage(foodImg,food.x,food.y);
    //Display snake
    for(let i = 0 ; i < snake.length; i++){
        ctx.fillStyle = i == 0 || i == 1  ? "yellow" : "blue" ;
        
        ctx.fillRect(snake[i].x , snake[i].y , 30 , 30  );
    }

    //draw the label 
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score , box * 4 , box * 1.5);
    //draw the label 
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(difficult , box * 8 , box * 1.5);  

    //coridnates of the  snake head 
    let SnakeX = snake[0].x;
    let SnakeY = snake[0].y;
    //condition : we ate food ?
    if(SnakeX == food.x && SnakeY == food.y ){
        // depending on difficult we add some points to score.
        if (difficult == 1){ 
            score = score + 2;
            difficult = difficult + 1;
            food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            }; 
        }
        if (difficult == 2 ){
            score = score + 3;
            difficult = difficult + 1;
            food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            }; 
        }
        if (difficult > 2 ){
            score = score + 10;
            difficult = difficult + 1;
            food = {
                x: Math.floor((Math.random() * 17 + 1)) * box,
                y: Math.floor((Math.random() * 15 + 3)) * box,
            }; 
        }

        
        

    }else{
        //delete last element of the array 
        snake.pop(); 
    }

    //if we go out of the borders , we lose
    if(SnakeX < box || SnakeX > box * 17 || SnakeY < 3 * box || SnakeY > box * 17 )
    {   
        death = true;
        //stop game
        clearInterval(game);
        alert(" Ти мертвий . Зроблено в легкому режимі");
        
        
    }


    //change position of the snake
    if(dir == "left") {
        SnakeX -= box;
    }
    if(dir == "right"){
        SnakeX += box;
    }
    if(dir == "up") {
        SnakeY -= box;
    };
    if(dir == "down") {
        SnakeY += box
    };  
    //contains data of coordiantes of new head
    let newHead = {
        x: SnakeX,
        y: SnakeY
    };
    
    //condition : snake is  eating herself
    EatSnakeTail(newHead , snake);

    //increase tail , add element in array . Simply say it.
    snake.unshift(newHead );
}

//Render game each 100 mili seconds
let game = setInterval(DrawGameProcess ,200);