<template>
  <div class="pa-2 pt-0">
    
    <add-todo dbCollection="ToDos"/>
    <filter-todos 
      dbCollection="ToDos" 
      :activeStatus="$store.state.filterToDos" 
      class="pb-5 pt-2"
      :countAll="$store.getters.countAllToDos"
      :countRemaining="$store.getters.countRemainingToDos"
      :countDone="$store.getters.countDoneToDos"
    />
    <todo-lists 
      :todolist="$store.getters.filteredToDos" 
      dbCollection="ToDos" 
      :activeStatus="$store.state.filterToDos"
      :countAll="$store.getters.countAllToDos"
    />

    
  </div>
</template>

<script>

export default {
  name: "ToDo",
  components: {
    'add-todo': require('@/components/AddToDo.vue').default,
    'todo-lists': require('@/components/ToDoLists.vue').default,
    'filter-todos': require('@/components/FilterToDos.vue').default,
  },
};
</script>
