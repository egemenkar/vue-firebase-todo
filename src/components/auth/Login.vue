<template>
<div class="form-control">
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      @keyup.enter=submit
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @keyup.enter=submit
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="submit"
    >
      login
    </v-btn>
  </form>
  <v-list>
    <v-list-item to="/register" link>
      <v-list-content>
        Don't have an account? Click to register!
      </v-list-content>
    </v-list-item>
  </v-list>
</div>
  
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

  export default {
    mixins: [validationMixin],

    validations: {
      password: { required },
      email: { required, email },
    },

    data: () => ({
      password: '',
      email: '',
    }),

    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit (e) {
        this.$v.$touch()

        const auth = getAuth();
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {

              this.$router.go({path: this.$router.path})
            })
            .catch((error) => {
              // const errorCode = error.code;
              // const errorMessage = error.message;
              // ..
              console.log(error.message)
        });


        e.preventDefault()
      },
    },
  }
</script>

<style scoped>
  .form-control {
    margin: auto;
    max-width: 400px;;
  }
</style>