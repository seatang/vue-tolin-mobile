<template>
  <div>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="keyword"
      show-action
    />
    <van-cell-group>
      <van-cell
        v-for="item in searchList"
        :key="item"
      >
        <div
          slot="title"
          v-html="keywordHighlight(item,keyword)"
        >

        </div>
      </van-cell>
    </van-cell-group>
    <hr>
    <van-cell-group>
      <van-cell title="历史记录">
        <van-icon
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
      </van-cell>
      <van-cell title="单元格" />
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
      searchList: [] // 关键字返回结果
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
    }
  }
}
</script>

<style>
</style>
