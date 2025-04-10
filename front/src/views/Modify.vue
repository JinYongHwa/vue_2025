<template>
    <v-container>
        <v-text-field v-model="article.title" label="글제목"></v-text-field>
        <v-text-field v-model="article.writerName" label="작성자"></v-text-field>
        <v-textarea v-model="article.body" label="글내용"></v-textarea>
        <div class="text-center">
            <v-btn color="primary" @click="modify()">수정</v-btn>
        </div>
    </v-container>
</template>
<script>
export default{
    data(){
        return {
            article:{
                title:"",
                writerName:"",
                body:""
            }
        }
    },
    mounted(){
        this.getArticle()
    },
    methods:{
        async getArticle(){
            var response=await this.$axios.get("/api/article/"+this.$route.params.no)
            if(response.data.success){
                this.article=response.data.article
            }
        },
        async modify(){
            var response=await this.$axios.post("/api/article/modify",this.article)
            if(response.data.success){  //수정완료시
                this.$router.replace("/view/"+this.$route.params.no)
            }
        }
    }
}
</script>