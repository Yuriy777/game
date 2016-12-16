document.addEventListener('DOMContentLoaded', function() {
  var box = document.getElementById('box'),
  ball = document.getElementById('ball'),
  bridge = document.getElementById('bridge'),
  score = document.getElementById('score'),
  press = document.getElementById('press'),
  stop = document.getElementById('stop'),
  boxXY = box.getBoundingClientRect(),
  bridg1 = bridge.getBoundingClientRect(),
  ball1 = ball.getBoundingClientRect(),
  ballLeft1 = 2 * Math.tan(Math.PI - (Math.PI * 3 / 4)), //угол отклонения мяча
  ballTop1 = 2 * Math.tan(Math.PI * 3 / 4),//угол отклонения мяча
  scoreFirst = 0,
  setIntJump,
  setIntScore,
  i = 0,
  res = document.getElementById('res'),
  speed = 10; // скорость движения мяча значения от 0 до 20. 0 - быстро, 20 - медленною

  document.addEventListener('keydown', (event) => { // перемещение каретки и запуск
      var bridgeX = bridge.offsetLeft;
      i;
    if (event.keyCode == 39) {// движение каретки вправо
      if ((bridgeX + 106 +25) >= 480) {
        bridge.style.left = (480 - 106) + "px"
      }
      else {
        bridge.style.left = (bridgeX + 15) + "px";
      }
    } 
    else if (event.keyCode == 37) {// движение каретки влево
      if (bridgeX <= 10) {
        bridge.style.left = 0 + "px";
      }
      else {
        bridge.style.left = (bridgeX - 15) + "px";
      }
    }
    else if (event.keyCode == 13) { // пуск
      delayedAlert();
      press.style.display = "none";
      i++;
    }
    if ( i == 0 && event.keyCode == 37) { // движение каретки влево с мячем
      if (bridgeX <= 10) {
        ball.style.left = ball.offsetLeft + "px";
      }
      else {
        ball.style.left = ball.offsetLeft - 15 + "px";
      }
    }
    if (i ==0 && event.keyCode == 39) {// движение каретки вправо с мячем
      if ((bridgeX  + 106 +25) >= boxXY.width) {
        ball.style.left = ball.offsetLeft + "px";
      }
      else {
        ball.style.left = ball.offsetLeft + 15 + "px";
      }
    }
  }, false);

  function delayedAlert() { //timer on
    if (i > 0){
      return;
    }
    else {
      setIntJump = window.setInterval(ballJumping, speed);
      setIntScore = window.setInterval(scoreGame, 500);
    }
    i++;
  };
  function clearAlert() { //timer off
    window.clearInterval(setIntScore);
    window.clearInterval(setIntJump);
  }
  function scoreGame() { // счетчик счета
    score.innerHTML = scoreFirst;
    scoreFirst += 10;
  };
  function ballJumping () { // описывает поведение мяча
    var ballLeft = ball.offsetLeft,
        ballTop = ball.offsetTop,
        bridgeX = bridge.offsetLeft;
     if ((ballLeft + 30) >= 480) {//поведение мяча при ударе о правую стенку
      ballLeft1 = - ballLeft1;
      ball.style.left = ballLeft - ballLeft1 + "px";
     }
     if (ballLeft <= 1 ) {//поведение мяча при ударе о левую стенку
      ballLeft1 = - ballLeft1;
      ball.style.left = ballLeft - ballLeft1 + "px";
     }
     else if (ballTop <=1) {//поведение мяча при ударе о верхнюю стенку
      ballTop1 = - ballTop1;
      ball.style.top = ballTop + ballTop1 + "px";
     }
     else if (ballTop >= 567) {//поведение мяча при ударе о нижнюю стенку
       stop.style.display = "block";
       clearAlert();
      return;
     }
     //поведение мяча при ударе о каретку
    else if (bridgeX < (ballLeft + 30) && (bridgeX + 106) > ballLeft && 535 < ballTop && ballTop < 540){
      ballTop1 = - ballTop1;
      ball.style.top = ballTop + ballTop1 + "px";
    }
    else {
      ball.style.left = ballLeft - ballLeft1 + "px";
      ball.style.top = ballTop + ballTop1 + "px";
    }
    i++;
  };
  res.addEventListener('click', function(event){
  	document.location.reload(false);
  });
});

