<template>
  <div v-if="result" class="alert mb-4" :class="{ 'alert-danger': !result.success, 'alert-success': result.success }" role="alert">
    {{ result.message }}
    <ul v-if="result.errors && result.errors.length">
      <li v-for="item of result.errors">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["result"]
};
</script>
