<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-sheet
        elevation="3">
        <v-img
        class="pa-4 pt-7"
        src="todo.jpg"
        height="176"
        gradient="to top right, rgba(101,101,119,.7), rgba(62,62,62,.7)"
        >
        <v-avatar
          v-if="isLoggedIn"
          size="60"
          class="ml-3">
        <img
          :src="'https://ui-avatars.com/api/?background=random&name=' + currentUser"
        >
        </v-avatar>
        <v-avatar
          v-else-if="!isLoggedIn"
          size="60"
          class="ml-3">
        <img
          src="notLogged.jpeg"
        >
        </v-avatar>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h7 grey--text text--lighten-4">
            {{isLoggedIn ? currentUser : "You're not logged in!"}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        </v-img>
      </v-sheet>
        

      

      <v-list dense nav>

        <v-list-item v-if="isLoggedIn" to="/" link>
          <v-list-item-icon>
            <v-icon>mdi-check-all</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>ToDos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!isLoggedIn" to="/login" link>
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!isLoggedIn" to="/register" link>
          <v-list-item-icon>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="isLoggedIn" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#6A76AB"
      dark
      prominent
      src="todo.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(101,101,119,.7), rgba(62,62,62,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>ToDo App</v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs
          v-if="isLoggedIn"
          align-with-title
        >
          <v-tab to="/">Private</v-tab>
          <v-tab to="/public">Public</v-tab>
        </v-tabs>
        
      </template>
    </v-app-bar>

    <v-main>
      <router-view :userUid="currentUserUid"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  data: () => ({
    drawer: null,
    isLoggedIn: false,
    currentUser: false,
    currentUserUid: false,
  }),
  mounted() {
    this.$store.dispatch("getToDos", {dbCollection: "ToDos"})
    const auth = getAuth();
    const user = auth.currentUser;
    if(user) {
      this.isLoggedIn = true;
      this.currentUser = user.email;
      this.currentUserUid = user.uid;
      this.$store.dispatch("getToDos", {dbCollection: this.currentUserUid})
    }
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        this.$router.go({path: this.$router.path})
      }).catch((error) => {
        // An error happened.
        alert(error.message)
      });
    }
  }
};
</script>
