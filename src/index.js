require('normalize.css')
//require('./css/main.css')

const Vue = require('vue')
const VueRouter = require('vue-router')
const Vuex = require('vuex')
const Axios = require('axios')

Vue.use(VueRouter)
/*Vue.use(Vuex)*/
Vue.prototype.$http = Axios


/*
const store = new Vuex.Store({
  state: {
    jobSearch: {
    	categ:"",
    	job:"",
    	minDur:3,
    	maxDur:24
    }
  },
  mutations: {
    setJobSearch (state,search) {
      state.jobSearch=search
    },
  }
})
*/
const store = Store

/*
this.$http.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
*/

console.log("store:",store)

var isTest = !!document.getElementById("test");







if (isTest){
console.log("----- TEST ------")
  //declare root vue instance and attach it to 'app' div
const appli = new Vue({
  el: '#test',
  template:'<div><button v-on:click="update">Update Button</button>\
    <br>\
    <br>\
    <span>{{ message }}</span>\
    <br>\
    <span>{{ jobSearch }}</span>\
    <br></div>',
  // provide the store using the "store" option.
  // this would inject the store instance to all child components.
  store,
  data: {
    message: 'Hello Vue!',
    updated: false,
    jobSearchVal1: {
      categ: "the categ",
      job: "the job",
      minDur: 3,
      maxDur: 24
    },
    jobSearchVal2: {
      categ: "the new categ",
      job: "the new job",
      minDur: 300,
      maxDur: 2400
    },
  },
  computed: {
    jobSearch() {
      console.log("jobSearch:")
      console.log(Store.state.jobSearch)
      return Store.state.jobSearch
    },
  },
  methods: {
    update: function() {
      //console.log("update button clicked!")
      this.updated = !this.updated
      if (this.updated) {
        //this.$store.commit('setJobSearch', this.jobSearchVal2)
        Store.commit('setJobSearch', this.jobSearchVal2)
      } else {
        //this.$store.commit('setJobSearch', this.jobSearchVal1)
        Store.commit('setJobSearch', this.jobSearchVal1)
      }
    }, // function end
  } //methods end
})

console.log("root vue instance attached")
}



