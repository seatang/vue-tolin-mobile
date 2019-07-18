<template>
  <div class="more-action">
    <span>
      <van-button
        icon="star-o"
        :type="article.attitude===1 ? 'danger':'default'"
        :loading="likeArticleLoading"
        :disabled="likeArticleLoading"
        @click="handleLikingsArticle"
      >{{article.attitude===1 ? '已赞':'赞'}}</van-button>
    </span>
    <span>
      <van-button
        icon="like-o"
        :type="article.attitude===0 ? 'danger':'default'"
        :disabled="dislikesArticleLoading"
        :loading="dislikesArticleLoading"
        @click="handleDislikesArticle"
      >{{article.attitude===0 ? '取消不喜欢':'不喜欢'}}</van-button>
    </span>
  </div>
</template>

<script>
import { likings, unLikings, unDislikesArticle, dislikesArticle } from '@/api/articlesAPI'
export default {
  name: 'moreAction',
  props: {
    article: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      likeArticleLoading: false, // 点赞按钮加载状态
      dislikesArticleLoading: false // 不喜欢按钮加载状态
    }
  },
  methods: {
    // 点赞文章
    async handleLikingsArticle () {
      try {
        // 检查用户是否登录
        if (!this.$checkUser()) {
          return
        }
        this.likeArticleLoading = true
        const artId = this.article.art_id
        const likeArticle = {}
        Object.assign(likeArticle, this.article)
        console.log(artId)
        // 判断点赞状态
        if (this.article.attitude === 1) {
          // 已赞
          await unLikings(artId)
          likeArticle.attitude = -1
          this.$emit('update:article', likeArticle)
        } else {
          // 未赞
          await likings(artId)
          likeArticle.attitude = 1
          this.$emit('update:article', likeArticle)
        }
      } catch (error) {
        this.$toast('操作失败')
      }
      this.likeArticleLoading = false
    },
    // 不喜欢文章
    async handleDislikesArticle () {
      try {
        // 检查用户是否登录
        if (!this.$checkUser()) {
          return
        }
        this.dislikesArticleLoading = true
        const artId = this.article.art_id
        const likeArticle = {}
        Object.assign(likeArticle, this.article)
        console.log(artId)
        // 判断不喜欢文章状态
        if (this.article.attitude === 0) {
          // 不喜欢
          await unDislikesArticle(artId)
          likeArticle.attitude = -1
          this.$emit('update:article', likeArticle)
        } else {
          // 取消不喜欢
          await dislikesArticle(artId)
          likeArticle.attitude = 0
          this.$emit('update:article', likeArticle)
        }
      } catch (error) {
        this.$toast('操作失败')
      }
      this.dislikesArticleLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
