<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between">
      <router-link to="/settings" class="link-dark">
        <i class="bi bi-arrow-left h4 fw-bold"></i>
      </router-link>

      <span>{{ $t("level") }}: <b>{{ $t(selectedLevel) }}</b></span>
      <span>{{ $t("timer") }}: <b>{{ timer }}</b></span>
      <button class="btn btn-warning" @click="restartGame">{{ $t("reset_game") }}</button>
    </div>
    <div class="d-flex justify-content-evenly my-3">
      <span class="h4 fw-light" v-for="player in players" :key="player.id">{{ player.name }}: <span class="fw-bold">{{ player.score }}</span></span>
    </div>

    <game-body />
  </div>
</template>

<script>
import GameBody from "../components/game/GameBody";
export default {
  name: "Game",
  components: {GameBody},
  data() {
    return {
      players: this.$store.getters["game/getAllPlayers"],
      timer: "00:00",
      timerInterval: null
    }
  },
  created() {
    this.restartTimer()
    if (this.players.length === 0) {
      this.$store.commit("game/addPlayer", {
        id: 1,
        name: this.$t('player') + ' ' + 1,
        score: 0
      })
    }
  },
  computed: {
    selectedImageType() {
      return this.$store.getters["game/getSelectedImageType"]
    },
    selectedLevel() {
      return this.$store.getters["game/getSelectedLevel"]
    }
  },
  unmounted() {
    clearInterval(this.timerInterval)
  },
  methods: {
    restartTimer() {
      this.timer  = "00:00"
      clearInterval(this.timerInterval)

      let time = 0
      this.timerInterval = setInterval(() => {
        let m = Math.floor(time / 60)
        let s = time - m * 60;
        this.timer = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`

        time++;
      }, 1000)
    },
    restartGame() {
      this.restartTimer()
    }
  }
}
</script>

<style scoped>

</style>
