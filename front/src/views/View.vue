<template>
    <v-container>
        <div class="title">{{ article.title }}</div>
        <div class="hits">조회수 {{ article.hits }}</div>
        <div class="writer-name">{{ article.writerName }}</div>
        <div class="body">{{ article.body }}</div>


        <div class="text-center mt-2">
            <v-btn to="/">목록</v-btn>
            <v-btn class="ml-2 mr-2" @click="moveModify()">수정</v-btn>
            <v-btn color="error" @click="remove()">삭제</v-btn>
        </div>
    </v-container>
</template>
<script>
export default{
    data(){
        return{
            article:{
                title:"제목",
                writerName:"작성자",
                body:"내용"
            }
        }
    },
    mounted(){
        var no=this.$route.params.no
        console.log(no)
        this.getArticle(no)
    },
    methods:{
        async getArticle(no){
            var response=await this.$axios.get("/api/article/"+no)
            console.log(response.data)
            if(response.data.success){      //백엔드에서 응답이 정상처리면
                //서버에서 보내준 데이터를 article에 적용
                this.article=response.data.article
            }
            
        },
        async remove(){
            if(!window.confirm("정말삭제하겠습니까?")){
                return
            }
            //정말삭제하겠습니까? 예누름 =>삭제 로직
            var response=await this.$axios.delete("/api/article/"+this.$route.params.no)
            if(response.data.success){      //삭제성공시
                this.$router.push("/")
            }
        },
        moveModify(){
            this.$router.push("/modify/"+this.$route.params.no)
        }
    }
}
</script>
<style scoped lang="less">
@color: #0000ff;

.title{
    color:@color;
    font-size:24px;
    font-weight:700;
    border-bottom :1px solid @color;
    margin-bottom:16px;
}
.writer-name{
    color:#999;
    text-align:right;
}
.body{
    font-size:16px;
    min-height:500px;
    padding:16px;
    background:#eee;
}

</style>
