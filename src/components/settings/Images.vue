<template>
  <div class="py-3">
    <p class="h4 fw-bold mb-4">{{ $t('please_select_images_type') }}</p>

    <div class="form-check" v-for="imageType in imageTypes" :key="imageType" @input="selectedImageType = imageType">
      <input class="form-check-input" type="radio" name="imageType" :id="imageType" :checked="imageType === selectedImageType">
      <label class="form-check-label" :for="imageType">
        {{ $t(imageType) }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Images",
  data() {
    return {
      imageTypes: this.$store.getters["game/getAllImageTypes"],
      selectedImageType: this.$store.getters["game/getSelectedImageType"]
    }
  },
  watch: {
    selectedImageType(v) {
      this.$store.commit("game/setSelectedImageType", v)
    }
  }
}
</script>

<style scoped>

</style>
