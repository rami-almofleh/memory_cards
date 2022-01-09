<template>
  <div class="container-fluid">
    <players />
    <levels />
    <images />

    <router-link to="/game" class="btn btn-primary mt-4">{{ $t("start_now") }}</router-link>
  </div>
</template>

<script>
import Players from "../components/settings/players/Players";
import Levels from "../components/settings/Levels";
import Images from "../components/settings/Images";
export default {
  name: 'Settings',
  components: {Images, Levels, Players},
  computed: {
    selectedLevel() {
      return this.$store.getters["game/getSelectedLevel"]
    },
    selectedImageType() {
      return this.$store.getters["game/getSelectedImageType"]
    },
    players() {
      return this.$store.getters["game/getAllPlayers"]
    }
  }
}
</script>
