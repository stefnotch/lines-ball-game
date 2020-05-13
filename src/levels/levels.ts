import Level1 from "./level-1";
import { ref, computed, ComputedRef } from "vue";
import { Level } from "./level";

const emptyLevel: Level = {
  ball: {
    position: [0, 0],
  },
  lines: [],
};
const levels = [Level1];

export function useLevels() {
  const levelIndex = ref(0);
  const level = computed(
    () => levels[levelIndex.value] ?? emptyLevel
  ) as ComputedRef<Level>;

  function restart() {
    let oldValue = levelIndex.value;
    console.log("Restart Level " + oldValue);
    levelIndex.value = -1;
    levelIndex.value = oldValue;
  }

  return {
    levelIndex,
    level,
    restart,
  };
}
