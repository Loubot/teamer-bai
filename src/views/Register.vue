<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <v-form v-model="valid">

                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                    <v-text-field v-model="password" :type="'password'" :rules="nameRules" label="Password" required></v-text-field>

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
                password: '',
                email: ''
            }
        },
        mounted() {
            console.log(this)
        },
        methods: {
            createEvent() {

                this.$http.post(
                    this.$hostname + '/register', {
                        email: this.email,
                        password: this.password
                    }, {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
                ).then(function(res) {
                    window.localStorage.setItem('token', res.body[0])
                    console.log( res.body )
                    console.log(window.localStorage.getItem( 'token') )
                    
                    this.$router.push({
                        path: '/'
                    })
                }).catch(function(err) {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    h1,
    h2 {
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