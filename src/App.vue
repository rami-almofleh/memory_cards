<template>
  <MC_Nav v-if="$route.path !== '/'" />
  <router-view/>
</template>
<script>
import MC_Nav from "./components/layout/MC_Nav";
export default {
  components: {MC_Nav},
  created() {
    // get selectedLevel from localStorage and save it in Store
    if (localStorage.getItem("selectedLevel")) {
      this.$store.commit("game/setSelectedLevel", localStorage.getItem("selectedLevel"))
    } else {
      this.$store.commit("game/setSelectedLevel", "medium")
    }

    // get selectedImageType from localStorage and save it in Store
    if (localStorage.getItem("selectedImageType")) {
      this.$store.commit("game/setSelectedImageType", localStorage.getItem("selectedImageType"))
    } else {
      this.$store.commit("game/setSelectedImageType", "fruit")
    }
  }
}
</script>
