// Daniel Shiffman
// Neuro-Evolution Flappy Bird

// Class for a Pipe

class Pipe {
  constructor() {
    // Fixed spacing
    this.spacing = 125; // 空白区高度
    this.top = random(height / 6, (3 / 4) * height); // 上段下底
    this.bottom = height - (this.top + this.spacing); // 下段上底
    this.x = width; // 左侧距离
    this.w = 80;  //宽度
    this.speed = 6; //移动速度
  }

  // 是否撞击该管道
  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  // 显示管道
  show() {
    fill(255);
    rectMode(CORNER);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  // 更新距离
  update() {
    this.x -= this.speed;
  }

  // 是否溢出Canvas
  offscreen() {
    return (this.x < -this.w);
  }
}
