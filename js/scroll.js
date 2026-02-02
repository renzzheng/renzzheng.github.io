// thank you thilan 🙏
document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.querySelector(".scroll-arrow");
    if (!arrow) return;
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        arrow.style.opacity = "0";
        arrow.style.pointerEvents = "none";
      } else {
        arrow.style.opacity = "0.85";
        arrow.style.pointerEvents = "auto";
      }
    });
  });
  