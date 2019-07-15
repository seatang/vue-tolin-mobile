<template>
  <div>
    <!-- 搜索结果 -->
    <van-nav-bar
      title="搜索结果"
      left-arrow
    >
      <div slot="left">
        <van-button
          round
          type="primary"
          size="small"
          @click="$router.back()"
        >返回</van-button>
      </div>
    </van-nav-bar>

    <!-- 数据列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in searchResulList"
        :key="item.art_id.toString()"
        :title="item.title"
        class="cell"
      >
        <div slot="label">
          <template v-if="item.cover.type">
            <van-grid
              :border="false"
              :column-num="3"
            >
              <van-grid-item
                v-for="(images, index) in item.cover.images"
                :key="index"
              >
                <van-image :src="images" />
              </van-grid-item>
            </van-grid>
          </template>
          <van-row>
            <van-col span="8">{{item.aut_name}}</van-col>
            <van-col span="4">{{item.comm_count}}评论</van-col>
            <van-col span="8">{{item.pubdate | relativeTime}}</van-col>
          </van-row>
          <van-row class="van-rcol">
            <van-col span="8">
              <van-icon name="chat-o" />
              <span>评论</span>
            </van-col>
            <van-col span="8">
              <van-icon name="like-o" />
              <span>喜欢</span>
            </van-col>
            <van-col span="8">
              <van-icon name="share" />
              <span>分享</span>
            </van-col>
          </van-row>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '../../api/searchAPI'
export default {
  name: 'searchResult',
  data () {
    return {
      searchResulList: [], // 搜索数据结果列表
      loading: false, // 数据加载状态
      finished: false, // 数据加载完毕
      page: 1, // 页码
      perPage: 10 // 每页数据条数
    }
  },
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  deactivated () {
    // 由于组件和路由都存在缓存问题，则手动销毁此组件
    this.$destroy()
  },
  methods: {
    async onLoad () {
      await this.$sleep(800)
      // 异步更新数据
      const data = await this.getSearchResult()
      // 判断数据是否加载完毕
      if (!data.results.length) {
        this.loading = false
        this.finished = false
        return
      }
      // 将获取的数据结果，解构push到数据列表中
      this.searchResulList.push(...data.results)
      // console.log(data.results)
      // 更新页码，获取下页数据
      this.page++
      this.loading = false
    },
    // 获取搜索结果数据列表
    getSearchResult () {
      // console.log(this.q)
      return getSearch({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  margin-bottom: 36px;
}
.van-rcol {
  height: 60px;
  line-height: 60px;
  font-size: 38px;
  text-align: center;
  vertical-align: middle;
  border-top: 1px solid #ccc;
  margin-top: 20px;
}
</style>
