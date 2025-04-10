<template>
    <div class="container">
        <div class="join-form">
            <v-text-field v-model="user.id" label="아이디"></v-text-field>
            <v-text-field v-model="user.name" label="이름"></v-text-field>
            <v-text-field v-model="user.password" label="비밀번호" type="password"></v-text-field>
            <v-text-field v-model="user.password2" label="비밀번호 확인" type="password"></v-text-field>
            <div class="text-center">
                <v-btn color="primary" @click="join()">회원가입</v-btn>
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
                name:"",
                password:"",
                password2:""
            }
        }
    },
    methods:{
        async join(){
            if(this.user.id==""){
                alert("아이디를 입력해주세요")
                return
            }
            if(this.user.name==""){
                alert("이름을 입력해주세요")
                return
            }
            if(this.user.password.length<6){
                alert("비밀번호는 6자리 이상 입력해주세요")
                return
            }
            if(this.user.password!=this.user.password2){
                alert("비밀번호를 확인해주세요")
                this.user.password2=""
                return
            }
            //폼검증 완료시
            var response=await this.$axios.post("/api/user/join",this.user)
            if(response.data.success){//회원가입 완료시
                this.$router.push("/login")
            }
            else{   //회원가입 실패시
                alert(response.data.message) //회원가입 실패 이유 알럿
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