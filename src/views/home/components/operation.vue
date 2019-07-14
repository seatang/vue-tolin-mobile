<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :show-confirm-button="false"
    close-on-click-overlay
  >

    <van-cell-group v-if="!reportType">
      <van-cell
        icon="info-o"
        title="不感兴趣"
        @click="handeldislikesArticle()"
      />
      <van-cell
        icon="chat-o"
        title="反馈"
        is-link
        @click="reportType = true"
      />
      <van-cell
        icon="close"
        title="拉黑作者"
      />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell
        center
        title="返回"
        icon="arrow-left"
        @click="reportType = false"
      />
      <van-cell
        v-for="item in reportList"
        :key='item.value'
        :title="item.label"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// import { dislikesArticle } from '@/api/articlesAPI'
export default {
  name: 'operationArticle',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    operationArticle: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      // 举报数据列表
      reportList: [

        {
          label: '标题夸张',
          value: 1
        },
        {
          label: '低俗色情',
          value: 2
        },
        {
          label: '错别字多',
          value: 3
        },
        {
          label: '旧闻重复',
          value: 4
        },
        {
          label: '广告软文',
          value: 5
        },
        {
          label: '内容不实',
          value: 6
        },
        {
          label: '涉嫌违法犯罪',
          value: 7
        },
        {
          label: '侵权',
          value: 8
        },
        {
          label: '其他问题',
          value: 0
        }

      ],
      reportType: false // 举报列表显示状态
    }
  },
  methods: {
    // 文章不喜欢
    async handeldislikesArticle () {
      // dislikesArticle
      // console.log(this.operationArticle)
    }
  }
}
</script>

<style lang="less">
</style>
