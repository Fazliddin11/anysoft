<template>
  <el-row>
    <el-col class="card" :span="8">
      <el-card :body-style="{ padding: '0px' }">
        <button @click="add_to_cart" class="add_basket">
          <img src="@/assets/icons/basket.svg" alt="">
        </button>
        <div class="card_img">
          <img :src="product.img" alt="">
        </div>
        <div class="card_info">
          <div class="card_info-type">
            {{ product.type }}
          </div>
          <div class="card_info-name">
            {{ product.name }}
          </div>
          <div class="card_info-rate">
            <el-rate
              v-model="product.rate"
              :colors="colors">
            </el-rate>
          </div>
          <div class="card_info-price">
            <span>{{ product.discount_price }}</span>
            <span>{{ product.price }}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'cardView',
  data() {
    return {
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    add_to_cart() {
      delete this.product.id
      this.$axios({
        method: 'POST',
        url: '/cart',
        data: this.product
      })
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Product added to cart',
            type: 'success'
          })
          this.$root.$emit('add_to_cart')
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/card/style.scss';
</style>
