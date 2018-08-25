<template>
    <v-container fill-height>
      
      
        <v-layout column fill-height align-center>
          <v-flex align-center class="center_text">
            <h3>Create a match</h3>
            <v-form>
              <v-btn color="success" v-on:click="createEvent()">Create an event</v-btn>
            </v-form>
          </v-flex >
          <v-flex>
            <v-btn primary dark @click="dialog = true">Add a user</v-btn>
          </v-flex>

          <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          New player details
        </v-card-title>

        <v-form v-model="valid">
          <v-text-field
            v-model="phone"
            :rules="nameRules"
            :counter="10"
            label="Phone number"
            mask="###-#########"
            append-icon="phone"
            required
          ></v-text-field>

          <v-text-field
            v-model="firstName"
            label="First Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            label="Last Name"
            required
          ></v-text-field>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="saveUser()"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        firstName: '',
        lastName: '',
        name: '',
        email:'',
        token: '',
        phone: '',
        dialog: false
      }
    },
    mounted() {
      this.token = window.localStorage.getItem( 'token' )
    },
    methods: {
      createEvent() {
        this.$http.post(
            'http://localhost:5000/event',
            {
              'creatorId':'1'
            },
            { headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + this.token
              }
            }
        ).then( function( res ) {
          console.log( res )
        }).catch( function( err ) {
          console.log( err )
        })
      },

      saveUser() {
        this.$http.post(
            'http://localhost:5000/add-user',
            {
              firstName: this.firstName,
              lastName: this.lastName,
              phone: this.phone
            },
            { headers: {
                'content-type': 'application/json',
                "Authorization": "Bearer " + this.token
              }
            }
        ).then( function( res ) {
          console.log( res )
        }).catch( function( err ) {
          console.log( err )
        })
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .center_text{
    text-align: center
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
