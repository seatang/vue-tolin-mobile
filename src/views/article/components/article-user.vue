<template>
  <div class="user">
    <div class="article-user">
      <img
        class="img"
        :src="article.aut_photo"
      >
      <div class="user-info">
        <p>作者：{{article.aut_name}}</p>
        <p>{{article.pubdate | relativeTime}}</p>
      </div>
    </div>
    <div>
      <van-button
        :type="article.is_followed ? 'default': 'danger'"
        :loading="isfollowingLoading"
        @click="handlefollowingsUser"
      >{{article.is_followed ? '已关注':'+ 关注'}}</van-button>
    </div>
  </div>
</template>

<script>
import { followingsUser } from '@/api/requestAPI'
export default {
  name: 'articleUser',
  props: {
    article: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      isfollowingLoading: false // 关注按钮状态
    }
  },
  methods: {
    // 关注用户
    async handlefollowingsUser () {
      // 用户是否登录
      try {
        const { followed } = this.article
        const articleUser = {}
        Object.assign(articleUser, this.article)
        // 判断是否关注
        if (followed) {
          // 已登录
          return
        } else {
          // 未登录
          this.isfollowingLoading = true
          await followingsUser(this.article.aut_id)
          // 请求成功，改变关注状态
          articleUser.is_followed = true
          this.$emit('update:article', articleUser)
          this.isfollowingLoading = false
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  .article-user {
    display: flex;
    align-items: center;
    font-size: 26px;
    .user-info {
      margin-left: 30px;
    }
    .img {
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
}
</style>
