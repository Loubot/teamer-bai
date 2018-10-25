<template>
    <v-container fill-height>
        <v-layout column fill-height align-center>

            <!-- Match create-->
            <v-flex align-center class="center_text">


                <h3>Create a match</h3>
                <v-form class="vw100">
                    <v-layout row>
                        <v-flex xs-6>
                            <v-menu ref="menu1" :close-on-content-click="true" v-model="menu1" :nudge-right="40" :return-value.sync="date.startDate" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field slot="activator" v-model="date.startDate" label="Start date" prepend-icon="event" readonly></v-text-field>
                                <v-date-picker v-model="date.startDate" @input="$refs.menu1.save(date.startDate); setEndDate( date.startDate )"></v-date-picker>

                            </v-menu>
                        </v-flex>

                        <v-flex xs-6>
                            <v-menu ref="menu3" :close-on-content-click="false" v-model="menu3" :nudge-right="40" :return-value.sync="date.startTime" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field slot="activator" v-model="date.startTime" label="Start time" prepend-icon="access_time" readonly></v-text-field>
                                <v-time-picker v-if="menu3" v-model="date.startTime" format="24hr" @change="$refs.menu3.save(date.startTime);addOneHour( date.startTime )"></v-time-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex>
                            <v-menu ref="menu2" :close-on-content-click="false" v-model="menu2" :nudge-right="40" :return-value.sync="date.endDate" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                <v-text-field slot="activator" v-model="date.endDate" label="End date" prepend-icon="event" readonly></v-text-field>
                                <v-date-picker v-model="date.endDate" @input="$refs.menu2.save(date.endDate)"></v-date-picker>

                            </v-menu>
                        </v-flex>

                        <v-flex xs6>
                            <v-menu ref="menu4" :close-on-content-click="false" v-model="menu4" :nudge-right="40" :return-value.sync="date.endTime" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                <v-text-field slot="activator" v-model="date.endTime" label="End time" prepend-icon="access_time" readonly></v-text-field>
                                <v-time-picker v-if="menu4" v-model="date.endTime" format="24hr" @change="$refs.menu4.save(date.endTime)"></v-time-picker>
                            </v-menu>
                        </v-flex>


                    </v-layout>

                    <v-btn color="success" v-on:click="createEvent()">Create an event</v-btn>

                </v-form>

            </v-flex> <!-- End of match create -->

            <v-flex>
                <v-btn primary dark @click="dialog = true">Add a user</v-btn>
            </v-flex>

            <!-- Create player dialog -->
            <v-dialog v-model="dialog" width="500">



                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                        New player details
                    </v-card-title>

                    <v-form v-model="valid" ref="playerForm">
                        <v-text-field v-model="phone" :rules="nameRules" :counter="10" label="Phone number" mask="###-#########" append-icon="phone" required></v-text-field>

                        <v-text-field v-model="firstName" label="First Name" required></v-text-field>

                        <v-text-field v-model="lastName" label="Last Name" required></v-text-field>

                        <v-text-field v-model="email" label="email" :rules="emailRules" required></v-text-field>
                    </v-form>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="saveUser(); dialog=!dialog">
                            Save User
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> <!-- End create player dialog -->

            <!-- Events -->
            <v-card class="width_75 center_text" >
                <v-toolbar color="teal" dark>
                    <v-toolbar-side-icon></v-toolbar-side-icon>

                    <v-toolbar-title>Events</v-toolbar-title>
                </v-toolbar>

                <v-divider></v-divider>

                <v-list subheader two-line class="center_text">
                    <!-- <v-subheader>Hangout notifications</v-subheader> -->

                    <v-list-tile v-for="(event) in events" v-bind:key="event.id">
                        <v-list-tile-action :key="event.id">
                            <!-- <v-checkbox v-model="event.id" @click="addId( event.id )"></v-checkbox> -->
                            <p @click="invite_dialog = !invite_dialog; getEvent( event )"> {{ event.startTime | timeFormat }}</p>
                        </v-list-tile-action>

                        <!-- <v-list-tile-content>
                            <v-list-tile-title>Notifications</v-list-tile-title>
                            <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
                        </v-list-tile-content> -->
                    </v-list-tile>
                </v-list>

                <!-- <v-flex class="center_text">
                    <v-btn color="info" v-on:click="inviteAll(); invite_dialog = !invite_dialog">Invite all</v-btn>
                </v-flex> -->

            </v-card> <!-- End of events -->

            <!-- Invite dialog -->
            <div class="text-xs-center">
                <v-dialog v-model="invite_dialog" width="500">
                    <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>
                            Invite Players
                        </v-card-title>

                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs6 >
                                         All Players
                                        <v-list two-line dark>
                                           
                                            <template v-for="user in users">

                                                <v-list-tile :key="user.id">
                                                    <v-layout row>
                                                        <v-flex >
                                                            {{ user.firstName || user.email }}
                                                        </v-flex>
                                                        <v-flex >
                                                            <v-checkbox v-model="invitees" :value='user.id' class='float_right'></v-checkbox>
                                                        </v-flex>
                                                    </v-layout>

                                                </v-list-tile>

                                            </template>

                                        </v-list>
                                    </v-flex>

                                    <v-flex xs6 >
                                        Confirmed players
                                        <v-list two-line dark>
                                            <template  v-for="user in event.Users">
                                                
                                                <v-list-tile  :key="user.id">
                                                    {{ user.firstName || user.email }}
                                                </v-list-tile>
                                                
                                            </template>
                                        </v-list>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="success" flat @click="inviteAll( event.id, invitees )">Invite all</v-btn>
                            <v-btn color="primary" flat @click="invite_dialog = false;">Close</v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div> <!-- end of invite dialog -->


            <!-- list of players -->
            <v-card>
                <v-toolbar color="teal" dark>
                    <v-toolbar-side-icon></v-toolbar-side-icon>

                    <v-toolbar-title>Possible players</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-list>
                    <v-list-group>
                        <v-list-tile v-for="user in users" :key="user.phone" @click="">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ user.firstName || user.phone || user.email }}</v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>{{ user.phone }}</v-icon>
                            </v-list-tile-action>
                            <!-- <v-list-tile-action>
                                <v-list-tile-action-text>{{ user.phone }}</v-list-tile-action-text>
                                <v-icon v-if="user.firstName" color="grey lighten-1">
                                    star_border
                                </v-icon>

                                <v-icon v-else color="yellow darken-2">
                                    star
                                </v-icon>
                            </v-list-tile-action> -->
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card> <!-- end of list of players -->

        </v-layout>

    </v-container>

</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
    export default {
        data() { //data
            return {
                rules: [],
                valid: false,
                nameRules: [],
                emailRules: [],
                events: [],
                users: [],
                event: {},
                eventIds: [],
                invitees: [],
                date: {
                    startTime: null,
                    endTime: null,
                    startDate: '',
                    endDate: ''
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
                dialog: false,
                invite_dialog: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ]
            };
        }, //end of data
        mounted() {
            this.token = window.localStorage.getItem("token");
            this.$http
                .get(
                    "http://localhost:5000/users", {
                        headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer " + this.token
                        }
                    }
                )
                .then(function(res) {
                    console.log(res.data);
                    this.users = res.data
                })
                .catch(function(err) {
                    console.log(err);
                });
            this.$http
                .get(
                    "http://localhost:5000/events", {
                        headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer " + this.token
                        }
                    }
                )
                .then(function(res) {
                    console.log(res.data);
                    this.events = res.data
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        methods: {
            getEvent(event) {
                this.event = event
                this.$http.get(
                    "http://localhost:5000/event/" + event.id, {
                        headers: {
                            "content-type": "application/json",
                            Authorization: "Bearer " + this.token
                        }
                    }
                ).then(function(res) {
                    console.log(res.data)
                    this.event = res.data
                }).catch(function(err) {
                    console.log(err)
                })
            },
            addOneHour(t) {
                var time = 0
                time = t.substr(0, t.indexOf(':'))
                time = parseInt(time) + 1
                this.date.endTime = time.toString() + ":00"
                console.log(this.date.endTime)
            },
            setEndDate(d) {
                this.date.endDate = d
            },
            inviteAll(id) {
                this.$http.post(
                        "http://localhost:5000/invitation/event/" + id,

                        this.invitees, {
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
            addId(id) {
                console.log(id)
                this.eventIds.push(id)
                console.log(this.eventIds)
            },
            createEvent() {
                this.$http
                    .post(
                        "http://localhost:5000/event",
                        this.date, {
                            headers: {
                                "content-type": "application/json",
                                Authorization: "Bearer " + this.token
                            }
                        }
                    )
                    .then(function(res) {
                        this.events.push(res.body)
                        console.log(res);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },

            saveUser() {
                this.$http
                    .post(
                        "http://localhost:5000/add-user", {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            phone: this.phone,
                            email: this.email
                        }, {
                            headers: {
                                "content-type": "application/json",
                                Authorization: "Bearer " + this.token
                            }
                        }
                    )
                    .then(function(res) {
                        console.log(res);
                        this.users.push(res.data)
                        this.$refs.playerForm.reset()
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
        text-align: center !important;
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

    .vw100 {
        width: 100% !important;
    }

    .float_right {
        float: right !important;
    }
    .width_75{
        width: 75%;
    }
</style>