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
            <v-btn primary dark @click="dialog = true">Normal</v-btn>
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
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
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
        name: '',
        email:'',
        token: '',
        dialog: false
      }
    },
    mounted() {
      this.token = window.localStorage.getItem( 'token' )
    },
    methods: {
      createEvent() {
        var payload = {creatorId: 1};

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
