<template>
  <div class="register">
    <register />
  </div>
</template>

<script>

export default {
  components: {
    'register': require('@/components/auth/Register.vue').default,
  },
};
</script>