import {MessageBox} from "element-ui";

export default function ({ $axios, redirect }) {
  $axios.defaults.baseURL = process.env.NUXT_APP_BASE_URL

  $axios.onRequest((config) => {
    if (localStorage.access) {
      $axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.access;
    }
    return config
  });

  $axios.onResponse((response) => {
    return response;
  });

  $axios.interceptors.request.use(
    function (config) {
      if (localStorage.access) {
        config.headers.Authorization = `Bearer ${localStorage.access}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  $axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (error.response && localStorage.refresh) {
        const errorMessage = error.response.data.errors[0]?.detail || 'Noma\'lum xatolik'
        if (
          [400].includes(error.response.status)
        ) {
          showErrorMessage(errorMessage)
        }
      }
      return Promise.reject(error);
    }
  );

  function showErrorMessage(message) {
    MessageBox.alert(message, 'Xato', {
      type: 'error',
      center: true,
      confirmButtonText: 'Yopish',
    })
  }

  return {
    axios: $axios,
  };
}
