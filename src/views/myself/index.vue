<template>
  <div>
    <un-login v-if="!$store.state.user" />
    <user-info v-else />
    <div>
      <van-cell
        title="消息通知"
        is-link
      />
      <van-cell
        title="用户反馈"
        is-link
      />
      <van-cell
        title="小智同学"
        is-link
        @click="$router.push({name:'web-socket'})"
      />
    </div>
  </div>
</template>

<script>
import unLogin from './components/unLogin'
import userInfo from './components/user-info'
export default {
  name: 'myself',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    unLogin,
    userInfo
  }
}
</script>

<style scoped lang="less">
</style>
