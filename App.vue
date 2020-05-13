<template>
  <div class="container">
    <BallGame />
    <GithubRibbon class="github-ribbon" />
  </div>
</template>

<script>
import BallGame from "./components/BallGame.vue";
import GithubRibbon from "./components/GithubRibbon.vue";

export default {
  name: "App",
  components: {
    BallGame,
    GithubRibbon
  }
};
</script>

<style scoped>
.container {
  display: flex;
}
.github-ribbon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
