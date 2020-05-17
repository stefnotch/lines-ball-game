import { vec2, glMatrix, ReadonlyVec2 } from "gl-matrix";
import { ref, computed } from "vue";
import { Line } from "./levels/level";

export function useLines() {
  const lines = ref<Line[]>([]);

  /*
  const lineVectors = computed(() =>
    lines.value.map((line) =>
      vec2.fromValues(line.end[0] - line.start[0], line.end[1] - line.start[1])
    )
  );

  const lineLengths = computed(() =>
    lineVectors.value.map((lineVector) => vec2.length(lineVector))
  );

  const normalVectors = computed(() =>
    lineVectors.value.map((lineVector) => {
      let normal = vec2.fromValues(-lineVector[1], lineVector[0]);
      vec2.normalize(normal, normal);
      return normal;
    })
  );

  // Neat, but actually I need CCD
  // Rectangle: 4 line segments
  // Sphere: Point - line segment (if dist < sphere.radius + ball.radius)

  // So, instead of colliding with a ball, we need a collision detection between a shape and a line segment (where the ball traveled)

  const lineStartToPoint = vec2.create();
  const closestPointToPoint = vec2.create();
  function collides(point: ReadonlyVec2, radius: number) {
    let radiusSquared = radius ** 2;
    let lineVectorsValue = lineVectors.value;
    let lineLengthsValue = lineLengths.value;
    let normalVectorsValue = normalVectors.value;

    lines.value.forEach((line, index) => {
      let lineVector = lineVectorsValue[index];
      let lineLength = lineLengthsValue[index];
      let normal = normalVectorsValue[index];

      vec2.subtract(lineStartToPoint, point, line.start);
      let distanceAlongLine =
        vec2.dot(lineStartToPoint, lineVector) / lineLength;
      // Range 0 - 1 along line
      let t = Math.max(0, Math.min(1, distanceAlongLine));
      // Find the closest point on the line
      vec2.scale(closestPointToPoint, lineVector, t);
      // Vector to the actual point
      vec2.subtract(closestPointToPoint, lineStartToPoint, closestPointToPoint);
      let distanceFromLineSegment = vec2.sqrLen(closestPointToPoint);
      if (distanceFromLineSegment < 1000) {
        console.log(distanceFromLineSegment);
      }
    });
  }
*/
  function draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    lines.value.forEach((line) => {
      ctx.moveTo(line.start[0], line.start[1]);
      ctx.lineTo(line.end[0], line.end[1]);
    });
    ctx.fillStyle = "black";
    ctx.stroke();
  }

  return {
    lines,
    draw,
  };
}

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
  const endPosition = vec2.create();
  function update(deltaTime: number) {
    const gravity = 9.81;
    velocity[1] += gravity * deltaTime;

    vec2.scale(scaledVelocity, velocity, deltaTime);
    vec2.add(endPosition, position, scaledVelocity);

    // TODO: Compute intersections

    vec2.copy(position, endPosition);
  }

  return {
    position,
    velocity,
    radius,
    update,
    draw,
  };
}
