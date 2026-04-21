export class Particle {
  constructor(canvas, x, y, char) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.char = char;
    // Varying sizes: small, medium, large
    this.size = Math.random() * 20 + 8; // Size between 8 and 28
    this.density = (Math.random() * 30) + 1;
    
    // Create depth with opacity based on size
    const opacity = (this.size - 8) / 20 * 0.7 + 0.1; // opacity between 0.1 and 0.8
    this.color = `rgba(0, 85, 255, ${opacity})`;

    // Continuous motion variables
    this.vx = (Math.random() - 0.5) * (this.size / 15);
    this.vy = (Math.random() - 0.5) * (this.size / 15);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.size}px JetBrains Mono`;
    this.ctx.fillText(this.char, this.x, this.y);
  }

  update(mouse) {
    // Add continuous slow motion
    this.baseX += this.vx;
    this.baseY += this.vy;

    // Wrap around screen
    if (this.baseX < 0) this.baseX = this.canvas.width;
    if (this.baseX > this.canvas.width) this.baseX = 0;
    if (this.baseY < 0) this.baseY = this.canvas.height;
    if (this.baseY > this.canvas.height) this.baseY = 0;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (mouse.x != null && mouse.y != null && distance < mouse.radius) {
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      
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

export function initParticles(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particlesArray = [];
  const chars = '01X@#*+';
  
  // Fill screen with random ASCII grains
  const numberOfParticles = (canvas.width * canvas.height) / 6000; // slightly denser
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let char = chars[Math.floor(Math.random() * chars.length)];
    particlesArray.push(new Particle(canvas, x, y, char));
  }

  return particlesArray;
}
