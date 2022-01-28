<template>
  <v-row
    align="center"
    justify="start"
    class="ml-0"

  >
    <v-btn 
      depressed 
      class="ml-0 mr-2"
      :class="{primary: activeStatus == 'all'}"
      small
      @click="$store.dispatch('filter', { status: 'all', dbCollection: dbCollection})"
    >
      All ({{countAll}})
    </v-btn>
    <v-btn
      depressed
      class="ma-2"
      :class="{primary: activeStatus == 'completed'}"
      small
      @click="$store.dispatch('filter', { status: 'completed', dbCollection: dbCollection})"
    >
      Completed ({{countDone}})
    </v-btn>
    <v-btn
      depressed
      class="ma-2"
      :class="{primary: activeStatus == 'uncompleted'}"
      small
      @click="$store.dispatch('filter', { status: 'uncompleted', dbCollection: dbCollection})"
    >
      Uncompleted ({{countRemaining}})
    </v-btn>
  </v-row>
</template>

<script>
export default {
  props: {
    dbCollection: String,
    activeStatus: String,
    countAll: Number,
    countRemaining: Number,
    countDone: Number
  }
}
</script>

<style>

</style>