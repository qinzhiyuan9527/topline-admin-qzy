<template>
  <div class="login">
    <div class="login-awp">
      <div class="login-awp-top">
        <img src="./logo_index.png" alt="">
      </div>
      <div class="login-awp-center">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="手机号"></el-input>
          </el-form-item>
            <el-row :gutter="24">
              <el-col :span="16">
                <el-form-item prop="code">
                  <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="LoginVerificationCode" :disabled="!!Eliminate">{{Eliminate ? `剩余${codeSecons > 10 ? codeSecons : '0' + codeSecons}秒` : TimingContent}}</el-button>
              </el-col>
            </el-row>
          <el-form-item prop="checked">
            <el-checkbox v-model="ruleForm.checked"></el-checkbox>
            <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" class="denglu" @click="handleLogin" :loading="is">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
const Seconscode = 60

export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        mobile: '',
        code: '',
        checked: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度是 11 个数字字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        checked: [
          { required: true, message: '请同意用户协议', trigger: 'blur' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'blur' }
        ]
      },
      captchaObj: null,
      loginsj: '',
      codeSecons: Seconscode,
      TimingContent: '获取验证码',
      Eliminate: null,
      sendMoblie: '',
      is: false
    }
  },
  methods: {
    LoginVerificationCode () {
      // 校验手机号是否有效
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }

        if (this.captchaObj) {
          // 手机号码有效初始化验证码
          // this.showGeetest()
          if (this.ruleForm.mobile !== this.sendMoblie) {
            document.body.removeChild(document.querySelector('.geetest_panel'))
            this.showGeetest()
          } else {
            this.captchaObj.verify()
          }
        } else {
          this.showGeetest()
        }
      })
    },
    // 人机交互获取验证码
    showGeetest () {
      let { mobile } = this.ruleForm
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        let { data } = res.data
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          new_captcha: data.new_captcha,
          offline: !data.success,
          product: 'bind'
        }, (captchaObj) => {
          this.captchaObj = captchaObj
          captchaObj.onReady(() => {
            this.sendMoblie = this.ruleForm.mobile
            captchaObj.verify()
          }).onSuccess(() => {
            // 倒计时
            if (!this.Eliminate) {
              this.timing()
            }
            let {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode
            } = captchaObj.getValidate()
            // 获取验证码
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              // `params` 是即将与请求一起发送的 URL 参数
              // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              this.loginsj = res.data.data.mobile
              // console.log(res.data)
            })
          }).onError(function () {
            console.log('sss')
          })
        })
      })
    },
    // 表单校验是否同过
    handleLogin () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.LoginLand()
        } else {
          alert('请查看是否有未选择的内容')
        }
      })
    },
    // 实现登陆功能
    LoginLand () {
      console.log(this.ruleForm.mobile)
      this.is = true
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.ruleForm
      }).then(res => {
        // 登陆成功在本地记录用户信息
        window.localStorage.setItem('user_info', JSON.stringify(res.data.data))
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        this.is = false
        // 跳转到home页面
        this.$router.push({ name: 'home' })
      }).catch(err => {
        if (err.response.status === 400) {
          this.$message.error('登录失败，手机号或验证码错误')
          this.is = false
        }
      })
    },
    // 倒计时
    timing () {
      this.Eliminate = setInterval(() => {
        this.codeSecons--
        if (this.codeSecons <= 0) {
          this.TimingContent = '获取验证码'
          clearInterval(this.Eliminate)
          this.codeSecons = Seconscode
          this.Eliminate = null
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    height: 100%;
    background: url("./login_bg.jpg") no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-awp {
      width: 400px;
      background-color: #fff;
      padding: 20px;
      .login-awp-top {
        text-align: center;
        margin: 20px 0;
      }
      .login-awp-center {
        margin: 40px 0;
        .denglu {
          width: 100%;
        }
      }
    }
  }
  .el-checkbox {
    margin: 0px 10px;
  }
</style>
