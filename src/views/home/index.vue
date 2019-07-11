<template>
  <div>
    <van-nav-bar
      title="首页"
      fixed
    >
    </van-nav-bar>

    <van-tabs
      v-model="tabs"
      animated
      color="#3399ff"
      class="home-header-tabs"
    >
      <van-tab
        :title="channelItem.name"
        v-for="channelItem in channelsList"
        :key="channelItem.id"
      >
        <van-pull-refresh
          v-model="loading"
          @refresh="onRefresh"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in list"
              :key="item"
              :title="item"
            />
          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>

    <van-tabbar v-model="tabbar">
      <van-tabbar-item
        to="/"
        icon="wap-home"
      >首页</van-tabbar-item>
      <van-tabbar-item
        to="/quers"
        icon="comment-o"
      >问答</van-tabbar-item>
      <van-tabbar-item
        to="/video"
        icon="video-o"
      >视频</van-tabbar-item>
      <van-tabbar-item
        to="/my"
        icon="contact"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getchannelsList } from '@/api/channelsAPI'
export default {
  name: 'Home',
  data () {
    return {
      tabbar: 0,
      tabs: 0,
      list: [],
      loading: false,
      finished: false,
      channelsList: [] // 频道列表
    }
  },
  created () {
    this.init()
  },

  methods: {
    // 初始化数据
    init () {
      this.getChannelsList()
    },
    // 上划加载数据
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下来更新数据
    async onRefresh () {
      await this.onLoad()
      this.loading = false
    },
    // 获取频道列表
    async getChannelsList () {
      try {
        // 读取本地频道列表
        const localChannels = window.localStorage.getItem('channels')
        if (localChannels) {
          this.channelsList = localChannels
        } else {
          // 请求服务器端频道列表
          this.channelsList = (await getchannelsList()).channels
          console.log(this.channelsList)
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-header-tabs {
  margin-bottom: 100px;
}
.home-header-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}

.home-header-tabs /deep/ .van-tabs__content {
  margin-top: 92px;
}
</style>
