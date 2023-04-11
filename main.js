const $ = e => document.querySelector(e);

function random(num) {
  return Math.trunc(Math.random() * num);
}

function fillBalls(balls) {
  const div = $('.balls');
  div.innerHTML = '';

  balls.forEach(i => {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.innerText = i;
    div.appendChild(ball)
  });

  const ballsOut = $('.balls-out');
  let height = Math.floor((balls.length+1) / 5) * 46;
  if(div.offsetHeight && height > div.offsetHeight) height = div.offsetHeight;
  ballsOut.style.height = height + 'px';
}

function addBall(num) {
  const div = $('.balls-out');
  const ball = document.createElement('div');
  ball.classList.add('ball-out');
  ball.innerText = num;
  div.appendChild(ball);
}

function getBall(balls) {
  const total = balls.length;
  const r = random(total);
  addBall( balls[r] );
  balls.splice(r, 1);
  fillBalls(balls);
}

$('.generate').addEventListener('click', e => {
  e.target.disabled = true;
  let num = $('#number').value;
  const total = $('#total').value;
  const balls = new Array(total);
  for(let i=0; i<total; ++i) balls[i] = i+1; 
  $('.balls-out').innerHTML = '';
  fillBalls(balls);
  const timer = setInterval(() => {
    if(num) {
      getBall(balls);
      --num;
    }
    else {
      clearInterval(timer);
      e.target.disabled = false;
    }
  }, 3000);
});
