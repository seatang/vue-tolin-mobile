<template>
  <div>
    <!-- 首页 -->
    <van-nav-bar
      title="首页"
      fixed
      class="nav-bar"
    >
    </van-nav-bar>
    <!-- 频道 -->
    <van-tabs
      v-model="articlesChannelIndex"
      animated
      class="home-header-tabs"
    >
      <!-- 编辑频道 -->
      <div
        slot="nav-right"
        class="nav-right"
        @click="popupChannle = true"
      >
        <van-icon name="bars" />
      </div>
      <!-- 频道文章 -->
      <van-tab
        :title="channelItem.name"
        v-for="channelItem in channelsList"
        :key="channelItem.id"
      >
        <!-- 下拉加载最新数据 -->
        <van-pull-refresh
          v-model="channelItem.downLoading"
          @refresh="onRefresh"
        >
          <!-- 上划加载 -->
          <van-list
            v-model="channelItem.upLoading"
            :finished="channelItem.upFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in channelItem.articles"
              :key="item.art_id"
              :title="item.title"
            />
          </van-list>
        </van-pull-refresh>

      </van-tab>
    </van-tabs>
    <!-- 弹出层，编辑频道 -->
    <home-channel
      v-model="popupChannle"
      :user-channel="channelsList"
      :channel-index="articlesChannelIndex"
    ></home-channel>
  </div>
</template>

<script>
import homeChannel from './components/channel'
import { getUserChannelsList } from '@/api/channelsAPI'
import { getArticlesList } from '@/api/articlesAPI'
export default {
  name: 'Home',
  data () {
    return {
      channelsList: [], // 频道列表
      articlesChannelIndex: 0, // 频道索引
      popupChannle: false
    }
  },
  created () {
    this.init()
  },
  computed: {
    // 添加新属性articlesChannel，获取当前频道的id
    articlesChannel () {
      return this.channelsList[this.articlesChannelIndex]
    }
  },

  methods: {
    // 初始化数据
    init () {
      this.loadChannelsList()
    },
    // 上划加载数据
    async onLoad () {
      await this.$sleep(500)
      let data = []
      data = await this.loadActiclesChannelList()
      // 判断数据是否加载完毕
      if (!data.pre_timestamp && !data.results.length) {
        // 停止数据加载
        this.articlesChannel.upLoading = false
        //  提示数据加载完毕状态
        this.articlesChannel.upFinished = true
        return
      }
      // 如果本次请求没有数据，则请求上次数据
      if (data.pre_timestamp && !data.results.length) {
        this.articlesChannel.timestamp = data.pre_timestamp
        data = await this.loadActiclesChannelList()
      }
      // 请求到数据，更新时间戳，便于下次请求
      this.articlesChannel.timestamp = data.pre_timestamp
      // 获取最新的数据push到频道文章中
      this.articlesChannel.articles.push(...data.results)
      // 数据上拉加载完停止loading
      this.articlesChannel.upLoading = false
    },
    // 下拉更新数据
    async onRefresh () {
      await this.$sleep(800)
      // 备份当前时间戳
      const timestamp = this.articlesChannel.timestamp
      // 更新当前时间戳，获取最新数据
      this.articlesChannel.timestamp = Date.now()
      const data = await this.loadActiclesChannelList()
      // 判断是否有最新数据,获取到最新数据
      if (data.results.length) {
        // 重置频道文章数据列表
        this.articlesChannel.articles = data.results
        // 重置时间戳，便于下次请求
        this.articlesChannel.timestamp = data.pre_timestamp
        // 更新数据，数据一屏幕铺不满，再次加载数据
        this.onLoad()
      } else {
        // 没有新数据，还原时间戳
        this.articlesChannel.timestamp = timestamp
        // 没有最新数
        this.$toast('没有最新数据')
      }
      // 取消下拉更新状态
      this.articlesChannel.downLoading = false
    },
    // 获取频道列表
    async loadChannelsList () {
      try {
        let channelsList = []
        const { user } = this.$store.state
        // 已登录,请求频道列表
        if (user) {
          const data = (await getUserChannelsList()).channels
          channelsList = data
        } else {
          // 未登录,读取本地频道列表，如果没有，再次请求
          const localChannels = JSON.parse(window.localStorage.getItem('channels'))
          if (localChannels) {
            channelsList = localChannels
          } else {
            const data = (await getUserChannelsList()).channels
            channelsList = data
          }
        }
        // 手动添加频道文章以及文章的状态
        channelsList.forEach(item => {
          item.articles = [] // 频道文章列表
          item.timestamp = Date.now() // 存储下一个时间戳
          item.downLoading = false // 下拉更新状态
          item.upLoading = false // 上划加载数据状态
          item.upFinished = false // 文章列表是否加载完毕
        })
        this.channelsList = channelsList
      } catch (error) {
        // console.log(error)
        this.$toast('获取数据失败')
      }
    },
    // 获取频道文章数据列表
    async loadActiclesChannelList () {
      try {
        // 从添加的属性articlesChannel中获取请求参数
        const { id: channelId, timestamp } = this.articlesChannel
        const data = await getArticlesList({ channelId, timestamp, withTop: 1 })
        return data
      } catch (error) {
        console.log(error)
      }
    }
  },
  // 监视用户是否登录，因为路由已经换成，不在调用钩子函数,需要监视用户登录状态
  watch: {
    async '$store.state.user' () {
      // 需要重新初始化数据
      this.init()
      // 设置上划状态为true，重新获取频道文章数据
      this.articlesChannel.upLoading = true
      await this.onLoad()
    }
  },
  components: {
    homeChannel
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
.home-header-tabs .nav-right {
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 5px;
}
</style>
