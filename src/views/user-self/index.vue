<template>
  <div>
    <van-nav-bar
      title="用户信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="handelSeven"
    />
    <van-cell-group>
      <van-cell
        title="头像"
        value="内容"
        is-link
        @click="changeImg"
      >
        <div slot="default">
          <img
            width="50"
            :src="user.photo"
          >
          <input
            type="file"
            ref="file"
            style="display:none;"
          >
        </div>
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
      />
      <van-cell
        title="手机"
        :value="user.mobile"
        is-link
      />
      <van-cell
        title="性别"
        :value="user.gender===0 ? '男':'女'"
        is-link
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/requestAPI'
export default {
  name: 'user-self',
  data () {
    return {
      user: {} // 用户信息
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {
    // 监听input文件上传
    this.$refs['file'].addEventListener('change', this.handleUserImg)
  },
  methods: {
    handelSeven () {

    },
    // 获取用户信息
    async loadUserProfile () {
      this.user = await getUserProfile()
    },
    // 选择头像
    handleUserImg () {
      // 用vue方式获dom对象中的文件对象
      const file = this.$refs['file'].files[0]
      // 异步读取用户选择的文件；参考文档见：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      const reader = new FileReader()
      // 开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.user.photo = reader.result
      })
    },
    changeImg () {
      this.$refs['file'].click()
    }
  }
}
</script>

<style>
</style>
