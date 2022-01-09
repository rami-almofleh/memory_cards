<template>
  <div class="py-3">
    <p class="h4 fw-bold mb-4">{{ $t('how_many_players') }}</p>

    <Player v-for="player in players" :player="player" :key="player.id" />
    <!--p class="mt-3 cursor-pointer d-inline-block" @click="addPlayer(2)" v-if="players.length === 1">
      <i class="bi bi-plus-square-fill"></i>
      {{ $t("add_player") }}
    </p-->
  </div>
</template>

<script>
import Player from "./Player";
export default {
  name: "Players",
  components: {Player},
  created() {
    if (this.players.length === 0 ) {
      this.addPlayer(1)
    }
  },
  computed: {
    players() {
      return this.$store.getters["game/getAllPlayers"]
    }
  },
  methods: {
    addPlayer(id) {
      this.$store.commit("game/addPlayer", {
        id: id,
        name: this.$t('player'),
        score: 0
      })
    }
  }
}
</script>

<style scoped>

</style>
