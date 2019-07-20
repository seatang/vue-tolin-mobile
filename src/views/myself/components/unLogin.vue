<template>
  <div class="unlogin">
    <span
      class="span"
      @click="$router.push({name:'login',query:{redirect:'/myself'}})"
    >
      未登录
    </span>
  </div>
</template>

<script>
export default {
  name: 'un-login'
}
</script>

<style lang="less" scoped>
.unlogin {
  width: 100%;
  height: 500px;
  background-color: rgba(71, 56, 202, 0.712);
  display: flex;
  justify-content: center;
  align-items: center;
  .span {
    width: 200px;
    height: 200px;
    border: 1px solid rgb(228, 132, 53);
    border-radius: 100%;
    line-height: 200px;
    text-align: center;
    background-color: rgb(228, 132, 53);
    color: #fff;
  }
}
</style>
