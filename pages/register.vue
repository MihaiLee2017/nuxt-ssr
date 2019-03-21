<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import { singUpAction, verifyAction } from '../utils/axios/api/userAction'
export default {
  layout: 'blank',
  data() {
    return {
      ruleForm: {
        name: '',
        emiil: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      error: '',
      statusMsg: ''
    }
  },
  methods: {
    sendMsg() {
      if (this.timerid) {
        return false
      }
      let namePass
      let emailPass
      this.statusMsg = ''
      this.$refs.ruleForm.validateField('name', valid => {
        namePass = valid
      })
      if (namePass) {
        return false
      }
      this.$refs.ruleForm.validateField('email', valid => {
        emailPass = valid
      })
      if (emailPass) {
        return false
      }
      if (!namePass && !emailPass) {
        let params = {
          username: window.encodeURIComponent(this.ruleForm.name),
          email: this.ruleForm.email
        }
        verifyAction(params)
          .then(res => {
            let count = 60
            this.statusMsg = `验证码已发送，剩余${count--}秒`
            this.timerid = setInterval(() => {
              if (count == 0) {
                clearInterval(this.timerid)
                this.timerid = null
                this.statusMsg = ''
                return false
              }
              this.statusMsg = `验证码已发送，剩余${count--}秒`
            }, 1000)
          })
          .catch(err => {
            this.statusMsg = err.msg || err.message
          })
      }
    },
    register() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            username: window.encodeURIComponent(this.ruleForm.name),
            password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
            email: this.ruleForm.email,
            code: this.ruleForm.code
          }
          singUpAction(params)
            .then(res => {
              location.href = '/login'
            })
            .catch(err => {
              this.error = err.message
            })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
