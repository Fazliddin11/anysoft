<template>
  <div class="login">
    <div class="login-left">
    </div>
    <div class="login-right">
      <div class="logo">Furniture</div>
      <div class="info">Create Account</div>
      <div class="social-signin">
        <div class="social-signin-btn">
          <div class="social-signin-btn-icon">
            <img src="@/assets/icons/google.svg" alt="">
          </div>
          <div class="social-signin-text">Sign up with Google</div>
        </div>
        <div class="social-signin-btn">
          <div class="social-signin-btn-icon">
            <img src="@/assets/icons/email.svg" alt="">
          </div>
          <div class="social-signin-text">Sign up with Email</div>
        </div>
      </div>
      <span>- OR -</span>
      <el-form ref="form" :model="form" :rules="rules">
        <div class="registration-form">
          <div class="registration-form-left">
            <el-form-item prop="login" :class="{ 'is-error': loginVerification }" :rules="[RuleRequired]">
              <el-input
                placeholder="Log in"
                v-model="form.login"
              />
            </el-form-item>
          </div>
          <div class="registration-form-right">
            <el-form-item :class="{ 'is-error': loginVerification }" prop="password" :rules="[RuleRequired, lengthRules]">
              <el-input
                placeholder="Password"
                v-model="form.password"
                show-password
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div style="display:flex; flex-direction: column; align-items: center;">
        <button @click="Login" class="create_account-btn">
          Log in
        </button>
        <div class="link_for-login">Don't have an account? <a href="/create_account">Create account</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      form: {
        password: '',
        login: '',
      },
      rules: {
        password: [this.RuleRequired, this.lengthRules],
        login: [this.RuleRequired]
      },
      lengthRules: {
        min: 4,
        max: 15,
        message: 'Length should be 4 to 15 characters',
        trigger: 'blur'
      },
      RuleRequired: {
        required: true,
        message: "Please fill in the field",
        trigger: 'change'
      },
      isActive: false,
      users: [],
      loginVerification: false
    }
  },

  mounted() {
    this.__GetUsers()
  },

  methods: {
    __GetUsers() {
      this.$axios({
        method: 'GET',
        url: '/users',
      })
        .then(res => {
          this.users = res.data
        })
    },
    Login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let count = 0
          this.users.forEach(elem => {
            if (elem.login === this.form.login) {
              count++
              if (elem.password === this.form.password) {
                this.$router.push('/')
              } else {
                this.$notify({
                  title: 'Error',
                  message: 'The login or password is incorrect',
                  type: 'error'
                })

                this.loginVerification = true
              }
            }
          })

          if (count === 0) {
            this.$notify({
              title: 'Error',
              message: 'The login or password is incorrect',
              type: 'error'
            })

            this.loginVerification = true
          }
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/login/login.scss";
</style>
