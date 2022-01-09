<template>
  <div class="py-3">
    <p class="h4 fw-bold mb-4">{{ $t('please_select_level') }}</p>

    <div class="form-check" v-for="level in levels" :key="level" @input="selectedLevel = level">
      <input class="form-check-input" type="radio" name="level" :id="level" :checked="level === selectedLevel">
      <label class="form-check-label" :for="level">
        {{ $t(level) }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Levels",
  data() {
    return {
      levels: this.$store.getters["game/getAllLevels"],
      selectedLevel: this.$store.getters["game/getSelectedLevel"]
    }
  },
  watch: {
    selectedLevel(v) {
      this.$store.commit("game/setSelectedLevel", v)
    }
  }
}
</script>

<style scoped>

</style>
