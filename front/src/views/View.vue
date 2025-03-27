<template>
    <v-container>
        <div class="title">{{ article.title }}</div>
        <div class="writer-name">{{ article.writerName }}</div>
        <div class="body">{{ article.body }}</div>
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
            
        }
    }
}
</script>
<style lang="less">
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
