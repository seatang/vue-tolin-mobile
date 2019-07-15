<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :show-confirm-button="false"
    close-on-click-overlay
    :beforeClose="handelCloseDialog"
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
        @click="handelBlacklists()"
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
        @click="handelReportsArticle(item)"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikesArticle, reportsArticle } from '@/api/articlesAPI'
import { blacklists } from '@/api/requestAPI'
export default {
  name: 'operationArticle',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    operationArticleData: {
      type: Object,
      default: () => { }
    },
    operationType: {
      type: Boolean,
      default: false
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
      try {
        // 定义一个新对象，在新对象中修改文章的反馈状态
        const newOperationArticleData = {}
        const articleId = this.operationArticleData.art_id.toString()
        await dislikesArticle(articleId)
        // 将父组件传下来的文章对象赋值给新对象
        Object.assign(newOperationArticleData, this.operationArticleData)
        newOperationArticleData.operationType = true
        this.$toast('操作成功')
        // 关闭文章操作弹出层
        this.$emit('input', false)
        this.$emit('update:operation-article-data', newOperationArticleData)
      } catch (error) {
        this.$toast('请登录' + error)
        this.$router.push({ name: 'login' })
      }
    },
    // 拉黑作者
    async handelBlacklists () {
      try {
        const autId = this.operationArticleData.aut_id
        await blacklists(autId)
        this.$toast('操作成功')
        this.$emit('input', false)
      } catch (error) {
        this.$toast('操作失败' + error)
      }
    },
    // 举报文章
    async handelReportsArticle (item) {
      try {
        const articleId = this.operationArticleData.art_id.toString()
        const type = item.value
        // console.log(articleId, type)
        const data = await reportsArticle({ articleId, type, remark: '' })
        console.log(data)
        this.$toast('举报成功')

        this.reportType = false
      } catch (error) {
        if (error.response.status === 409) {
          this.$toast('该文章已经被举报过啦')
        }
      }
    },
    // 关闭弹出层,使用弹出框组件的beforeClose属性，绑定函数，接收参数action、done;
    // done 可以关闭弹出层
    handelCloseDialog (action, done) {
      done()
      // this.$emit('input', false)
      window.setTimeout(() => {
        this.reportType = false
      }, 200)
    }
  }
}
</script>

<style lang="less">
</style>
