<template>
  <div>
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="handelSeven"
    />
    <van-cell-group>
      <van-cell
        title="头像"
        value="内容"
        is-link
      >
        <div slot="default">
          <img
            width="50"
            :src="user.photo"
          >
        </div>
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
      />
      <van-cell
        title="手机"
        :value="user.mobile"
        is-link
      />
      <van-cell
        title="性别"
        :value="user.gender===0 ? '男':'女'"
        is-link
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/requestAPI'
export default {
  name: 'user-self',
  data () {
    return {
      user: {} // 用户信息
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    handelSeven () {

    },
    // 获取用户信息
    async loadUserProfile () {
      this.user = await getUserProfile()
    }
  }
}
</script>

<style>
</style>
