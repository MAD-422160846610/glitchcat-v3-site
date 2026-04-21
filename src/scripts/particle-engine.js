export class Particle {
  constructor(canvas, x, y, char) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.char = char;
    this.size = 10;
    this.density = (Math.random() * 30) + 1;
    this.color = '#0055FF';
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.size}px JetBrains Mono`;
    this.ctx.fillText(this.char, this.x, this.y);
  }

  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

export function initParticles(canvas, textData) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particlesArray = [];
  const chars = '01X@#*+';
  
  // Fill screen with random ASCII grains
  const numberOfParticles = (canvas.width * canvas.height) / 8000;
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let char = chars[Math.floor(Math.random() * chars.length)];
    particlesArray.push(new Particle(canvas, x, y, char));
  }

  return particlesArray;
}
