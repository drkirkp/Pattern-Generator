document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("patternCanvas");
  const ctx = canvas.getContext("2d");

  function generateStripes(color) {
    const stripeWidth = 20;
    for (let i = 0; i < canvas.width; i += stripeWidth * 2) {
      ctx.fillStyle = color;
      ctx.fillRect(i, 0, stripeWidth, canvas.height);
    }
  }

  function generateDots(color) {
    const dotRadius = 10;
    const dotSpacing = 30;
    for (let y = dotRadius; y < canvas.height; y += dotSpacing) {
      for (let x = dotRadius; x < canvas.width; x += dotSpacing) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function generateGrid(color) {
    const gridSize = 20;
    ctx.strokeStyle = color;
    for (let i = 0; i <= canvas.width; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  }

  function generateDiagonalLines(color) {
    const lineSpacing = 20;
    ctx.strokeStyle = color;
    for (let i = -canvas.height; i < canvas.width; i += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }
  }

  function generateCheckerboard(color) {
    const boxSize = 20;
    for (let y = 0; y < canvas.height; y += boxSize) {
      let isColored = (y / boxSize) % 2 === 0; // Alternate starting color each row
      for (let x = 0; x < canvas.width; x += boxSize) {
        ctx.fillStyle = isColored ? color : "#e0e0e0"; // Light gray for alternating color
        ctx.fillRect(x, y, boxSize, boxSize);
        isColored = !isColored;
      }
    }
  }

  function generateWaves(color) {
    const waveHeight = 20;
    const waveLength = 40;
    ctx.strokestyle = color;
    ctx.lineWidth = 2;
    for (let y = waveHeight / 2; y < canvas.height; y += waveHeight) {
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += waveLength) {
        ctx.quadraticCurveTo(
          x + waveLength / 4,
          y - waveHeight / 2,
          x + waveLength / 2,
          y
        );
        ctx.quadraticCurveTo(
          x + (3 * waveLength) / 4,
          y + waveHeight / 2,
          x + waveLength,
          y
        );
      }
      ctx.stroke();
    }
  }

  function generateGingham(color) {
    const boxSize = 20;
    const lighterColor = shadeColor(color, 0.5); // Lighter color
    const darkerColor = shadeColor(color, -0.5); // Darker color

    for (let y = 0; y < canvas.height; y += boxSize) {
      for (let x = 0; x < canvas.width; x += boxSize) {
        // Alternate colors in a true gingham pattern
        if ((x / boxSize) % 2 === 0 && (y / boxSize) % 2 === 0) {
          ctx.fillStyle = color; // Base color
        } else if ((x / boxSize) % 2 !== 0 && (y / boxSize) % 2 !== 0) {
          ctx.fillStyle = color; // Base color
        } else if ((x / boxSize) % 2 === 0 && (y / boxSize) % 2 !== 0) {
          ctx.fillStyle = lighterColor; // Lighter color
        } else {
          ctx.fillStyle = darkerColor; // Darker color
        }
        ctx.fillRect(x, y, boxSize, boxSize);
      }
    }
  }

  function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (1 + percent));
    G = parseInt(G * (1 + percent));
    B = parseInt(B * (1 + percent));

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    let RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    let GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    let BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  function generatePlusSign(color) {
    const size = 20; // Size of each pattern cell
    ctx.fillStyle = color;

    for (let y = 0; y < canvas.height; y += size * 4) {
      for (let x = 0; x < canvas.width; x += size * 4) {
        drawPlusSignTile(x, y, size);
        drawPlusSignTile(x + 2 * size, y + 2 * size, size);
      }
    }
  }

  function drawPlusSignTile(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x + 2 * size, y + size);
    ctx.lineTo(x + 2 * size, y + 2 * size);
    ctx.lineTo(x + size, y + 2 * size);
    ctx.lineTo(x + size, y + 3 * size);
    ctx.lineTo(x, y + 3 * size);
    ctx.lineTo(x, y + 2 * size);
    ctx.lineTo(x - size, y + 2 * size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fill();
  }

  window.generatePattern = function () {
    const color = document.getElementById("color").value;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    generatePlusSign(color);
  };

  window.generatePattern = function () {
    const color = document.getElementById("color").value;
    const style = document.getElementById("style").value;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (style) {
      case "stripes":
        generateStripes(color);
        break;
      case "dots":
        generateDots(color);
        break;
      case "grid":
        generateGrid(color);
        break;
      case "diagonalLines":
        generateDiagonalLines(color);
        break;
      case "checkerboard":
        generateCheckerboard(color);
        break;
      case "waves":
        generateWaves(color);
        break;
      case "gingham":
        generateGingham(color);
        break;
      case "plusSign":
        generatePlusSign(color);
    }
  };
});
