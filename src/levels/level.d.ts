export interface Line {
  from: [number, number];
  to: [number, number];
  isBouncy: boolean;
}

export interface Level {
  ball: {
    position: [number, number];
  };
  lines: Line[];
}
