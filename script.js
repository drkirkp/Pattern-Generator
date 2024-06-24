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

  window.generatePattern = function () {
    const color = document.getElementById("color").value;
    const style = document.getElementById("style").value;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (style === "stripes") {
      generateStripes(color);
    } else if (style === "dots") {
      generateDots(color);
    }
  };
});
