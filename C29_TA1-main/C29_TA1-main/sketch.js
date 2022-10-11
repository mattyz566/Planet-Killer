var backgroundImg 
var Jerry
var JerryImg
var Obstacle1Image
var Obstacle2Image
var score = 0
var reward = 0
var gameState = PLAY
var PLAY = 1
var END = 0

 function preload(){ 
    backgroundImg = loadImage("Jungle background 1.webp") 
    JerryImg = loadImage("Jerry.png")
    Obstacle1Image = loadImage("Obstacle one.png")
    Obstacle2Image = loadImage("Obstacle 2.png")
    arrowImage = loadImage("Archerarrow.png")
    enemyImage = loadImage("Chracter 2.png")
    spearImage = loadImage("Jerrys spear.png")
    coinImage = loadImage("Coin (2).png")
    wallImage = loadImage("Wall.jpg")
  }
     function setup() {    
      createCanvas(800, 500);  
       bg = createSprite(400,250,1000,250) 
       bg.addImage(backgroundImg) 
       bg.x = width/4
       bg.velocityX = -3

       Jerry = createSprite(100,400,50,100)
       Jerry.addImage(JerryImg)
       Jerry.scale = 0.5

       Obstacle2 = createSprite(600,400,50,200)
       Obstacle2.addImage(Obstacle2Image)
       Obstacle2.scale = 0.8

       enemyGroup = new Group()
       ArrowGroup = new Group()
       coinGroup = new Group()
       wallGroup = new Group()
       spearGroup = new Group()
       

       Jerry.debug = true 
       Obstacle2.debug = true

       Jerry.setCollider("rectangle",0,0,50,100)
       Obstacle2.setCollider("rectangle",0,0,50,200)

      }
       function draw() { 
          
        
        background(220);   
        textSize(50)       
        text("Score:"+score,100,100)
        text("Reward:"+reward,500,100)
          if(bg.x<100){
          bg.x = width/4
          }
          if(gameState==PLAY){

          
          spawnArrow()
          Spawnenemy()
         
          
          spawnReward()



          if(keyDown(LEFT_ARROW)){
            Jerry.x = Jerry.x -5
          }
          
          if(keyDown(RIGHT_ARROW)){
            Jerry.x = Jerry.x +5
          }

          
          if(keyDown(UP_ARROW)){
            Jerry.y = Jerry.y -5
          }
          
          if(keyDown(DOWN_ARROW)){
            Jerry.y = Jerry.y +5
          }

          

            if(Jerry.isTouching(enemyGroup)||Jerry.isTouching(Obstacle2)){
               score = score+1
               enemyGroup.destroyEach()
               Obstacle2.destroy()
            }

                if(keyDown("s")){
                  var spear = createSprite(Jerry.x,Jerry.y,50,50)
                  spear.addImage(spearImage)
                  spear.scale = 0.3
                  spear.velocityX = 7
                  spearGroup.add(spear)
                  
                }

               if(coinGroup.isTouching(Jerry)){
                coinGroup.destroyEach()
                reward = reward+5
                wallGroup.destroyEach()
               }

              if(spearGroup.isTouching(enemyGroup)||spearGroup.isTouching(Obstacle2)){
                enemyGroup.destroyEach()
                Obstacle2.destroy()
                spearGroup.destroyEach()
                score = score+3

              }
              if(enemyGroup.isTouching(Jerry)||Obstacle2.isTouching(Jerry)){
                Jerry.destroy()
                gameState = END
                
              }
            }
          if(gameState==END){
            enemyGroup.destroyEach()
            ArrowGroup.destroyEach()
            Obstacle2.destroy()
            wallGroup.destroyEach()
            coinGroup.destroyEach()
          }
          drawSprites() 
         }

          function spawnArrow(){
          if(keyDown("space")){
          var Arrow = createSprite(600,410,50,200)
         Arrow.addImage(arrowImage)  
         Arrow.scale = 0.3
         Arrow.velocityX = -2
         ArrowGroup.add(Arrow)
          }
          }

        function Spawnenemy(){
          if(frameCount%200==0){
            var enemy = createSprite(600,200,100,100)
            enemy.addImage(enemyImage)
            enemy.velocityX = -2
            enemy.y = Math.round(random(150,450))
            enemyGroup.add(enemy)
            }
          }
        
        function spawnReward(){
          if(frameCount%250==0){
            var wall = createSprite(450,400,100,100)
            wall.addImage(wallImage)
            wall.scale = 0.3
            wall.velocityX = -5
            var coin = createSprite(450,330,50,50)
            coin.addImage(coinImage)
            coin.velocityX = -5
            coin.scale = 0.1
            coinGroup.add(coin)
            wallGroup.add(wall)
          }
        }


        

