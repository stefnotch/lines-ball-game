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

    function draw(timestamp: number) {
      if (!canvas.value) return;
      if (!ctx.value) return;

      canvas.value.width = window.innerWidth;
      canvas.value.height = window.innerHeight;

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
