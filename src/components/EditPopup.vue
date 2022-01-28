<template>
  <v-dialog
    :value="true"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Edit ToDo
      </v-card-title>
      <v-card-text>
        Edit this ToDo:
        <v-text-field
          v-model="updatedToDo"
          @keyup.enter="saveTodo(todo.id, dbCollection, updatedToDo)"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('close')"
          text
        >
          Cancel
        </v-btn>
        <v-btn
          @click="saveTodo(todo.id, dbCollection, updatedToDo)"

          color="red darken-1"
          text
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    todo: Object,
    dbCollection: String
  },
  data() {
    return {
      updatedToDo: null
    }
  },
  methods: {
    saveTodo(id, dbCollection, updatedToDo) {
      console.log("savetodo", id, dbCollection)
      if (this.updatedToDo) {
        
        this.$store.dispatch('updateToDo', { id: id, name: updatedToDo, dbCollection: dbCollection })
        this.$emit('close')
        this.$vuetify.goTo(0, { duration: 0 })
      }
    }
  },
  mounted() {
    this.updatedToDo = this.todo.name
  }
}
</script>

<style>

</style>