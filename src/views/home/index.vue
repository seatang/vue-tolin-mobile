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
      <van-tab title="标签 1">
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
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
      <van-tab title="标签 7">内容 7</van-tab>
      <van-tab title="标签 8">内容 8</van-tab>
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
export default {
  name: 'Home',
  data () {
    return {
      tabbar: 0,
      tabs: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
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
    async onRefresh () {
      await this.onLoad()
      this.loading = false
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
