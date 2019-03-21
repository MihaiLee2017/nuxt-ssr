<template>
  <div class="m-user">
    <template v-if="user">
      欢迎你，
      <span class="username">{{user}}</span>
      [
      <nuxt-link to="/exit">退出</nuxt-link>
      ]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </template>
  </div>
</template>
<script>
import { getUserAction } from '../../../utils/axios/api/userAction'
export default {
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    getUserAction({}).then(res => {
      this.user = res.data.user.name
    })
  }
}
</script>

