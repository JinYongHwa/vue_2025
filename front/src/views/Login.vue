<template>
    <div class="container">
        <div class="join-form">
            <v-text-field v-model="user.id" label="아이디"></v-text-field>
            <v-text-field v-model="user.password" label="비밀번호" type="password"></v-text-field>
            <div class="text-center">
                <v-btn color="primary" @click="login()">로그인</v-btn>
                <v-btn to="/join" class="ml-2">회원가입</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            user:{
                id:"",
                password:""
            }
        }
    },
    methods:{
        async login(){
            var response=await this.$axios.post("/api/user/login",this.user)
            if(response.data.success){
                //로그인 완료시
                this.$router.push("/")
            }
            else{       //로그인 실패시
                alert(response.data.message)
            }
        }
    }
}
</script>
<style scoped lang="less">
.container{
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .join-form{
        width:400px;
    }
}
</style>