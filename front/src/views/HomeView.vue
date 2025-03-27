<template>
  <v-container>
    <div v-for="article in list">
      {{ article.title }}
    </div>
  </v-container>
</template>
<script>
export default{
  data(){
    return{
      list:[]
    }
  },
  mounted(){
    this.getArticleList()
  },
  methods:{
    async getArticleList(){
      var response=await this.$axios.post("/api/articles")
      if(response.data.success){
        this.list=response.data.list
      }
    }
  }
}
</script>