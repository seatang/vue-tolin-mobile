<template>
  <div class="robot">
    <div>
      <van-nav-bar
        title="聊天机器人"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
      />
      <ul class="mess-ul">
        <li
          class="mess-li"
          v-for="item in messageList"
          :key="item.id.toString()"
        >
          <span class="mess-span">{{item.message}}</span>
          <img
            class="mess-img"
            :src="item.photo"
          >
        </li>
      </ul>
    </div>
    <div class="web-btn">
      <van-cell-group>
        <van-field
          v-model="btnMessage"
          center
          clearable
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="handleMessage()"
          >发送</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getUserself } from '@/api/requestAPI'
import io from 'socket.io-client'
export default {
  name: 'web-socket',
  data () {
    return {
      btnMessage: '', // 发送的消息
      messageList: [], // 消息列表
      userInfo: {}, // 用户信息
      scoket: null
    }
  },
  created () {
    this.loandUser()
    this.initWebsocket()
  },
  methods: {
    // 获取用户信息
    async loandUser () {
      const data = await getUserself()
      this.userInfo = data
    },
    // 发送消息
    handleMessage () {
      this.messageList.push({
        id: new Date().getTime(),
        name: this.userInfo.name,
        photo: this.userInfo.photo,
        message: this.btnMessage
      })
      // webscoket建立成功是调用
      this.scoket.on('conntect', () => {
        console.log('建立成功')
        this.scoket.emit('message', {
          msg: this.btnMessage,
          timestamp: Date.new()
        })
      })
      // 服务器返回的消息
      this.scoket.on('message', data => {
        console.log(data)
      })
    },
    initWebsocket () {
      // 建立webscoket的连接
      const scoket = io('http://ttapi.research.itcast.cn', {
        query: {
          token: this.$store.state.user.token
        }
      })
      this.scoket = scoket
    }
  }
}
</script>

<style lang="less" scoped>
.web-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.mess-ul {
  margin-bottom: 160px;
}
.mess-li {
  text-align: right;
  padding: 30px;
  .mess-span {
    display: inline-block;
    background-color: rgb(36, 150, 170);
    text-align: left;
    border-radius: 50px;
    font-size: 36px;
    padding: 0 20px;
  }
  .mess-img {
    vertical-align: bottom;
    width: 80px;
    border-radius: 100%;
  }
}
</style>
