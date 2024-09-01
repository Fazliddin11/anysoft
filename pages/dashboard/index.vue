<template>
  <div class="dashboard">
    <div class="container row">
      <div class="chart">
        <apexchart
          type="bar"
          :options="chartOptions"
          :series="series"
          height="350"
        />
      </div>
      <div class="chart">
        <apexchart
          type="line"
          :options="chartOptionsLine"
          :series="seriesLine"
          height="350"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seriesLine: [
        {
          name: 'Series 1',
          type: 'line',
          data: []
        },
      ],
      chartOptionsLine: {
        chart: {
          type: 'line',
          height: 350,
          stacked: false
        },
        stroke: {
          width: [4, 0]
        },
        title: {
          text: 'Line & Area Chart'
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: [1, 0.25]
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
        },
        yaxis: {
          title: {
            text: 'Values'
          }
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (val) {
              return val.toFixed(0);
            }
          }
        }
      },
      series: [
        {
          name: 'Series',
          data: []
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: false
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          title: {
            text: 'Series Values'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " items sold"
            }
          }
        }
      },
      sales: []
    }
  },

  mounted() {
    this.__Get()
  },

  methods: {
    __Get() {
      this.$axios({
        method: 'GET',
        url: '/sales',
      })
        .then(res => {
          this.sales = res.data

          const currentYear = new Date().getFullYear()
          const monthlySales = Array(12).fill(0)

          res.data.forEach(sale => {
            Object.keys(sale).forEach(key => {
              const item = sale[key]
              if (item.date) {
                const [year, month, day] = item.date.split("-")
                if (parseInt(year) === currentYear) {
                  const monthIndex = parseInt(month) - 1
                  monthlySales[monthIndex] += item.count
                }
              }
            })
          })

          this.series = [{ name: 'Series', data: monthlySales }]
          this.seriesLine = [{ name: 'Series', data: monthlySales }]
        })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/dashboard/dashboard.scss";
</style>
