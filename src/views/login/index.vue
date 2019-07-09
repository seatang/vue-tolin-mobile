<template>
  <div class="user-login">
    <van-nav-bar title="登录" />
    <form class="user-form-warp">
      <van-cell-group class="user-form">
        <van-field
          label-width="50px"
          type="tel"
          v-model="userForm.mobile"
          clearable
          left-icon="manager"
          placeholder="请输入手机号"
          autofocus
          :error-message="errors.mobile"
        />
      </van-cell-group>
      <van-cell-group class="user-form">
        <van-field
          v-model="userForm.code"
          label-width="50px"
          left-icon="more"
          clearable
          placeholder="请输入短信验证码"
          :error-message="errors.code"
        >
          <van-button
            slot="button"
            size="mini"
            type="primary"
          >发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </form>
    <div class="user-login-btn">
      <van-button
        class="btn"
        type="info"
        :loading="loading"
        loading-text="登录中..."
        @click="onCheckLogin"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/requestAPI'
export default {
  name: 'AppLogin',
  data () {
    return {
      userForm: { // 表单数据
        mobile: '17600200335',
        code: '123456'
      },
      loading: false,
      errors: { // 错误提示
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 登录验证
    onCheckLogin () {
      const { mobile, code } = this.userForm
      const errors = this.errors
      if (!mobile.length || mobile.length !== 11) {
        errors.mobile = '请输入正确的手机号'
        return false
      } else {
        errors.mobile = ''
      }
      if (!code.length || code.length !== 6) {
        errors.code = '请输入验证码'
        return false
      } else {
        // 调取登录请求函数
        errors.code = ''
        this.handleLogin()
      }
    },
    // 登录请求
    async handleLogin () {
      try {
        this.loading = true
        const data = await login(this.userForm)
        // console.log(data)
        // 保存登录信息到本地存储
        this.$store.commit('changUser', data)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('登录失败')
      }
      this.loading = false
    }
  }

}
</script>

<style scoped lang="less">
.user-login-btn {
  padding: 50px;
  .btn {
    width: 100%;
  }
}
</style>
