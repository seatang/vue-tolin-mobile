<template>
  <div class="user">
    <div class="article-user">
      <img
        class="img"
        :src="article.aut_photo"
      >
      <div class="user-info">
        <p>作者：{{article.aut_name}}</p>
        <p>{{article.pubdate | relativeTime}}</p>
      </div>
    </div>
    <div>
      <van-button type="danger">+ 关注</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleUser',
  props: {
    article: {
      type: Object,
      default: () => { }
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
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
}
</style>
