<template>
  <div>
    <headerView v-if="showComponents"/>
    <Nuxt />
    <footerView v-if="showComponents"/>
  </div>
</template>

<script>
import headerView from '~/components/mainPage/headerView.vue'
import footerView from '~/components/mainPage/footerView.vue'

export default {
components: { footerView , headerView } ,
  data() {
    return {
      ignoreList: ['/login', '/create_account'],
    }
  },
  computed: {
    showComponents() {
      return !this.ignoreList.includes(this.$route.path)
    },
  },
}
</script>

<style lang="scss" scoped></style>
