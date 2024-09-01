import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  controls: ['trafficControl'],
  version: '2.1'
}

Vue.use(YmapPlugin, settings)
