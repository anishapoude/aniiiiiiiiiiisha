let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // ----- Desktop Mouse -----
    paper.addEventListener("mousedown", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.holdingPaper) return;
      const deltaX = e.clientX - this.prevX;
      const deltaY = e.clientY - this.prevY;
      this.currentX += deltaX;
      this.currentY += deltaY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
    });

    document.addEventListener("mouseup", () => {
      this.holdingPaper = false;
    });

    // ----- Mobile Touch -----
    paper.addEventListener("touchstart", (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.prevX = this.startX;
      this.prevY = this.startY;
    }, { passive: false });

    paper.addEventListener("touchmove", (e) => {
      if (!this.holdingPaper) return;
      e.preventDefault(); // Prevent scrolling
      const deltaX = e.touches[0].clientX - this.prevX;
      const deltaY = e.touches[0].clientY - this.prevY;
      this.currentX += deltaX;
      this.currentY += deltaY;
      this.prevX = e.touches[0].clientX;
      this.prevY = e.touches[0].clientY;
      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

// ----- Initialize all papers -----
const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// ----- Mobile Audio -----
const bgMusic = document.getElementById("bg-music");
document.addEventListener("click", () => {
  if (bgMusic && bgMusic.paused) bgMusic.play();
}, { once: true });
document.addEventListener("touchstart", () => {
  if (bgMusic && bgMusic.paused) bgMusic.play();
}, { once: true });
