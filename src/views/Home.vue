<template>
  <div class="container-fluid d-flex justify-content-center align-items-center h-100">
    <div class="text-center">
      <h1>Memory Cards game</h1>
      <p>
        To start this game please hit "Start now".
        <br>
        Let's go :-)
      </p>
      <router-link to="/settings" class="btn btn-primary">{{ $t("start_now") }}</router-link>
      <small class="fw-light d-block mt-5">Created by: Rami Almofleh</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
