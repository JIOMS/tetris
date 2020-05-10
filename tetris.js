//게임 초기 세팅
let GAME_WIDTH = 10
let GAME_HEIGHT = 20
let GAME_PADDING = 2
let GAME_MARGIN_TOP = 4
let Next_BLOCK_WINDOW = 6
var BLOCK_SIZE = 30
var GAME_LEVEL = 40
//    MY_LEVEL = 1
    HIGH_SCORE = 0

//var high_score_now 
var ctx
var ctx2

//게임 지표
var count = 0
    now = 0
    SCORE = 0
//    score_now = document.getElementById("score")
//    history = []
    clearedRow = []

function setUp(){
  setBoard()
//   score_now.textContent = SCORE
//  high_score_now = document.getElementById("high_score")
//  high_score_now.textContent = HIGH_SCORE

  var canvas = document.getElementById("tetris")
      ctx = canvas.getContext('2d')
  ctx.canvas.width = GAME_WIDTH * BLOCK_SIZE
  ctx.canvas.height = GAME_HEIGHT * BLOCK_SIZE
   //block.shape.forEach(n => {block.shape[n].forEach(m => {if(block.shape[n][m] == 1){ console.log(n+block.y) }})})
  ctx.fillStyle = "#000"
  ctx.strokeSyle = "rgba(0,0,0,1)"

  ctx2 = document.getElementById("next_block").getContext('2d')
  ctx2.canvas.width = Next_BLOCK_WINDOW*BLOCK_SIZE
  ctx2.canvas.height = Next_BLOCK_WINDOW*BLOCK_SIZE

  history[count] = new Block()
  history[count] = new Block()

  block_now = history[now]
  block_next = history[now + 1]

  block_now.draw(ctx)
  drawNext()
  
  
  //ctx.fillRect(3*BLOCK_SIZE, 4*BLOCK_SIZE,BLOCK_SIZE,BLOCK_SIZE)

}

//키보드 이벤트
onkeydown = function () {
  switch(event.keyCode){
    case 40: block_now.down(ctx); break;
    case 38: block_now.rotate(ctx); break;
    case 39: block_now.right(ctx); break;
    case 37: block_now.left(ctx); break;
    case 32: block_now.land(ctx); break;
    default: break;
  }
}

//게임 상황 보드
var board = []
setBoard = function(){
  for(n=0;n<GAME_MARGIN_TOP+GAME_HEIGHT;n++){
    board[n] = []
    for(m=0;m<GAME_PADDING;m++){
      board[n][m] = -2
    }
    for(m=GAME_PADDING;m<GAME_PADDING+GAME_WIDTH;m++){
      board[n][m] = 0
    }
    for(m=GAME_PADDING+GAME_WIDTH;m<2*GAME_PADDING+GAME_WIDTH;m++){
      board[n][m] = -2
    }
  }
  for(n=GAME_MARGIN_TOP+GAME_HEIGHT;n<GAME_MARGIN_TOP+GAME_HEIGHT+GAME_PADDING;n++){
    board[n] = []
    for(m=0;m<2*GAME_PADDING+GAME_WIDTH;m++){
      board[n][m] = -2
    }
  }
}


//블록들
let blocks = {
  type: ["snake", "rev_snake", "stick","L", "rev_L", "rev_T", "box"],
  color: ["blue", "green", "black", "yellow", "orange", "purple", "red"],
  shape: [
    [[0,0],[1,0],[1,1],[2,1]],
    [[0,1],[1,1],[1,0],[2,0]],
    [[0,1],[1,1],[2,1],[3,1]],
    [[0,0],[1,0],[2,0],[2,1]],
    [[0,1],[1,1],[2,1],[2,0]],
    [[1,0],[1,1],[1,2],[0,1]],
    [[0,0],[1,0],[1,1],[0,1]]
    /* [[1,0],[1,1],[0,1]],
    [[0,1],[1,1],[1,0]],
    [[1],[1],[1],[1]],
    [[1,0],[1,0],[1,1]],
    [[0,1],[0,1],[1,1]],
    [[0,1,0],[1,1,1]],
    [[1,1],[1,1]] */
    /* [[[1,0],[1,1],[0,1]],[[0,1,1],[1,1,0]]],
    [[[0,1],[1,1],[1,0]],[[1,1,0],[0,1,1]]],
    [[[1],[1],[1],[1]],[[1,1,1,1]]],
    [[[1,0],[1,0],[1,1]],[[1,1,1],[1,0,0]],[[1,1],[0,1],[0,1]],[[0,0,1],[1,1,1]]],
    [[[0,1],[0,1],[1,1]],[[1,0,0],[1,1,1]],[[1,1],[1,0],[1,0]],[[1,1,1],[0,0,1]]],
    [[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],
    [[[1,1],[1,1]]] */
  ]
}



//블럭 생성용
function Block(){
  rand = Math.random()*1000000
  n = Math.floor(rand%7)
  id = count + 1
  shape = blocks.shape[n]
//  now = Math.floor(rand%shape.length)
  count += 1



  this.id = id
  this.x = Math.floor(rand%(GAME_WIDTH - Math.max.apply(null,shape.flat(Infinity))))
  this.y = -Math.max.apply(null, shape.flat(Infinity)) -1 //- shape/* [now] */.length
  this.type = blocks.type[n]
  this.color = blocks.color[n]
  this.shape = shape
//  this.now = now
}

function drawNext(){
  ctx2.fillStyle = "#FFF"
  ctx2.fillRect(0,0,Next_BLOCK_WINDOW*BLOCK_SIZE, Next_BLOCK_WINDOW*BLOCK_SIZE)
  ctx2.fillStyle = block_next.color
  for(n in block_next.shape) {
    x = block_next.shape[n][1] + 1
    y = block_next.shape[n][0] + 1
    ctx2.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE,BLOCK_SIZE)
  }
}

//블럭 동작
Block.prototype.draw = function (ctx) {
  //ctx.save()
  ctx.fillStyle = this.color
  for(n in this.shape){
    x = this.x + this.shape[n][1]
    y = this.y + this.shape[n][0] 
    if(y>-1){
      board[y + GAME_MARGIN_TOP][x + GAME_PADDING] = this.id
      ctx.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }
  }
  //ctx.restore()
}

Block.prototype.erase = function (ctx) {
  //ctx.save()
  ctx.fillStyle = "#FFF"
  for(n in this.shape){
    x = this.x + this.shape[n][1]
    y = this.y + this.shape[n][0]
    if(y>-1){
      board[y + GAME_MARGIN_TOP][x + GAME_PADDING] = 0
      ctx.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }  
  }
  //ctx.restore()
}


Block.prototype.down = function(ctx) {
  result = true
  this.erase(ctx)
  for(n in this.shape){
    x = this.x + this.shape[n][1]
    y = this.y + this.shape[n][0] + 1
    if(typeof board[y + GAME_MARGIN_TOP] == "undefined" || typeof board[y + GAME_MARGIN_TOP][x+ GAME_PADDING] == "undefined" ||  board[y + GAME_MARGIN_TOP][x+ GAME_PADDING]  != 0){
      result = false
    }
  }
  this.y += result? 1 : 0
  this.draw(ctx)
  return result
}

Block.prototype.right = function(ctx) {
  result = true
  this.erase(ctx)
  for(n in this.shape){
    x = this.x + this.shape[n][1] + 1
    y = this.y + this.shape[n][0]
    if(typeof board[y + GAME_MARGIN_TOP] == "undefined" || typeof board[y + GAME_MARGIN_TOP][x+ GAME_PADDING] == "undefined" ||  board[y + GAME_MARGIN_TOP][x+ GAME_PADDING]  != 0){
      result = false
    }
  }
  this.x += result? 1 : 0
  this.draw(ctx)
  return result
}

Block.prototype.left = function(ctx) {
  result = true
  this.erase(ctx)
  for(n in this.shape){
    x = this.x + this.shape[n][1] - 1
    y = this.y + this.shape[n][0]
    if(typeof board[y + GAME_MARGIN_TOP] == "undefined" || typeof board[y + GAME_MARGIN_TOP][x+ GAME_PADDING] == "undefined" ||  board[y + GAME_MARGIN_TOP][x+ GAME_PADDING]  != 0){
      result = false
    }
  }
  this.x += result? -1 : 0
  this.draw(ctx)
  return result
}

Block.prototype.land = function(ctx) {
  result = true
  while(result){
    result = this.down(ctx)
  }
}

Block.prototype.rotate = function(ctx) {
  result = true
  sub_block = []
  size = Math.max.apply(null,this.shape.flat(Infinity)) //+ 1
  this.erase(ctx)
  /* for(n=0;n<this.shape.length;n++){
    sub_block[n] = []
    for(m=0;m<this.shape[n].length;m++){
      sub_block[n][m] =this.shape[m][size-n //-1]
    }
  } */
  for(n in this.shape){
    x = this.x + size /* - 1 */ - this.shape[n][0]
    y = this.y + this.shape[n][1]
    console.log([y,x])
    sub_block[n] = [this.shape[n][1], size /* - 1 */ - this.shape[n][0]]
    if(typeof board[y + GAME_MARGIN_TOP] == "undefined" || typeof board[y + GAME_MARGIN_TOP][x+ GAME_PADDING] == "undefined" || board[y + GAME_MARGIN_TOP][x+ GAME_PADDING]  != 0) {
      result = false
    }
  }


  if(result) {
    for(n in this.shape){
      this.shape[n] = sub_block[n]
    }
  }

  this.draw(ctx)

  /* //ctx.save()
  ctx.translate((this.x+1)*BLOCK_SIZE,(this.y+1)*BLOCK_SIZE)
  ctx.rotate(-Math.PI/2)
  ctx.translate(-BLOCK_SIZE,-BLOCK_SIZE)
  for(n in this.shape){
    x = this.x + shape[n][1]
    y = this.y + shape[n][0]
    if(typeof board[y] == "undefined" || typeof board[y][x] == "undefined" || board[y][x] != 0){
      result = false
      break
    }
  }
  this.y += result? 1 : 0
  this.draw(ctx)
  //ctx.restore() */
  return result
}

//게임 실행
var timer = 1
function play() {
  timer += 1
  gameOver = false
  result = true
  if(timer%GAME_LEVEL == 0){
    result = block_now.down(ctx)
    if(result == false){
      checkRow()
      now += 1
      history[count] = new Block()
      forTest = block_now
      block_now = history[now]
      block_next = history[now + 1]
      drawNext()
      console.log(result)
      for(n in forTest.shape) {
        x = forTest.x + forTest.shape[n][1]
        y = forTest.y + forTest.shape[n][0]
        if(typeof board[y] == "undefined" || typeof board[y][x] =="undefined"){ //forTest.shape[n][0] + forTest.y < GAME_MARGIN_TOP){
          gameOver = true
        }
      }
      if(gameOver){
        alert("게임 오버!")
        HIGH_SCORE = SCORE > HIGH_SCORE ? SCORE : HIGH_SCORE
        //high_score_now.innerText = HIGH_SCORE
        cancelAnimationFrame(playing)
        stop()
      }
    }
  }
  cancelAnimationFrame(playing)
  if(gameOver == false){
    
    playing = requestAnimationFrame(play)
  }
  return result
}


var imageData
function checkRow() {
  clearedRow = []
  for(n=0;n<GAME_HEIGHT;n++){
    result = true
    for(m=0;m<GAME_WIDTH;m++){
      if(board[n + GAME_MARGIN_TOP][m + GAME_PADDING] == 0){
        result = false
      }
    }
    if(result) {
      clearedRow.push(n)
      SCORE += 1
//      score_now.innerText = SCORE
      ctx.fillStyle = "#FFF"
      ctx.fillRect(0,n*BLOCK_SIZE,GAME_WIDTH*BLOCK_SIZE,BLOCK_SIZE)
      for(m=0;m<GAME_WIDTH;m++){
        board[n + GAME_MARGIN_TOP][m + GAME_PADDING] = 0
        //ctx.save()
        
        //ctx.restore()
      }
    }
  }
  for(l=0;l<clearedRow.length;l++){
    for(n=clearedRow[l];n>0;n--){
      for(m=0;m<GAME_WIDTH;m++){
        board[n + GAME_MARGIN_TOP][m + GAME_PADDING] = board[n - 1 + GAME_MARGIN_TOP][m + GAME_PADDING]
        board[n - 1 + GAME_MARGIN_TOP][m + GAME_PADDING] = 0
      }
    }
    imageData = ctx.getImageData(0,0,GAME_WIDTH*BLOCK_SIZE,clearedRow[l]*BLOCK_SIZE)
    ctx.fillStyle = "#FFF"
    ctx.fillRect(0, 0, GAME_WIDTH*BLOCK_SIZE,clearedRow[l]*BLOCK_SIZE)
    ctx.putImageData(imageData, 0, BLOCK_SIZE)
  }
}

//다시 시작
function playAgain() {
  cancelAnimationFrame(playing)
  count = 0
  now = 0
  score = 0
  history = []
  setBoard()

  //ctx.save()
  ctx.fillStyle = "#FFF"
  ctx.fillRect(0,0,GAME_WIDTH*BLOCK_SIZE,GAME_HEIGHT*BLOCK_SIZE)
  //ctx.restore()

  history[count] = new Block()
  history[count] = new Block()

  block_now = history[now]
  block_next = history[now + 1]

  playing = requestAnimationFrame(play)
}


/* var block = {
  id: 1,
  x: 3,
  y: 0,
  shape: [
    //[0,0,0,0],
    [1,1,1,1]
    //[0,0,0,0],
    //[0,0,0,0]
  ]
} */




window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame || 
  window.oRequestAnimationFrame || 
  window.msRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000 / 60); };
})()