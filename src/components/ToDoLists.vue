<template>
  <div>
    <v-list 
      v-if="todolist.length" 
      flat 
      class="pt-0"
    >
      <todo 
        v-for="todo in todolist" 
        :key="todo.id" 
        :todo="todo"
        :dbCollection="dbCollection"
      />
    </v-list>

    <v-row 
      v-else-if="countAll > 0 && activeStatus === 'completed'" class="d-flex flex-column mb-6 pt-5">
      <v-col class="d-flex justify-center">
        <v-icon x-large color="primary"> mdi-emoticon-confused-outline </v-icon>
      </v-col>
      <v-col class="d-flex justify-center">
        <p class="text-center text-h5">
         None of ToDos are completed in {{dbCollection === "ToDos" ? "public" : "your private"}} ToDo List
        </p>
      </v-col>
    </v-row>

    <v-row 
      v-else-if="countAll > 0 && activeStatus === 'uncompleted'" class="d-flex flex-column mb-6 pt-5">
      <v-col class="d-flex justify-center">
        <v-icon x-large color="primary"> mdi-emoticon-cool-outline </v-icon>
      </v-col>
      <v-col class="d-flex justify-center">
        <p class="text-center text-h5">
         Congrats! All ToDos are completed in {{dbCollection === "ToDos" ? "public" : "your private"}} ToDo List
        </p>
      </v-col>
    </v-row>

    <v-row 
      v-else class="d-flex flex-column mb-6 pt-5">
      <v-col class="d-flex justify-center">
        <v-icon x-large color="primary"> mdi-emoticon-happy-outline </v-icon>
      </v-col>
      <v-col class="d-flex justify-center">
        <p class="text-center text-h5">
          There is no ToDo in {{dbCollection === "ToDos" ? "public" : "your private"}} ToDo List
        </p>
      </v-col>
    </v-row>


  </div>
</template>

<script>
export default {
  components: {
    'todo': require("@/components/ToDo.vue").default,
  },
  props: {
    todolist: Array,
    dbCollection: String,
    activeStatus: String,
    countAll: Number
  }
};
</script>

<style></style>
