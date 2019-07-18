<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="item in commentList"
      :key="item.aut_id.toString()"
    >
      <div class="user">
        <div class="article-user">
          <img
            class="img"
            :src="item.aut_photo"
          >
          <div class="user-info">
            <p>评论者：{{item.aut_name}}</p>
            <p>{{item.content}}</p>
            <p>
              {{item.pubdate | relativeTime}}
              <van-button
                size="small"
                round
                type="info"
              >回复{{item.reply_count}}</van-button>
            </p>
          </div>
        </div>
        <div>
          <van-button
            size="small"
            round
            :icon="item.is_liking? 'like' :'like-o'"
            type="danger"
          >
            {{item.like_count}}</van-button>
        </div>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComments } from '@/api/commentAPI'
export default {
  name: 'commentList',
  props: {
    articleId: {
      type: [Number, String]
    }
  },
  data () {
    return {
      commentList: [], // 评论数据列表
      loading: false, // 加载状态
      finished: false, // 数据加载完毕状态
      offset: null, // 获取评论回复的评论id
      limit: 10 // 每页数量

    }
  },
  methods: {
    async onLoad () {
      const data = await getComments({
        isType: !!this.articleId,
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      // 判断数据是否加载完毕
      if (!data.results.length) {
        this.loading = false
        this.finished = true
        return
      }
      this.commentList.push(...data.results)
      this.loading = false
      // 记录本次 last_id ，用于请求下页数据
      this.offset = data.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  .article-user {
    display: flex;
    align-items: center;
    font-size: 26px;
    .user-info {
      margin-left: 30px;
    }
    .img {
      width: 150px;
      height: 150px;
      border-radius: 100%;
    }
  }
}
</style>
