// adapted from @simonlejeune's SparklesText into HTML/CSS/JS

document.addEventListener("DOMContentLoaded", () => {
    const layer = document.querySelector(".sparkle-layer");
    if (!layer) return;
  
    const MAX_SPARKLES = 8;
  
    function createSparkle() {
      if (layer.children.length >= MAX_SPARKLES) return;
  
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
  
      sparkle.style.left = Math.random() * 100 + "%";
      sparkle.style.top = Math.random() * 100 + "%";
      sparkle.style.animationDelay = Math.random() * 1.5 + "s";
  
      sparkle.innerHTML = `
        <svg viewBox="0 0 21 21" aria-hidden="true">
          <path d="M9.8 0.8c.2-.6 1.1-.6 1.3 0l.7 1.9c.5 1.5.5 3.7 1.7 4.9
            1.2 1.2 3.4 1.2 4.9 1.7l1.9.7c.6.2.6 1.1 0 1.3l-1.9.7
            c-1.5.5-3.7.5-4.9 1.7-1.2 1.2-1.2 3.4-1.7 4.9l-.7 1.9
            c-.2.6-1.1.6-1.3 0l-.7-1.9c-.5-1.5-.5-3.7-1.7-4.9
            -1.2-1.2-3.4-1.2-4.9-1.7l-1.9-.7c-.6-.2-.6-1.1 0-1.3
            l1.9-.7c1.5-.5 3.7-.5 4.9-1.7 1.2-1.2 1.2-3.4 1.7-4.9l.7-1.9z"/>
        </svg>
      `;
  
      layer.appendChild(sparkle);
  
      setTimeout(() => sparkle.remove(), 1200);
    }
  
    setInterval(createSparkle, 300);
  });
  