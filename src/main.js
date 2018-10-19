import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import VueResource from 'vue-resource'
import 'axios-progress-bar/dist/nprogress.css'
import { loadProgressBar } from 'axios-progress-bar'
 
loadProgressBar()

Vue.use(VueResource)

Vue.config.productionTip = false

Vue.filter( 'timeFormat', function(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      date = new Date( date )
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')