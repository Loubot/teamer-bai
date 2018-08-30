<template>
  <v-container fill-height>
    <v-layout column fill-height align-center>
      <v-flex align-center class="center_text">
        <h3>Create a match</h3>
        <v-form class="vw100">
          <v-layout row>
            <v-flex xs-6>
              <v-menu
                ref="menu1"
                :close-on-content-click="true"
                v-model="menu1"
                :nudge-right="40"
                :return-value.sync="date.startDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date.startDate"
                  label="Start time"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date.startDate" @input="$refs.menu1.save(date.startDate); dateFunction()"></v-date-picker>

              </v-menu>
            </v-flex>

            <v-flex xs-6>
              <v-menu
                ref="menu3"
                :close-on-content-click="false"
                v-model="menu3"
                :nudge-right="40"
                :return-value.sync="date.startTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date.startTime"
                  label="Picker in menu"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker
                  v-if="menu3"
                  v-model="date.startTime"
                  format="24hr"
                  @change="$refs.menu3.save(date.startTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex>
              <v-menu
                ref="menu2"
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                :return-value.sync="date.endDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date.endDate"
                  label="End Time"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date.endDate" @input="$refs.menu2.save(date.endDate); dateFunction()"></v-date-picker>

              </v-menu>
            </v-flex>

            <v-flex xs6>
              <v-menu
                ref="menu4"
                :close-on-content-click="false"
                v-model="menu4"
                :nudge-right="40"
                :return-value.sync="date.endTime"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date.endTime"
                  label="Picker in menu"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker
                  v-if="menu4"
                  v-model="date.endTime"
                  format="24hr"
                  @change="$refs.menu4.save(date.endTime)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
            
            
          </v-layout>

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
      date: {
        startTime: null, endTime: null, startDate: '', endDate: ''
      },
      menu: false,
      modal: false,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
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

.vw100{
  width: 100% !important;
}
</style>
