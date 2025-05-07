const container = document.getElementById("scrollContainer");
const dots = document.querySelectorAll(".dot");
const cards = container.querySelectorAll(".review-card");

function updateDots() {
  let closest = 0;
  let minDist = Infinity;

  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const center = window.innerWidth / 2;
    const cardCenter = rect.left + rect.width / 2;
    const dist = Math.abs(cardCenter - center);

    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
    card.classList.toggle("focused", dist < card.offsetWidth / 2);

    const leftArrow = card.querySelector(".card-arrow.left");
    const rightArrow = card.querySelector(".card-arrow.right");

    if (cardCenter > center + 20) {
      leftArrow.style.display = "block";
      rightArrow.style.display = "none";
    } else if (cardCenter < center - 20) {
      leftArrow.style.display = "none";
      rightArrow.style.display = "block";
    } else {
      leftArrow.style.display = "none";
      rightArrow.style.display = "none";
    }
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[closest]) dots[closest].classList.add("active");
}

function scrollToCard(card) {
  const container = document.getElementById("scrollContainer");
  const containerRect = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const offset =
    cardRect.left -
    containerRect.left -
    (container.clientWidth / 2 - card.clientWidth / 2);
  container.scrollBy({ left: offset, behavior: "smooth" });
}

function scrollToCardByIndex(index) {
  const card = cards[index];
  if (card) scrollToCard(card);
}

container.addEventListener("scroll", () => {
  requestAnimationFrame(updateDots);
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    scrollToCard(card);
  });
});

window.addEventListener("load", () => {
  scrollToCard(cards[1]); // index 1 = second card
});

window.addEventListener("resize", updateDots);
