<template>
  <v-container fill-height>
    <v-layout column fill-height align-center>
      <v-flex align-center class="center_text">
        <h3>Create a match</h3>
        <v-form>
          
          <v-menu
            ref="menu1"
            :close-on-content-click="false"
            v-model="menu1"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              label="Picker without buttons"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" @input="$refs.menu2.save(date); dateFunction()"></v-date-picker>

          </v-menu>
          
          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              label="Picker without buttons"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" @input="$refs.menu2.save(date); dateFunction()"></v-date-picker>

          </v-menu>

          <v-btn color="success" v-on:click="createEvent()">Create an event</v-btn>
                
        </v-form>

      </v-flex >
      <v-flex>
        <v-btn primary dark @click="dialog = true">Add a user</v-btn>
      </v-flex>

          
    </v-layout>
      
  </v-container>

    
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  data() {
    return {
      rules: [],
      valid: false,
      nameRules: [],
      emailRules: [],
      date: "",
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      firstName: "",
      lastName: "",
      name: "",
      email: "",
      token: "",
      phone: "",
      dialog: false
    };
  },
  mounted() {
    this.token = window.localStorage.getItem("token");
  },
  methods: {
    dateFunction() {
      console.log( this.date )
    },
    createEvent() {
      this.$http
        .post(
          "http://localhost:5000/event",
          {
            creatorId: "1"
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + this.token
            }
          }
        )
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    saveUser() {
      this.$http
        .post(
          "http://localhost:5000/add-user",
          {
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + this.token
            }
          }
        )
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
.center_text {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
