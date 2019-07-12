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
          v-for="value in 8"
          :key="value"
          text="文字"
        >
          <span class="text">文字</span>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
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
      isEdit: false // 是否编辑
    }
  },
  methods: {

  },
  components: {

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
