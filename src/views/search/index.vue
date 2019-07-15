<template>
  <div>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="keyword"
      show-action
      @search="handelSearchResult(keyword)"
    />
    <van-cell-group v-if="searchList.length && keyword.length">
      <van-cell
        v-for="item in searchList"
        :key="item"
        @click="handelSearchResult(item)"
      >
        <div
          slot="title"
          v-html="keywordHighlight(item,keyword)"
        >
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
          v-show="!isShowClose"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          @click="isShowClose = true"
        />
        <div v-show="isShowClose">
          <span @click="searchKeyWordHistories = []">全部删除</span>&nbsp;
          <span @click="isShowClose = false">完成</span>
        </div>

      </van-cell>
      <van-cell
        v-for="(item, index) in searchKeyWordHistories"
        :key="item"
        :title="item"
        @click="handelSearchResult(item)"
      >
        <van-icon
          v-show="isShowClose"
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
          @click="searchKeyWordHistories.splice(index, 1)"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/searchAPI'
import { debounce } from 'lodash'
export default {
  name: 'searchIndex',
  data () {
    return {
      keyword: '', // 关键字
      searchList: [], // 关键字返回结果
      searchKeyWordHistories: JSON.parse(window.localStorage.getItem('search-histories')), // 搜索关键字本地存储
      isShowClose: false
    }
  },
  watch: {
    // 使用函数防抖处理，关键字频繁调用接口的问题
    keyword: debounce(async function (newVal) {
      // 去除搜索关键字的首尾空格
      newVal = newVal.trim()
      // 判断是否为空，为空什么都不做
      if (!newVal) {
        return
      }
      const data = await getSuggestion(newVal)
      this.searchList = data.options
    }, 500)
  },
  methods: {
    // 关键字高亮
    keywordHighlight (item, keyword) {
      // 将搜索结果转为小写，在按照关键截取，在拼接关键字，设置关键字的样式
      return item.toLowerCase().split(keyword).join(`<strong style="color: red;">${keyword}</strong>`)
    },
    // 搜索结果路由传参
    handelSearchResult (q) {
      //  判断是否有关键词
      if (q.legth) {
        return
      }
      this.searchKeyWordHistories.unshift(q)
      // console.log(this.searchKeyWordHistories)
      // 将搜索关键词存入本地
      window.localStorage.setItem('search-histories',
        JSON.stringify([...new Set(this.searchKeyWordHistories)])
      )
      // 跳转到搜索结果界面
      this.$router.push({
        name: 'search-result',
        params: {
          q
        }
      })
    }
  }
}
</script>

<style>
</style>
