import { vec2, glMatrix } from "gl-matrix";
import { ref } from "vue";

glMatrix.setMatrixArrayType(Array);

export function useBall() {
  const position = vec2.create();
  const velocity = vec2.create();
  const radius = ref(5);

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(position[0], position[1], radius.value, 0, 2 * Math.PI, false);
    ctx.fillStyle = "lightblue";
    ctx.fill();
  }

  const scaledVelocity = vec2.create();
  function update(deltaTime: number) {
    const gravity = 9.81;
    velocity[1] += gravity * deltaTime;

    vec2.scale(scaledVelocity, velocity, deltaTime);
    vec2.add(position, position, scaledVelocity);
  }

  return {
    position,
    velocity,
    radius,
    update,
    draw,
  };
}
