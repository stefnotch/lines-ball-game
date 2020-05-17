import type { Level } from "./level";

const level: Level = {
  ball: {
    position: [20, 20],
  },
  lines: [
    {
      start: [0, 0],
      end: [5, 5],
      isBouncy: false,
    },
    {
      start: [30, 110],
      end: [5, 100],
      isBouncy: false,
    },
  ],
};

export default level;
