<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="tabbar">
      <van-tabbar-item
        to="/"
        icon="wap-home"
      >首页</van-tabbar-item>
      <van-tabbar-item
        to="/questions"
        icon="comment-o"
      >问答</van-tabbar-item>
      <van-tabbar-item
        to="/myvideo"
        icon="video-o"
      >视频</van-tabbar-item>
      <van-tabbar-item
        to="/myself"
        icon="contact"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      tabbar: 0
    }
  }
}
</script>

<style>
</style>
