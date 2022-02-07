
import store from './store'
import Vue from 'vue'
import App from './App'
import Web3 from 'web3'
import router from './router'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    // window.web3 = new Web3(window.web3.currentProvider)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }




  router.beforeEach((to, from, next) => {
    const a = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (to.path == "/profile") {
      if (JSON.parse(localStorage.getItem("logged_in")) && !JSON.parse(localStorage.getItem("is_admin"))) {
        next();
      } else {
        if (JSON.parse(localStorage.getItem("logged_in")) && JSON.parse(localStorage.getItem("is_admin")))
          router.push({ name: "admin-home" }).catch(() => { });
        else {
          router.push({ name: "Login" }).catch(() => { });
          // next();
        }
      }
    } else if (to.path == "/admin") {
      if (
        JSON.parse(localStorage.getItem("logged_in")) === true &&
        JSON.parse(localStorage.getItem("is_admin"))
      ) {
        next();
      } else {
        if (JSON.parse(localStorage.getItem("logged_in")))
          router.push({ name: "profile-home" }).catch(() => { });
        else
          router.push({ name: "Login" }).catch(() => { });
      }
    } else if (to.path == "/login") {
      if (!JSON.parse(localStorage.getItem("logged_in"))) {
        next();
        // router.push({ name: "index" }).catch(() => { });
      } else {
        if (JSON.parse(localStorage.getItem("is_admin")))
          router.push({ name: "admin-home" }).catch(() => { });
        else
          router.push({ name: "profile-home" }).catch(() => { });
        next();
      }
    } else {
      next();
    }
  });




  Vue.use(BootstrapVue)
  /* eslint-disable no-new */
  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')
})


// Vue.use(drizzleVuePlugin, { store, drizzleOptions })


