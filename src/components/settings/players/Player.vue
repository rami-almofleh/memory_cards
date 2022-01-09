<template>
  <form class="row g-3 mb-2">
    <div class="col-auto">
      <input type="text" class="form-control" @input="changePlayerName" :value="player.name">
    </div>
    <div class="col-auto" v-if="player.id !== 1">
      <button class="btn btn-danger" @click="deletePlayer">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Player",
  props: ["player"],
  methods: {
    changePlayerName(event) {
      const p = {
        id: this.player.id,
        name: event.target.value,
        score: 0
      }
      this.$store.commit("game/updatePlayer", p)
    },
    deletePlayer() {
      this.$store.commit("game/deletePlayer", this.player.id)
    }
  }
}
</script>

<style scoped>

</style>
