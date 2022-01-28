<template>
<div>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item-group>
        <v-list-item @click="editToDo">
          <v-list-item-icon>
            <v-icon>mdi-fountain-pen-tip</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group >
        <v-list-item @click="$store.dispatch('deleteToDo', {id: todo.id, dbCollection: dbCollection})">
          <v-list-item-icon>
            <v-icon>mdi-delete-forever-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      
    </v-list>
  </v-menu>

  <edit-popup
      v-if="edit"
      @close="edit = false"
      :todo="todo"
      :dbCollection="dbCollection"
    />

</div>
  
</template>

<script>
export default {
  data: () => ({
      edit: false,
  }),
  props: {
    todo: Object,
    dbCollection: String
  },
  components: {
    'edit-popup': require('@/components/EditPopup.vue').default,
  },
  methods: {
    editToDo () {
      this.edit = true;
    },
  },
};
</script>

<style></style>
