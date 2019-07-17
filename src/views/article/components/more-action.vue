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
        type="danger"
      >不喜欢</van-button>
    </span>
  </div>
</template>

<script>
import { likings, unLikings } from '@/api/articlesAPI'
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
      likeArticleLoading: false // 点赞按钮加载状态
    }
  },
  methods: {
    // 点赞文章
    async handleLikingsArticle () {
      try {
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
