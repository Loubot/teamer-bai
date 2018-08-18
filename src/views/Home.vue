<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form v-model="valid">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-btn color="success" v-on:click="createEvent()">Submit</v-btn>
        </v-form>
        
      </v-layout>
    </v-slide-y-transition>
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
        email:''
      }
    },
    mounted() {
      console.log( this )
    },
    methods: {
      createEvent() {
        this.$http.post( 'http://localhost:5000/event', 
        { 
          creatorId: '3'
        },{
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then( function( res ) {
          console.log( JSON.stringify( res.data ) )
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
