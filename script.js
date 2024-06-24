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
      case "waves":
        generateWaves(color);
        break;
    }
  };
});
