import type { vec2 } from "gl-matrix";

export interface Line {
  start: vec2;
  end: vec2;
  isBouncy: boolean;
}

export interface Level {
  ball: {
    position: vec2;
  };
  lines: Line[];
}
