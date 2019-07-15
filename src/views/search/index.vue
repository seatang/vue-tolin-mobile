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
        :title="item"
      />
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
export default {
  name: 'searchIndex',
  data () {
    return {
      keyword: '', // 关键字
      searchList: [] // 关键字返回结果
    }
  },
  watch: {
    async keyword (newVal) {
      // 去除搜索关键字的首尾空格
      newVal = newVal.trim()
      if (!newVal) {
        return
      }
      const data = await getSuggestion(newVal)
      this.searchList = data.options
    }
  }
}
</script>

<style>
</style>
