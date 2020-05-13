<template>
  <canvas class="game-canvas" ref="canvas"></canvas>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watchEffect,
  compile,
  computed,
  onUnmounted,
  onBeforeUnmount
} from "vue";
import { useBall } from "./../src/game";

function useCanvas() {
  const canvas = ref<HTMLCanvasElement>();
  const ctx = computed(() =>
    canvas.value ? canvas.value.getContext("2d") : undefined
  );

  onBeforeUnmount(() => {
    canvas.value = undefined;
  });

  return {
    canvas,
    ctx
  };
}

export default defineComponent({
  setup() {
    const { canvas, ctx } = useCanvas();

    //const {lines,rectangles,circles}
    const ball = useBall();

    function movingAverage(avg: number, newValue: number) {
      const alpha = 1 / 5;
      return alpha * newValue + (1 - alpha) * avg;
    }

    let previousTime = 0;

    function draw(timestamp: number) {
      if (!canvas.value) return;
      if (!ctx.value) return;

      canvas.value.width = document.body.clientWidth;
      canvas.value.height = document.body.clientHeight;

      let deltaTime = (timestamp - previousTime) / 1000;
      previousTime = timestamp;

      ball.update(deltaTime);
      ball.draw(ctx.value);

      requestAnimationFrame(draw);
    }

    watchEffect(() => {
      if (ctx.value) {
        requestAnimationFrame(draw);
      }
    });

    return {
      canvas
    };
  }
});
</script>

<style scoped>
</style>
