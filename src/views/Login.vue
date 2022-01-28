<template>
  <div class="login">
    <login />
  </div>
</template>

<script>

export default {
  components: {
    'login': require('@/components/auth/Login.vue').default,
  },
};
</script>