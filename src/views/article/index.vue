<template>
  <div>
    <van-nav-bar
      title="海棠头条"
      left-arrow
    >
      <div slot="left">
        <van-button
          round
          type="primary"
          size="small"
          @click="$router.back()"
        >返回</van-button>
      </div>
    </van-nav-bar>
    <!-- 文章标题 -->
    <strong>{{ article.title }}</strong>
    <!-- 作者信息组件 -->
    <article-user :article="article" />
    <!-- 文章内容 -->
    <div
      class="article-content"
      v-html="article.content"
    ></div>
    <!-- 文章更多操作组件 -->
    <more-action />
    <!-- 留言列表组件 -->
    <comment-list />
  </div>
</template>

<script>
import { getArticleItem } from '@/api/articlesAPI'
import articleUser from './components/article-user'
import commentList from './components/comment-list'
import moreAction from './components/more-action'
export default {
  name: 'ArticleItem',
  data () {
    return {
      article: {} // 文章详细信息
    }
  },
  created () {
    this.getArticle()
  },
  computed: {
    // 获取路由传参
    articleId () {
      return this.$route.params.articleId
    }
  },
  methods: {
    // 获取文章详细信息
    async getArticle () {
      const data = await getArticleItem(this.articleId)
      this.article = data
      console.log(data)
    }
  },
  components: {
    articleUser, // 文章作者组件
    commentList, // 留言列表组件
    moreAction // 文章更多操作组件
  }
}
</script>

<style lang="less" scoped>
.article-content {
  word-wrap: break-word;
  word-break: normal;
}
</style>
