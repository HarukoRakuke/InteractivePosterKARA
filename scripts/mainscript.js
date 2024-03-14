document.addEventListener('DOMContentLoaded', () => {
  // попапы
  const popups = document.querySelectorAll('.popup');
  popups[0].classList.add('show');

  popups.forEach((popup, index) => {
    popup.addEventListener('click', () => {
      popup.classList.remove('show');
      if (index < popups.length - 1) {
        popups[index + 1].classList.add('show');
        positionPopup(popups[index + 1]);
      }
    });
  });

  // Function to position popup randomly
  function positionPopup(popup) {
    popup.style.top = parseInt(Math.random() * 100) + 'vh';
    popup.style.left = parseInt(Math.random() * 100) + 'vw';
  }
  positionPopup(popups[0]);
  // анимация с соединением блоков
  var blanks = document.querySelectorAll('.blank');
  var out1sWithSpecificPosition = 0;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  blanks.forEach(function (blank) {
    var flag = blank.querySelector('.flag');
    var offsetFlag = randomInt(25, 40);
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
    var sliderWidth = sliderRect.width;

    slider.style.marginLeft = i * 3 + '%';

    if (out1) {
      var expectedPosition =
        parseInt(
          in1.getBoundingClientRect().right -
            slider.getBoundingClientRect().left -
            slider.offsetWidth / 6
        ) + 'px';

      var inRight = in1.getBoundingClientRect().right - sliderRect.left;
      var inWidth = in1.offsetWidth;

      panel.addEventListener('touchstart', down);

      out1.addEventListener('mousedown', down);

      function down(e) {
        if (e.type === 'mousedown') {
          document.addEventListener('mousemove', move);
          document.addEventListener('mouseup', up);
        }
        if (e.type === 'touchstart') {
          out1.style.transition = 'left 0.8s ease-in-out';
          console.log(in1.getBoundingClientRect().right);
          out1.style.left = expectedPosition;
          blueSpans.forEach(function (blueSpan, index) {
            if (index < 2) {
              blueSpan.style.animation = 'blinkwhite 1s forwards steps(1)';
            }
          });
          headersOutOf3.forEach(function (header, index) {
            if (index < 2)
              header.style.animation = 'blinkblue 1s forwards steps(1)';
          });
        }
      }

      function move(e) {
        out1.style.position = 'absolute';
        updatePosition(e.clientX);
      }

      function updatePosition(clientX) {
        var sliderRect = slider.getBoundingClientRect();
        var newLeft =
          in1.getBoundingClientRect().right + slider.offsetWidth / 6;
        if (clientX < newLeft) {
          out1.style.left = expectedPosition;
          document.removeEventListener('mousemove', move); // Remove the event listener after setting the position
          out1sWithSpecificPosition++;
        } else if (clientX >= sliderRect.right) {
          out1.style.left =
            sliderRect.right - sliderRect.left - out1.offsetWidth + 'px';
        } else {
          out1.style.left =
            clientX - sliderRect.left - out1.offsetWidth / 2 + 'px';
        }

        console.log(out1sWithSpecificPosition);
        // Check if at least 8 out1 elements have the specific position

        if (out1sWithSpecificPosition >= 8) {
          blueSpans.forEach(function (blueSpan, index) {
            if (index < 2) {
              blueSpan.style.animation = 'blinkwhite 1s forwards steps(1)';
            }
          });
          headersOutOf3.forEach(function (header, index) {
            if (index < 2)
              header.style.animation = 'blinkblue 1s forwards steps(1)';
          });
        }
      }

      function up() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      }
    }
  });
  // анимация с вентилями
  var valves = document.querySelectorAll('.valve');
  valves.forEach(function (valve, index) {
    var center = valve.querySelector('.center');
    center.addEventListener('click', click);
    function click(e) {
      valve.classList.add('pause');
    }
  });
  // анимация с графиком
  var canvas = document.querySelector('#plot');
  var ctx = canvas.getContext('2d');
  var a = 1;

  // Define the function
  function f(x) {
    // Solve for y using numerical methods (e.g., Newton's method)
    return Math.sin(a * x) * 5;
  }

  // Increase canvas resolution
  canvas.width = 1200; // Adjust the width as needed
  canvas.height = 800; // Adjust the height as needed

  // Adjust scaling factors for higher resolution
  var scaleX = canvas.width / 20; // Adjust as needed
  var scaleY = canvas.height / 20; // Adjust as needed
  var offsetX = canvas.width / 2; // x-axis offset from left
  var offsetY = canvas.height / 1.6; // y-axis offset from top

  // Draw function with anti-aliasing
  function drawFunction() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Plot the function with anti-aliasing
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 12; // Reduce line width for better rendering
    for (var pixelX = 0; pixelX < canvas.width; pixelX++) {
      var x = (pixelX - offsetX) / scaleX;
      var y = f(x);
      var pixelY = y * scaleY + offsetY;
      // Use moveTo instead of lineTo for smoother lines
      if (pixelX === 0) {
        ctx.moveTo(pixelX, pixelY);
      } else {
        ctx.lineTo(pixelX, pixelY);
      }
    }
    ctx.stroke();
  }

  // Initial draw
  drawFunction();

  // Add event listener for scaling using the mouse wheel
  canvas.addEventListener('wheel', function (event) {
    event.preventDefault();
    var delta = event.deltaY;
    if (delta < 0 && a < 3) {
      // Zoom in
      a *= 1.1; // эквивалетно scaleX = scaleX * 1.1
    } else if (delta > 0 && a > 0.5) {
      // Zoom out
      a /= 1.1;
    }
    // Redraw function with new scale
    drawFunction();
  });

  let wrap = document.querySelector('.wrap');
  let screenOffset =
    document.querySelector('#firstscreen').offsetHeight +
    document.querySelector('#secondscreen').offsetHeight;
  let container = document.getElementById('container');
  let squares = document.querySelectorAll('.square');
  let lineDivs = document.querySelectorAll('.lineDiv');
  let isDragging = false;

  squares[1].addEventListener('mousedown', handleMouseDown);

  function handleMouseDown(e) {
    isDragging = true;
    updateLine(e.pageX, e.pageY);
  }

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateLine(e.pageX, e.pageY);
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDragging) {
      isDragging = false;
      let targetSquare = squares[1 + 1];

      if (
        e.pageX - wrap.getBoundingClientRect().left > targetSquare.offsetLeft &&
        e.pageX - wrap.getBoundingClientRect().left <
          targetSquare.offsetLeft + targetSquare.offsetWidth &&
        e.pageY - screenOffset > targetSquare.offsetTop &&
        e.pageY - screenOffset <
          targetSquare.offsetTop + targetSquare.offsetHeight
      ) {
        setInterval(connectSquares, 1);
      } else {
        lineDivs[1].style.width = '0';
      }
    }
  });

  function updateLine(pageX, pageY) {
    let squares = document.querySelectorAll('.square');
    let square = squares[1];
    x1 =
      square.offsetLeft +
      square.offsetWidth / 2 +
      wrap.getBoundingClientRect().left;
    y1 = square.offsetTop + square.offsetHeight / 2;
    console.log(pageX, pageY - screenOffset);
    const distance = Math.sqrt(
      Math.pow(pageX - x1, 2) + Math.pow(pageY - screenOffset - y1, 2)
    );
    lineDivs[1].style.left = x1 + 'px';
    lineDivs[1].style.top = y1 + 'px';
    lineDivs[1].style.width = distance + 'px';
    lineDivs[1].style.transform = `rotate(${Math.atan2(
      pageY - screenOffset - y1,
      pageX - x1
    )}rad)`;
  }

  function connectSquares() {
    let squares = document.querySelectorAll('.square');
    let square = squares[1];
    let targetSquare = squares[1 + 1];
    let x1 =
      square.offsetLeft +
      square.offsetWidth / 2 +
      wrap.getBoundingClientRect().left;
    let y1 = square.offsetTop + square.offsetHeight / 2;
    let x2 =
      targetSquare.offsetLeft +
      targetSquare.offsetWidth / 2 +
      wrap.getBoundingClientRect().left;
    let y2 = targetSquare.offsetTop + targetSquare.offsetHeight / 2;

    lineDivs[1].style.left = x1 + 'px';
    lineDivs[1].style.top = y1 + 'px';

    const distance1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    lineDivs[1].style.width = distance1 + 'px';
    lineDivs[1].style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;

    square.removeEventListener('mousedown', handleMouseDown);
  }

  squares.forEach((square, index) => {
    moveSquare(square, index);
  });

  function moveSquare(square, index) {
    let posX = Math.random() * (container.offsetWidth - square.offsetWidth);
    let posY = Math.random() * (container.offsetHeight - square.offsetHeight);

    let deltaX = (Math.random() - 0.5) * 2;
    let deltaY = (Math.random() - 0.5) * 2;

    const speed = 2;

    setInterval(() => {
      const container = document.getElementById('container');

      posX += deltaX * speed;
      posY += deltaY * speed;

      if (posX < 0 || posX > container.offsetWidth - square.offsetWidth) {
        deltaX *= -1;
      }

      if (posY < 0 || posY > container.offsetHeight - square.offsetHeight) {
        deltaY *= -1;
      }

      square.style.top = Math.round(posY) + 'px';
      square.style.left = Math.round(posX) + 'px';
      if (
        posX < 0 - square.offsetWidth ||
        posX > container.offsetWidth + square.offsetWidth
      ) {
        posX = Math.random() * (container.offsetWidth - square.offsetWidth);
      }
      if (posY < 0 - square.offsetWidth || posY > container.offsetHeight) {
        posY = Math.random() * (container.offsetWidth - square.offsetWidth);
      }
      updateLine();
    }, 3);
  }

  document
    .querySelector('.signal_box')
    .addEventListener('mouseover', function () {
      document.querySelector('.arrow svg path').style.fill = 'white';
    });

  document
    .querySelector('.signal_box')
    .addEventListener('mouseout', function () {
      document.querySelector('.arrow svg path').style.fill = 'black';
    });
});
