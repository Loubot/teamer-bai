import Vue from 'vue'
import './plugins/vuetify'
import '../public/global.css'
import App from './App.vue'
import router from './router'

import VueResource from 'vue-resource'
import 'axios-progress-bar/dist/nprogress.css'
import { loadProgressBar } from 'axios-progress-bar'
import VeeValidate from 'vee-validate';
 
loadProgressBar()

Vue.use(VueResource)

const phoneOrEmailRule = {
    getMessage(field, args) {
      return `The ${field} must be either a valid phone number or e-mail`;
    },
    validate(value, args) {
      
      // Custom regex for a phone number 
      // (supplied in the SO post: https://stackoverflow.com/q/50033651/2600825)
      const MOBILEREG = /^((1[3578][0-9])+\d{8})$/;
      
      // Check for either of these to return true
      return VeeValidate.Rules.email(value) || MOBILEREG.test(value);
    }
  };
  
  // Extend VeeValidate with our new custom rule
VeeValidate.Validator.extend('phoneOrEmail', phoneOrEmailRule);

Vue.use(VeeValidate)

console.log( window.location.origin )
if ( window.location.hostname === "localhost" ){
    Vue.prototype.$hostname = "http://localhost:5000"
} else {
    Vue.prototype.$hostname = window.location.origin
}



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