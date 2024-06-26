const state = {
  mouseDown: false,
  currentCircle: 0,
  linesShow: [false, false, false, false],
};

function resetState() {
  state.mouseDown = false;
  state.currentCircle = 0;
}

function resetLinesShow() {
  state.linesShow = [false, false, false, false];
}

function resetElements() {
  var out1Elements = document.querySelectorAll('.plugout');

  out1Elements.forEach(function (out1) {
    out1.style.removeProperty('left');
  });
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calcAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function getElementCors(element) {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x,
    y,
    width,
    height,
  };
}

function createCircles(quantity) {
  const circlesSection = document.getElementById('circlesSection');

  for (let index = 0; index < quantity; index++) {
    const circleElement = document.createElement('div');
    circleElement.classList.add('circle');
    circleElement.innerText = index + 1;
    circlesSection.appendChild(circleElement);

    initCircle(circleElement);
  }
}

function initDocument() {
  document.addEventListener('mousemove', (e) => {
    if (state.mouseDown === true) {
      drawLine(e);
    }
  });

  document.addEventListener('mouseup', () => {
    resetState();
    eraseLine();
  });
}

function initCircles() {
  const circles = document.getElementsByClassName('circle');

  for (let index = 0; index < circles.length; index++) {
    const circleElement = circles[index];
    initCircle(circleElement);
  }
}

function initCircle(circleElement) {
  const { width, height } = circleElement.getBoundingClientRect();

  const sectionWidth = circlesSection.getBoundingClientRect().width;
  const sectionHeight = circlesSection.getBoundingClientRect().height;

  circleElement.style.top = `${getRandomArbitrary(
    0,
    sectionHeight - height
  )}px`;
  circleElement.style.left = `${getRandomArbitrary(0, sectionWidth - width)}px`;

  circleElement.addEventListener('mousedown', (e) => {
    state.mouseDown = true;
    state.currentCircle = Number(e.target.id.slice(-1));
  });

  circleElement.addEventListener('mouseup', (e) => {
    if (state.currentCircle + 1 === Number(e.target.id.slice(-1))) {
      state.linesShow[state.currentCircle - 1] = true;
    }

    if (state.currentCircle - 1 === Number(e.target.id.slice(-1))) {
      state.linesShow[state.currentCircle - 2] = true;
    }

    if (
      state.linesShow[0] &&
      state.linesShow[1] &&
      state.linesShow[2] &&
      state.linesShow[3]
    ) {
      const circlesBlink = document.querySelectorAll('.circle');
      circlesBlink.forEach((circleBlink) => {
        circleBlink.classList.add('circleAnimation');
      });
      setTimeout(resetLinesShow, 5000);
      setTimeout(eraseLines, 5000);
      setTimeout(removeAnimation, 5000);
    }

    resetState();
  });
}

function removeAnimation() {
  const circlesBlink = document.querySelectorAll('.circle');
  circlesBlink.forEach((circleBlink) => {
    circleBlink.classList.remove('circleAnimation');
  });
}

function mobileCatchCircle() {
  let circles = document.querySelectorAll('.circle');
  circles.forEach((circle) => {
    circle.addEventListener('touchstart', (event) => {
      console.log('Touchstart event started');
      state.linesShow[0] = true;
      state.linesShow[1] = true;
      state.linesShow[2] = true;
      state.linesShow[3] = true;
    });
  });
}

function drawLine(e) {
  const screenOffset =
    document.querySelector('#firstscreen').offsetHeight +
    document.querySelector('#secondscreen').offsetHeight;
  const currentCircleElement = document.getElementById(
    `circle_${state.currentCircle}`
  );

  const line = document.querySelector('.line');

  const circlesSections = document.querySelector('#circlesSection');

  const { x, y, width, height } = currentCircleElement.getBoundingClientRect();

  const x1 = x + width / 2;
  const y1 = currentCircleElement.offsetTop + height / 2;

  const x2 = e.pageX;
  const y2 = e.pageY - screenOffset;

  const distance = calcDistance(x1, y1, x2, y2);
  const angle = calcAngle(x1, y1, x2, y2);

  line.style.top = `${y1}px`;
  line.style.left = `${x1}px`;
  line.style.width = `${distance}px`;
  line.style.transform = `rotate(${angle}rad)`;
}

function eraseLine() {
  const line = document.querySelector('.line');
  line.style.width = 0;
}

function eraseLines() {
  let lines = document.querySelectorAll('.line');
  lines.forEach((line) => {
    line.classList.add('wiggle');
    setTimeout(function () {
      line.style.width = '0px';
      line.classList.remove('wiggle');
    }, 3000);
  });
}

function drawLines() {
  state.linesShow.forEach((lineState, index) => {
    if (lineState === true) {
      const lineElement = document.getElementById(`line_${index + 1}`);

      const circleFrom = document.getElementById(`circle_${index + 1}`);
      const circleTo = document.getElementById(`circle_${index + 2}`);

      const x1 =
        circleFrom.getBoundingClientRect().left + circleFrom.offsetWidth / 2;
      const y1 = circleFrom.offsetTop + circleFrom.offsetHeight / 2;

      const x2 =
        circleTo.getBoundingClientRect().left + circleTo.offsetWidth / 2;
      const y2 = circleTo.offsetTop + circleTo.offsetHeight / 2;

      const distance = calcDistance(x1, y1, x2, y2);
      const angle = calcAngle(x1, y1, x2, y2);

      lineElement.style.top = `${y1}px`;
      lineElement.style.left = `${x1}px`;
      lineElement.style.width = `${distance}px`;
      lineElement.style.transform = `rotate(${angle}rad)`;
    }
  });
}

function moveCircles(circles) {
  for (let index = 0; index < circles.length; index++) {
    const circleElement = circles[index];
    const { width, height } = circleElement.getBoundingClientRect();

    const sectionWidth = circlesSection.getBoundingClientRect().width;
    const sectionHeight = circlesSection.getBoundingClientRect().height;

    circleElement.style.top = `${getRandomArbitrary(
      0,
      sectionHeight - height
    )}px`;

    circleElement.style.left = `${getRandomArbitrary(
      0,
      sectionWidth - width
    )}px`;
  }
}

function cycle() {
  const circles = document.getElementsByClassName('circle');

  setInterval(() => {
    drawLines();
  }, 1000 / 60);

  moveCircles(circles);

  setInterval(() => {
    moveCircles(circles);
  }, 5000);
}

function popupSequence() {
  const popups = document.querySelectorAll('.popup');
  popups[0].classList.add('show');

  popups.forEach((popup, index) => {
    positionPopup(popups[0]);
    popup.addEventListener('click', () => {
      popup.classList.remove('show');
      if (index < popups.length - 1) {
        popups[index + 1].classList.add('show');
        positionPopup(popups[index + 1]);
      }
    });
  });
}

function positionPopup(popup) {
  let section = document.querySelector('#firstscreen');
  const screenWidth = section.getBoundingClientRect().width;
  const screenHeight = section.getBoundingClientRect().height;
  const { width, height } = popup.getBoundingClientRect();

  const widthRange = screenWidth - width;
  const heightRange = screenHeight - height;

  popup.style.top = getRandomArbitrary(0, heightRange) + 'px';
  popup.style.left = getRandomArbitrary(0, widthRange) + 'px';
}

function connectBlocksWithEachOther() {
  var blanks = document.querySelectorAll('.blank');
  var out1sWithSpecificPosition = 0;

  blanks.forEach(function (blank) {
    var flag = blank.querySelector('.flag');
    var offsetFlag = getRandomArbitrary(25, 40);
    flag.style.width = offsetFlag + '%';
    flag.style.transform = `translate(${offsetFlag}%)`;
  });

  var sliders = document.querySelectorAll('.slider');
  var panel = document.querySelector('.panel');
  var blueSpans = document.querySelectorAll('.bluespan');
  var headersOutOf3 = document.querySelectorAll('.headeroutof3');

  sliders.forEach(function (slider, i) {
    var in1 = slider.querySelector('.plugin');
    var out1 = slider.querySelector('.plugout');

    var sliderRect = slider.getBoundingClientRect();

    slider.style.marginLeft = i * 3 + '%';

    if (out1) {
      var expectedPosition =
        parseInt(
          in1.getBoundingClientRect().right -
            slider.getBoundingClientRect().left -
            slider.offsetWidth / 6
        ) + 'px';

      out1.addEventListener('touchstart', down);
      out1.addEventListener('mousedown', down);

      let out1Clicked = false;

      function down(e) {
        if (e.type === 'mousedown') {
          document.addEventListener('mousemove', move);
          document.addEventListener('mouseup', up);
        }
        if (e.type === 'touchstart') {
          out1.style.transition = 'left 0.8s ease-in-out';
          lastClickedOut1 = e.target;
          out1.style.left = expectedPosition;
          if (!out1Clicked) {
            out1Clicked = true;
            out1sWithSpecificPosition++;
          }
          completeConnection();
        }
      }

      function move(e) {
        out1.style.position = 'absolute';
        updatePosition(e.clientX);
      }

      function completeConnection() {
        console.log(out1sWithSpecificPosition);
        if (out1sWithSpecificPosition >= 8) {
          blueSpans[0].classList.remove('blinkwhite');
          headersOutOf3[0].classList.remove('blinkblue');
          blueSpans[1].classList.remove('blinkwhite');
          headersOutOf3[1].classList.remove('blinkblue');
          setTimeout(() => {
            blueSpans[0].classList.add('blinkwhite');
            headersOutOf3[0].classList.add('blinkblue');
            blueSpans[1].classList.add('blinkwhite');
            headersOutOf3[1].classList.add('blinkblue');
          }, 0);
          setTimeout(function resetCount() {
            out1sWithSpecificPosition = 0;
          }, 1);
          out1.removeEventListener('touchstart', down);
          out1.removeEventListener('mousedown', down);

          setTimeout(resetElements, 5000);
          setTimeout(connectBlocksWithEachOther, 5000);
        }
      }

      function updatePosition(clientX) {
        var sliderRect = slider.getBoundingClientRect();
        var newLeft =
          in1.getBoundingClientRect().right + slider.offsetWidth / 6;
        if (clientX < newLeft) {
          out1.style.left = expectedPosition;
          document.removeEventListener('mousemove', move);
          if (!out1Clicked) {
            out1Clicked = true;
            out1sWithSpecificPosition++;
          }
        } else if (clientX >= sliderRect.right) {
          out1.style.left =
            sliderRect.right - sliderRect.left - out1.offsetWidth + 'px';
        } else {
          out1.style.left =
            clientX - sliderRect.left - out1.offsetWidth / 2 + 'px';
        }

        completeConnection();
      }

      function up() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }
    }
  });
}

function resizeConnection() {
  window.addEventListener('resize', function () {
    var sliders = document.querySelectorAll('.slider');
    sliders.forEach(function (slider, i) {
      var in1 = slider.querySelector('.plugin');
      var out1 = slider.querySelector('.plugout');

      if (out1) {
        var expectedPosition =
          parseInt(
            in1.getBoundingClientRect().right -
              slider.getBoundingClientRect().left -
              slider.offsetWidth / 6
          ) + 'px';
        out1.style.left = expectedPosition;
      }
    });
  });
}

function click(e) {
  const valve = e.currentTarget.closest('.valve');
  let boost = parseInt(getRandomArbitrary(1, 4)) * 2;
  valve.style.animationDuration = `${boost}s`;
  if (boost > 2 && boost <= 8) {
    boost = boost - 2;
  } else if (boost <= 2) {
    boost = 8;
  } else if (boost > 8) {
    boost = 8;
  }
  valve.style.animationDuration = `${boost}s`;
  checkSpeed();
}

function pauseSpeed() {
  var valves = document.querySelectorAll('.valve');
  valves.forEach(function (valve, index) {
    let boost = parseInt(getRandomArbitrary(1, 4)) * 2;
    valve.style.animationDuration = `${boost}s`;
    var center = valve.querySelector('.center');
    center.addEventListener('click', click);
  });
}

function checkSpeed() {
  const valves = document.querySelectorAll('.valve');
  const valveAnimationDuration = [];

  valves.forEach((valve) => {
    const duration = parseInt(valve.style.animationDuration);
    valveAnimationDuration.push(duration);
  });

  const allEqual = (valveAnimationDuration) =>
    valveAnimationDuration.every((v) => v === valveAnimationDuration[0]);
  console.log(valveAnimationDuration);
  console.log(allEqual(valveAnimationDuration));
  if (allEqual(valveAnimationDuration)) {
    valves.forEach((valve) => {
      const center = valve.querySelector('.center');
      center.removeEventListener('click', click);
      setTimeout(pauseSpeed, 12000);
    });
    animationToggle();
  }
}
function animationToggle() {
  var blueSpans = document.querySelectorAll('.bluespan');
  var headersOutOf3 = document.querySelectorAll('.headeroutof3');

  blueSpans[2].classList.remove('blinkwhite');
  headersOutOf3[2].classList.remove('blinkblue');
  blueSpans[3].classList.remove('blinkwhite');
  headersOutOf3[3].classList.remove('blinkblue');
  setTimeout(() => {
    blueSpans[2].classList.add('blinkwhite');
    headersOutOf3[2].classList.add('blinkblue');
    blueSpans[3].classList.add('blinkwhite');
    headersOutOf3[3].classList.add('blinkblue');
  }, 0);
}

function animationToggle2() {
  var blueSpans = document.querySelectorAll('.bluespan');
  var headersOutOf3 = document.querySelectorAll('.headeroutof3');

  blueSpans[4].classList.remove('blinkwhite');
  headersOutOf3[4].classList.remove('blinkblue');
  blueSpans[5].classList.remove('blinkwhite');
  headersOutOf3[5].classList.remove('blinkblue');
  setTimeout(() => {
    blueSpans[4].classList.add('blinkwhite');
    headersOutOf3[4].classList.add('blinkblue');
    blueSpans[5].classList.add('blinkwhite');
    headersOutOf3[5].classList.add('blinkblue');
  }, 0);
}

function drawScheme() {
  var canvasScheme = document.querySelector('#overflowplot');
  var ctx = canvasScheme.getContext('2d');
  var b = Math.trunc(getRandomArbitrary(1, 4) * 10) / 10;
  console.log(`b - ${b}`);

  function f(x) {
    return Math.sin(b * x) * 5;
  }

  canvasScheme.width = 1200;
  canvasScheme.height = 800;

  var scaleX = canvasScheme.width / 20;
  var scaleY = canvasScheme.height / 20;
  var offsetX = canvasScheme.width / 2;
  var offsetY = canvasScheme.height / 1.6;

  function drawFunction() {
    ctx.clearRect(0, 0, canvasScheme.width, canvasScheme.height);

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.setLineDash([20, 10]);
    ctx.lineWidth = 12;

    for (var pixelX = 0; pixelX < canvasScheme.width; pixelX++) {
      var x = (pixelX - offsetX) / scaleX;
      var y = f(x);
      var pixelY = y * scaleY + offsetY;

      if (pixelX === 0) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
    }
    ctx.stroke();
  }
  drawFunction();
  drawGraph(b);
}

function drawGraph(b) {
  var canvas = document.querySelector('#plot');
  var ctx = canvas.getContext('2d');
  var a = 1;

  function f(x) {
    return Math.sin(a * x) * 5;
  }

  canvas.width = 1200;
  canvas.height = 800;

  var scaleX = canvas.width / 20;
  var scaleY = canvas.height / 20;
  var offsetX = canvas.width / 2;
  var offsetY = canvas.height / 1.6;

  function drawFunction() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 12;
    for (var pixelX = 0; pixelX < canvas.width; pixelX++) {
      var x = (pixelX - offsetX) / scaleX;
      var y = f(x);
      var pixelY = y * scaleY + offsetY;

      if (pixelX === 0) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
    }
    ctx.stroke();
  }

  drawFunction();

  function synchronize() {
    a = b;
    drawFunction();
    animationToggle2();
    canvas.removeEventListener('touchstart', synchronize);
  }

  function wheelFunction(event) {
    event.preventDefault();
    var delta = event.deltaY;

    if (delta < 0 && a < 4) {
      a *= 1.1;
    } else if (delta > 0 && a > 1) {
      a /= 1.1;
    }
    a = Math.trunc(a * 10) / 10;

    console.log(`a - ${a}`);

    console.log(`b - ${b}`); // Access b from drawScheme

    if (a === b) {
      animationToggle2();
      console.log('синхронизация');
      canvas.removeEventListener('wheel', wheelFunction);
    }
    drawFunction();
  }

  canvas.addEventListener('wheel', wheelFunction);
  canvas.addEventListener('touchstart', synchronize);
}

function clue() {
  let questions = document.querySelectorAll('.clue');
  let clue = document.querySelectorAll('.clue-popup');
  questions.forEach((question, index) => {
    question.addEventListener('click', function () {
      clue[index].classList.add('show');
      setTimeout(() => {
        clue[index].classList.remove('show');
      }, 1000);
    });
  });
}

function randomImageBackground() {
  let imageUrls = [
    'url("./img/cell1.svg")',
    'url("./img/cell2.svg")',
    'url("./img/cell3.svg")',
    'url("./img/cell4.svg")',
    'url("./img/cell5.svg")',
  ];

  let cells = document.querySelectorAll('.cell');

  function updateBackground() {
    for (let i = 0; i < 8; i++) {
      let randomCellIndex = Math.floor(Math.random() * cells.length);
      let randomImageIndex = Math.floor(Math.random() * imageUrls.length);
      let randomCell = cells[randomCellIndex];
      let randomImageUrl = imageUrls[randomImageIndex];
      randomCell.style.backgroundImage = randomImageUrl;
      setTimeout(() => {
        randomCell.style.backgroundImage = 'none';
      }, 1000);
    }
  }

  // Update background image every 5 seconds
  setInterval(updateBackground, 500);
}

function fillArrows() {
  let signalBoxs = document.querySelectorAll('.signal_box');
  signalBoxs.forEach((signalBox) => {
    signalBox.addEventListener('mouseover', function () {
      signalBox.querySelector('.arrow svg path').style.fill = 'white';
    });
    signalBox.addEventListener('mouseout', function () {
      signalBox.querySelector('.arrow svg path').style.fill = 'black';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  popupSequence();
  clue();
  initCircles();
  initDocument();
  mobileCatchCircle();
  cycle();
  connectBlocksWithEachOther();
  resizeConnection();
  pauseSpeed();
  drawScheme();
  setInterval(drawScheme, 5000);
  randomImageBackground();
  fillArrows();
});
