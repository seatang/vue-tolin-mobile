<template>
  <div>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="keyword"
      show-action
    />
    <van-cell-group>
      <van-cell title="单元格" />
      <van-cell title="单元格" />
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
export default {
  name: 'searchIndex',
  data () {
    return {
      keyword: ''
    }
  }
}
</script>

<style>
</style>
