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
            <el-form-item prop="first_name" :rules="[RuleRequired]">
              <el-input
                placeholder="First Name"
                v-model="form.first_name"
              />
            </el-form-item>
            <el-form-item prop="email" :rules="emailRules">
              <el-input
                placeholder="Email Address"
                v-model="form.email"
              />
            </el-form-item>
            <el-form-item prop="password" :rules="[RuleRequired, lengthRules]">
              <el-input
                placeholder="Password"
                v-model="form.password"
                show-password
              />
            </el-form-item>
          </div>
          <div class="registration-form-right">
            <el-form-item prop="last_name" :rules="[RuleRequired]">
              <el-input
                placeholder="Last Name"
                v-model="form.last_name"
              />
            </el-form-item>
            <el-form-item prop="login" :class="{ 'is-error': loginVerification }" :rules="[RuleRequired]">
              <el-input
                placeholder="Log in"
                v-model="form.login"
              />
            </el-form-item>
            <el-form-item
              prop="confirm_password"
              :rules="[RuleRequired]"
              :class="{ 'is-error': isActive }"
            >
              <el-input
                placeholder="Confirm Password"
                v-model="form.confirm_password"
                show-password
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div style="display:flex; flex-direction: column; align-items: center;">
        <button @click="createAccount" class="create_account-btn">
          Create Account
        </button>
        <div class="link_for-login">Already have an account? <a href="/login">Log in</a></div>
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
        first_name: '',
        email: '',
        password: '',
        last_name: '',
        login: '',
        confirm_password: ''
      },
      rules: {
        first_name: [this.RuleRequired],
        email: [this.emailRules],
        password: [this.RuleRequired, this.lengthRules],
        last_name: [this.RuleRequired],
        login: [this.RuleRequired],
        confirm_password: [this.RuleRequired]
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
      emailRules: [
        { required: true, message: 'Email is required', trigger: 'change' },
        { pattern: /.+@.+\..+/, message: 'E-mail must be valid', trigger: 'change' }
      ],
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
    createAccount() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let count = 0
          this.users.forEach(elem => {
            if (elem.login === this.form.login) {
              count++
            }
          })

          if (count > 0) {
            this.$notify({
              title: 'Error',
              message: 'Such a login is available in the system',
              type: 'error'
            })

            this.loginVerification = true
          } else {
            this.loginVerification = false
            if (this.form.password === this.form.confirm_password) {
              const data = {
                uuid: this.generateId(),
                ...this.form
              }
              this.$axios({
                method: 'POST',
                url: '/users',
                data
              })
                .then((res)=> {
                  this.$notify({
                    title: 'Success',
                    message: 'Account created successfully',
                    type: 'success'
                  })

                  localStorage.setItem('unique_id', res.data.uuid)

                  this.$router.push('/')
                })
            } else {
              this.isActive = true

              this.$notify({
                title: 'Error',
                message: 'Passwords do not match',
                type: 'error'
              })
            }
          }
        }
      })
    },

    generateId() {
      return uuidv4();
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/login/login.scss";
</style>
