<template>
  
  <div>
        <v-list-item
          @click="$store.dispatch('toggleDoneToDo', {id: todo.id, dbCollection: dbCollection})"
          :class="{ 'blue-grey lighten-5': todo.isDone }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="todo.isDone"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': todo.isDone }"
              >
                {{ todo.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <todo-options :todo="todo" :dbCollection="dbCollection" />
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>

</template>

<script>
export default {
  components: {
    'todo-options': require("@/components/ToDoOptions.vue").default
  },
  props: {
    todo: Object,
    dbCollection: String
  }
}
</script>

<style>

</style>