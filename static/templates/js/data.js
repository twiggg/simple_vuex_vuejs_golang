const Store = new Vuex.Store({
  state: {
    jobSearch: {{.Data}},
    /*{
    	categ:"",
    	job:"",
    	minDur:3,
    	maxDur:24
    }*/
  },
  mutations: {
    setJobSearch (state,search) {
      state.jobSearch=search
    },
  }
})
