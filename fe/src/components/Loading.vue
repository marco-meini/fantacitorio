<template>
  <div v-if="loading" class="progress" style="height: 30px">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
      role="progressbar"
      aria-label="Animated striped example"
      aria-valuenow="100"
      aria-valuemin="0"
      aria-valuemax="100"
      style="width: 100%">
      Loading...
    </div>
  </div>
</template>
;

<script>
export default {
  props: ["loading"]
};
</script>
