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
import { useLevels } from "./../src/levels/levels";
import { vec2 } from "gl-matrix";

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

    const ball = useBall();
    const levels = useLevels();

    watchEffect(() => {
      vec2.copy(ball.position, levels.level.value.ball.position);
      vec2.scale(ball.velocity, ball.velocity, 0);
    });

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

      const borderPadding = 20;
      if (
        ball.position[0] < -borderPadding ||
        ball.position[1] < -borderPadding ||
        ball.position[0] > canvas.value.width + borderPadding ||
        ball.position[1] > canvas.value.height + borderPadding
      ) {
        levels.restart();
      }

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
