<template>
  <v-app>
    <v-main>
      <div class="menu-bar">
        <div class="logo">MJC-블로그</div>
        <div class="blank"></div>
        <v-btn color="primary" to="/login" v-if="!$store.state.loginUser">로그인</v-btn>
        <div v-if="$store.state.loginUser" class="user-name">{{ $store.state.loginUser.name }}</div>
        <v-btn @click="logout()" color="primary" v-if="$store.state.loginUser">로그아웃</v-btn>
      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
    user:null
  }),

  mounted(){
    this.getUserInfo()
  },
  methods:{
    async getUserInfo(){
      var response=await this.$axios.post("/api/user/info")
      //로그인이 되어있는경우
      if(response.data.isLogin){
        // this.user=response.data.user
        this.$store.commit("login",response.data.user)
      }
    },
    async logout(){
      if(!confirm("정말 로그아웃하시겠습니까?")){
        return
      }
      var response=await this.$axios.post("/api/user/logout")
      if(response.data.success){
        this.$store.commit("logout")
      }
    }
  }
}
</script>

<style scoped lang="less">
  .menu-bar{
    display:flex;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    width:100%;
    padding:16px 24px;
    box-shadow: 0 6px 6px #eee;
    .logo{
      font-size:24px;
      font-weight:600;
    }
    .blank{
      flex: 1;
    }
    .user-name{
      font-size:16px;
      margin-right:10px;
    }
  }
</style>
