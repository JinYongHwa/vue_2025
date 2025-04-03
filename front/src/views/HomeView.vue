<template>
  <v-container>
    <div class="text-right mr-2 mb-6">
      <mjc-btn fontColor="#00ff00" @click="moveWrite()">글쓰기</mjc-btn>
    </div>
    
    <div class="article" v-for="article in list" @click="moveView(article)">
      <div class="title">
        {{ article.title }}
      </div>
      <div class="write-date">
        {{ dateFormat(article.writeTime) }}
      </div>
      
    </div>
    <v-btn block color="primary" v-if="list.length < count" @click="more()">더보기</v-btn>

  </v-container>
</template>
<script>
import moment from "moment"
import MjcBtn from "@/components/MjcBtn.vue"

export default{
  components:{
    MjcBtn:MjcBtn
  },
  data(){
    return{
      list:[],
      count:0,
      page:1
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
        this.count=response.data.count
      }
    },
    dateFormat(date){
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    moveView(article){
      console.log(article)
      this.$router.push("/view/"+article.no)
    },
    moveWrite(){
      this.$router.push("/write")
    },
    async more(){   //더보기 클릭시 호출되는함수
      this.page++
      var response=await this.$axios.post("/api/articles",{
        page:this.page
      })
      if(response.data.success){
        //기존 글목록에 서버에서 가져온 글목록을 
        //덧붙임
        response.data.list.forEach(article=>{
          this.list.push(article)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

.article{
  border:1px solid #eee;
  border-radius: 8px;
  padding:16px;
  margin-bottom:10px;
  cursor:pointer;
  &:hover{
    box-shadow:0 6px 6px #efe;
  }
}
 .title{
    font-size:24px;
    font-weight:700;
    margin-bottom:5px;

 }
</style>