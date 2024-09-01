<template>
  <div class="cart">
    <div class="cart_title">
      Cart
    </div>
    <div class="container">
      <div class="products_table">
        <table>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          <tr v-for="product in products" :key="product.id">
            <td>
              <span style="cursor: pointer;" @click="deleteProduct(product.id)">
                <img src="@/assets/icons/clear.svg" alt="">
              </span>
            </td>
            <td>
              <span style="display: flex; align-items: center; color: var(--menu-hover);">
                <img style="margin-right: 30px;" class="product_img" :src="product.img" alt="">
                {{ product.name }}
              </span>
            </td>
            <td>
              {{ product.price }}
            </td>
            <td>
              <el-input-number @change="calculateTotal" v-model="product.count" :min="1" :max="10"></el-input-number>
            </td>
            <td>${{ product.price.replace('$', '') * product.count }}</td>
          </tr>
        </table>
      </div>
      <div class="cart_totals">
        <div class="cart_totals-title">
          Cart totals
        </div>
        <div class="cart_totals-total">
          <div class="total">
            <div class="title">
              Total
            </div>
            <div class="price">
              ${{ total }}
            </div>
          </div>
          <div class="total">
            <div class="title">
              Total
            </div>
            <div class="price">
              ${{ total }}
            </div>
          </div>
          <button @click="buy" class="buy">
            Buy now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      total: 0,
    }
  },

  mounted() {
    this.__Get()
  },

  methods: {
    buy() {
      const data = []
      this.products.map(item => {
        const newItem = { ...item }
        delete newItem.id
        newItem.date = this.$moment().format('YYYY-MM-DD')
        data.push(newItem)
      })
      this.$axios({
        method: 'POST',
        url: '/sales',
        data
      })
        .then(() => {
          this.$notify({
            title: 'Success',
            message: 'Thank you for your purchase, the products will be delivered soon',
            type: 'success'
          })
          this.$root.$emit('add_to_cart')
          setTimeout(()=> {
            this.$router.push('/')
          },2000)
        })
    },
    deleteProduct(id) {
      this.$axios({
        method: 'DELETE',
        url: `/cart/${id}`,
      })
        .then(() => {
          this.__Get()
          this.$root.$emit('add_to_cart')
        })
    },
    __Get() {
      this.$axios({
        method: 'GET',
        url: '/cart',
      })
        .then(res => {
          this.products = []
          this.total = 0
          res.data.map(item => {
            const priceWithoutDollar = Number(item.price.replace('$', ''))

            this.products.push({
              ...item,
              count: item.count || 1
            })

            this.total += priceWithoutDollar
          })
        })
    },
    calculateTotal() {
      this.total = 0
      this.products.map((product) => {
        const priceWithoutDollar = Number(product.price.replace('$', ''))

        this.total += product.count * priceWithoutDollar
      })
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/cart/cart.scss';
</style>
