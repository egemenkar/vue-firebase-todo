<template>
  <div class="pa-2 pt-0">
    
    <add-todo :dbCollection="userUid"/>
    <filter-todos 
      :dbCollection="userUid" 
      :activeStatus="$store.state.filterPrivateToDos" 
      class="pb-5 pt-2"
      :countAll="$store.getters.countAllPrivateToDos"
      :countRemaining="$store.getters.countRemainingPrivateToDos"
      :countDone="$store.getters.countDonePrivateToDos"
    />
    <todo-lists 
      :todolist="$store.getters.filteredPrivateToDos" 
      :dbCollection="userUid" 
      :activeStatus="$store.state.filterPrivateToDos"
    />

  </div>
</template>

<script>

export default {
  name: "ToDoPrivate",
  components: {
    'add-todo': require('@/components/AddToDo.vue').default,
    'todo-lists': require('@/components/ToDoLists.vue').default,
    'filter-todos': require('@/components/FilterToDos.vue').default,
    
  },
  props: {
    userUid: String,
  }
};
</script>
