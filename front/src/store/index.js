import { createStore } from 'vuex'

export default createStore({
  //변수가 저장되는 영역
  state: {
    loginUser:null
  },
  getters: {
  },
  //값을 변경해주는 함수
  mutations: {
    login(state,user){    //로그인된 사용자 저장
      state.loginUser=user
    },
    logout(state){        //로그아웃시 로그인 사용자 정보삭제
      state.loginUser=null
    }
  },
  actions: {
  },
  modules: {
  }
})
