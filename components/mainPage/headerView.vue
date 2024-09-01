<template>
  <div class="header">
    <div style="width: 100%;" class="container row">
      <div class="logo">
        Furniture
      </div>
      <div class="menu">
        <ul class="row">
          <li><a href="/">Home</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">About</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
        </ul>
      </div>
      <div @click="$router.push('/cart')" class="basket">
        <img src="@/assets/icons/basket.svg" alt="">
        <div class="products_count">
          {{ count }}
        </div>
      </div>
      <div @click="$router.push('/create_account')" class="log_out">
        <img src="@/assets/icons/logout.svg" alt="">
      </div>
    </div>
    <div v-if="$route.path == '/'" class="new_collection">
      <h1 class="new_collection-title">
        NEW <br> COLLECTION
      </h1>
      <img src="https://websitedemos.net/furniture-haven-04/wp-content/uploads/sites/1411/2023/10/bg-10.jpg" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },

  mounted() {
    this.__Get()
    this.$root.$on('add_to_cart', ()=> {
      this.__Get()
    })
  },

  methods: {
    __Get() {
      this.$axios({
        method: 'GET',
        url: '/cart',
      })
        .then(res => {
          this.count = res.data.length
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/mainPage/header.scss';
</style>
