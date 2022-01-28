<template>
  <v-text-field
      v-model="newToDo"
      class="pa-4"
      outlined
      label="Add ToDo"
      append-icon="mdi-plus-box-multiple-outline"
      @click:append="addToDo(dbCollection)"
      @keyup.enter="addToDo(dbCollection)"
      hide-details
      clearable
    ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newToDo: "",
    };
  },
  
  methods: {
    addToDo(dbCollection) {
      this.$store.dispatch('addToDo', {newToDo: this.newToDo, dbCollection: dbCollection})
      this.newToDo = "";
    },
  },

  props: {
    dbCollection: String
  }
}
</script>

<style>

</style>