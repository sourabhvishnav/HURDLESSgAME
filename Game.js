class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage("player1",player1_img);
    player2 = createSprite(300,200);
    player2.addImage("player2",player2_img);
    player3 = createSprite(500,200);
    player3.addImage("player3",player3_img);
    player4 = createSprite(700,200);
    player4.addImage("player4",player4_img);
    players = [player1, player2, player3, player4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getPlayersAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array 
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        x = x + 200;
    
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;


       
        if (index === player.index){
          stroke(10);
          fill("yellow");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "yellow";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y;
        }   
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank+=1;
      Player.updatePlayersAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Over");
    console.log(player.name + player.rank);
  }
}
