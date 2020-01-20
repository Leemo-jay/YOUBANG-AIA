<template>
  <div class="s-canvas">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script>
export default {
  name: 'wave',
  data() {
    return {
      canvas: '',
      canvasWidth: 0,
      canvasHeight: 0,
      xOffset: 0,
    }
  },
  props: {},
  methods: {
      componentDidMount() {
        let width = window.screen.width;
        const canvas = this.$refs.canvas;
        canvas.height = 300;
        canvas.width = width;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.drawSin();
      },
      drawLine(waveWidth, waveHeight,rgba,startX) {
         const points = [];
        const canvasWidth = this.canvasWidth;
        const canvasHeight = this.canvasHeight;
        // const startX = -100;
        this.xOffset = this.xOffset + 0.03;
        this.ctx.beginPath();
        for (let x = startX; x < startX + 2 * canvasWidth; x += 20 / canvasWidth) {
          const y = waveHeight * Math.sin((startX + x) * waveWidth + this.xOffset);
          points.push([x, (canvasHeight / 4) + y]);
          this.ctx.lineTo(x, (canvasHeight / 4) + y);
        }
        this.ctx.lineTo(canvasWidth, canvasHeight);
        this.ctx.lineTo(startX, canvasHeight);
        // this.ctx.lineTo(points[0][0], points[0][1]);
        this.ctx.fillStyle = rgba
        this.ctx.strokeStyle = "rgba(0, 127, 255, 0)";
        this.ctx.stroke();
        this.ctx.fill();
      },
      drawSin() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        const waveWidth = 0.01; // 波浪宽度,數越小越宽
        const waveHeight = 20; // 波浪高度,數越大越高
        // this.drawLine(waveWidth, waveHeight,'#e5f2ff',-100)
        // this.drawLine(waveWidth + 0.01, waveHeight + 8,'#d3e9ff',-150)
         this.drawLine(waveWidth, waveHeight,'rgba(0, 127, 255, 0.08)',-100)
        this.drawLine(waveWidth + 0.01, waveHeight + 8,'rgba(0, 127, 255, 0.06)',-150)
        // requestAnimationFrame(this.drawSin.bind(this));
      }
  },
  watch: {},
  mounted() {
    this.componentDidMount()
  },
}
</script>

<style scoped>
</style>
