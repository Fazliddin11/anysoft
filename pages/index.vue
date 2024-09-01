<template>
  <div>
    <aboutView/>
    <announceView/>
    <productsView/>
    <mapView/>
    <qualityCraftsmanship/>
    <announceFooterView/>
  </div>
</template>

<script>
import mapView from '~/components/mapView.vue';
import aboutView from '~/components/mainPage/aboutView.vue'
import announceView from '~/components/mainPage/announceView.vue'
import productsView from '~/components/mainPage/productsView.vue'
import announceFooterView from '~/components/mainPage/announceFooterView.vue'
import qualityCraftsmanship from '~/components/mainPage/qualityCraftsmanship.vue'
export default {
  name: 'IndexPage',
  components: {
    mapView,
    aboutView,
    announceView,
    productsView,
    announceFooterView,
    qualityCraftsmanship
  }
}
</script>
