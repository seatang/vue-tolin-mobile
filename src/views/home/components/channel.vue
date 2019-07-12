<template>
  <van-popup
    :value="value"
    round
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '95%' }"
    get-container="body"
  >
    <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            round
            size="mini"
            @input="$emit('input',$event)"
          >关闭</van-button>
          <van-button
            type="info"
            plain
            round
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit ? '完成':'编辑' }}</van-button>
        </div>
      </div>
      <van-grid
        class="channel-content"
        :gutter="10"
        clickable
        square
      >
        <van-grid-item
          v-for="(item,index) in userChannel"
          :key="item.id"
        >
          <span
            class="text"
            :class="{ active : index==channelIndex}"
          >{{ item.name }}</span>
          <van-icon
            class="close-icon"
            name="close"
            v-show="isEdit"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">推荐频道</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid
        class="channel-content"
        :gutter="10"
        clickable
        square
      >
        <van-grid-item
          v-for="item in recommendChannel"
          :key="item.id"
          @click="handleAddChannels(item)"
        >
          <span class="text">{{ item.name }}</span>
          <van-icon
            class="close-icon"
            name="add-o"
          />
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannelsList } from '@/api/channelsAPI'
export default {
  name: 'Homechannel',
  props: {
    // 接收弹出层是否显示
    value: {
      type: Boolean,
      default: false
    },
    // 接收频道数据
    userChannel: {
      type: Array,
      default: () => []
    },
    // 接收频道选中的索引
    channelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isEdit: false, // 是否编辑
      allChannels: [] // 全部数据列表
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 组件数据初始化
    init () {
      this.loadAllChannels()
    },
    // 加载全部频道列表
    async loadAllChannels () {
      const data = await getAllChannelsList()
      // 这里应该对获取的结果遍历添加新属性进行封装
      // 手动添加频道文章以及文章的状态
      data.channels.forEach(item => {
        item.articles = [] // 频道文章列表
        item.timestamp = Date.now() // 存储下一个时间戳
        item.downLoading = false // 下拉更新状态
        item.upLoading = false // 上划加载数据状态
        item.upFinished = false // 文章列表是否加载完毕
      })
      this.allChannels = data.channels
    },
    // 添加推荐频道到用户频道中
    handleAddChannels (item) {
      // this.userChannel.push(item)
      // 新增数组，将父组件的数据进行拷贝
      const channel = this.userChannel.slice(0)
      // 在新数组中添加推荐频道
      channel.push(item)
      // 再将添加后的数组，返回给父组件，由父组件来修改用户的频道
      this.$emit('update:user-channel', channel)
    }
  },
  computed: {
    // 过滤掉全部频道中的用户选中的频道
    recommendChannel () {
      // 将用户频道进行遍历，取出id
      const userRecommendChannel = this.userChannel.map(item => item.id)
      return this.allChannels.filter(item => !userRecommendChannel.includes(item.id))
    }
  }
}
</script>

<style scoped lang="less">
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    .title {
      font-size: 30px;
      font-weight: 600;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .channel-content {
    .text {
      font-size: 24px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 40px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
