<template>
  <div class="products">
    <div class="container">
      <div class="products_title1">
        Popular Products
      </div>
      <div class="products_title2">
        Trending Now
      </div>
      <div class="cards">
        <cardView
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',

  data() {
    return {
      products: []
    }
  },

  mounted() {
    this._GetProducts()
  },

  methods: {
    _GetProducts() {
      this.$axios({
        method: 'GET',
        url: '/products',
      })
        .then(res => {
          this.products = res.data
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/mainPage/products.scss';
</style>
