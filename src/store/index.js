import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "../firebase/db";
import {
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ToDos: [],
    PrivateToDos: [],
    filterToDos: "all",
    filterPrivateToDos: "all",
  },
  mutations: {
    setToDos(state, { tempToDos, dbCollection }) {
      if (dbCollection === "ToDos") {
        state.ToDos = tempToDos.sort((a, b) => b.timestamp - a.timestamp);
      } else {
        state.PrivateToDos = tempToDos.sort(
          (a, b) => b.timestamp - a.timestamp
        );
      }
    },
    addToDo(state, { newToDoItem, dbCollection }) {
      if (dbCollection === "ToDos") {
        state.ToDos.push(newToDoItem);
      } else {
        state.PrivateToDos.push(newToDoItem);
      }
    },
    deleteToDo(state, { id, dbCollection }) {
      if (dbCollection === "ToDos") {
        state.ToDos = state.ToDos.filter((todo) => todo.id !== id);
      } else {
        state.PrivateToDos = state.PrivateToDos.filter(
          (todo) => todo.id !== id
        );
      }
    },
    updateToDo(state, { id, name, dbCollection }) {
      if (dbCollection === "ToDos") { 
        state.ToDos.forEach((todo, i) => { if (todo.id === id) state.ToDos[i].name = name });

      } else {
        state.ToDos.forEach((todo, i) => {
          if (todo.id === id) state.PrivateToDos[i].name = name;
        });
      }
      
    },
    toggleDoneToDo(state, { id, dbCollection }) {
      if (dbCollection === "ToDos") {
        let todo = state.ToDos.filter((todo) => todo.id === id)[0];
        todo.isDone = !todo.isDone;
      } else {
        let todo = state.PrivateToDos.filter((todo) => todo.id === id)[0];
        todo.isDone = !todo.isDone;
      }
    },
    setFilter(state, { status, dbCollection }) {
      if (dbCollection === "ToDos") {
        state.filterToDos = status;
      } else {
        state.filterPrivateToDos = status;
      }
    },
  },
  actions: {
    async addToDo({ commit }, { newToDo, dbCollection }) {
      let newToDoItem = {
        id: uuidv4(),
        timestamp: Date.now(),
        name: newToDo,
        isDone: false,
      };
      await setDoc(doc(db, dbCollection, newToDoItem.id), newToDoItem);
      commit("addToDo", { newToDoItem, dbCollection });
    },
    async deleteToDo({ commit }, { id, dbCollection }) {
      await deleteDoc(doc(db, dbCollection, id));
      commit("deleteToDo", { id, dbCollection });
    },
    async updateToDo({ commit }, { id, name, dbCollection }) {
      console.log(id, name, dbCollection)
      const toDoRef = doc(db, dbCollection, id);
      await updateDoc(toDoRef, {
        name: name,
      });
      commit("updateToDo", { id, name, dbCollection });
    },
    async toggleDoneToDo({ state, commit }, { id, dbCollection }) {
      if (dbCollection === "ToDos") {
        let todo = state.ToDos.filter((todo) => todo.id === id)[0];
        const toDoRef = doc(db, dbCollection, id);
        await updateDoc(toDoRef, { isDone: !todo.isDone });
      } else {
        let todo = state.PrivateToDos.filter((todo) => todo.id === id)[0];
        const toDoRef = doc(db, dbCollection, id);
        await updateDoc(toDoRef, { isDone: !todo.isDone });
      }
      commit("toggleDoneToDo", { id, dbCollection });
    },
    async getToDos({ commit }, { dbCollection }) {
      const querySnapshot = await getDocs(collection(db, dbCollection));
      let tempToDos = [];
      querySnapshot.forEach((doc) => {
        tempToDos.push({
          id: doc.data().id,
          name: doc.data().name,
          isDone: doc.data().isDone,
          show: doc.data().show,
          showUpdate: doc.data().showUpdate,
        });
      });
      commit("setToDos", { tempToDos, dbCollection });
    },
    filter({ commit }, { status, dbCollection }) {
      commit("setFilter", { status, dbCollection });
    },
  },
  getters: {
    filteredToDos(state) {
      if (state.filterToDos === "all") {
        return state.ToDos;
      } else if (state.filterToDos === "completed") {
        return state.ToDos.filter((todo) => todo.isDone);
      } else if (state.filterToDos === "uncompleted") {
        return state.ToDos.filter((todo) => !todo.isDone);
      }
      return state.ToDos;
    },
    filteredPrivateToDos(state) {
      if (state.filterPrivateToDos === "all") {
        return state.PrivateToDos;
      } else if (state.filterPrivateToDos === "completed") {
        return state.PrivateToDos.filter((todo) => todo.isDone);
      } else if (state.filterPrivateToDos === "uncompleted") {
        return state.PrivateToDos.filter((todo) => !todo.isDone);
      }
      return state.PrivateToDos;
    },
    countAllPrivateToDos(state) {
      return state.PrivateToDos.length;
    },
    countRemainingPrivateToDos(state) {
      return state.PrivateToDos.filter((todo) => !todo.isDone).length;
    },
    countDonePrivateToDos(state) {
      return state.PrivateToDos.filter((todo) => todo.isDone).length;
    },
    countAllToDos(state) {
      return state.ToDos.length;
    },
    countRemainingToDos(state) {
      return state.ToDos.filter((todo) => !todo.isDone).length;
    },
    countDoneToDos(state) {
      return state.ToDos.filter((todo) => todo.isDone).length;
    },
  },
});
