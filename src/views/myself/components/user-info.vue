<template>
  <div class="user-info">
    <div
      class="user"
      @click="$router.push({name:'user-self'})"
    >
      <img
        class="user-img"
        :src="userInfo.photo"
      >
      <span>{{userInfo.name}}</span>
    </div>
    <div>
      <van-grid
        :border="false"
        :column-num="4"
      >
        <van-grid-item>
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getUserself } from '@/api/requestAPI'
export default {
  name: 'user-inof',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  created () {
    this.handelUserInfo()
  },
  methods: {
    // 获取用户信息
    async handelUserInfo () {
      this.userInfo = await getUserself()
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  width: 100%;
  height: 500px;
  font-size: 40px;
  .user {
    padding: 40px;
    vertical-align: center;
    .user-img {
      width: 200px;
      height: 200px;
      border-radius: 100%;
    }
  }
}
</style>
