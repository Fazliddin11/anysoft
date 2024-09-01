<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script>
export default {
  mounted() {
    if (process.client) {
      import('leaflet').then(L => {
        const map = L.map('map').setView([41.31655183599811, 69.24118280410768], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        const coordinates = [
          [41.31655183599811, 69.24118280410768, 'Our addresses'],
          [41.324939823884584, 69.26055908203126, 'Our addresses'],
          [41.32846030673264, 69.2018508911133, 'Our addresses'],
          [41.29003477371243, 69.21678543090822, 'Our addresses']
        ];

        coordinates.forEach(coord => {
          L.marker(coord).addTo(map)
            .bindPopup(`${coord[2]}`)
            .openPopup()
        })
      })
    }
  }
}
</script>

