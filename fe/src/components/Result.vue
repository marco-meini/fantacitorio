<template>
  <div v-if="result" class="alert mb-4" :class="{ 'alert-danger': !result.success, 'alert-success': result.success }" role="alert">
    {{ result.description }}
    <ul v-if="result.messages && result.messages.length">
      <li v-for="item of result.messages">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["result"]
};
</script>
