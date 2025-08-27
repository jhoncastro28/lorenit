export const launchConfetti = () => {
  const confettiContainer = document.createElement("div");
  confettiContainer.style.position = "fixed";
  confettiContainer.style.top = "0";
  confettiContainer.style.left = "0";
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "999";
  document.body.appendChild(confettiContainer);

  const emojis = ["❤️", "💖", "💕", "💓", "💗", "💞", "💘", "💝", "✨", "🎉"];

  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.position = "absolute";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.fontSize = Math.random() * 24 + 12 + "px";
      confetti.style.userSelect = "none";
      confetti.style.zIndex = "1000";
      confetti.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.animation = `fall ${
        Math.random() * 3 + 3
      }s linear forwards`;
      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 6000);
    }, Math.random() * 2500);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 8500);
};
