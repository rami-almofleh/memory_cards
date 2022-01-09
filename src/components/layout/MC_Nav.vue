<template>
  <nav class="navbar navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold">Memory cards</a>
      <form>
        <select class="form-select" @input="(event) => $i18n.locale = event.target.value">
          <option value="de" :selected="$i18n.locale === 'de'">DE</option>
          <option value="en" :selected="$i18n.locale === 'en'">EN</option>
        </select>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MC_Nav"
}
</script>
