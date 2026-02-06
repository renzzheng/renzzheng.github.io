let showBear = false;

const container = document.getElementById("model-container");
const bear = document.getElementById("bear");

container.addEventListener("click", toggle);
bear.addEventListener("click", toggle);

function toggle() {
  showBear = !showBear;

  if (showBear) {
    container.style.opacity = "0";
    container.style.pointerEvents = "none";

    bear.style.opacity = "1";
    bear.style.pointerEvents = "auto";
  } else {
    container.style.opacity = "1";
    container.style.pointerEvents = "auto";

    bear.style.opacity = "0";
    bear.style.pointerEvents = "none";
  }
}
