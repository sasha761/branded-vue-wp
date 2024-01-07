<template>
  <div>
    <icons />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import icons from './templates/partial/iconsSvg.vue'
// import WCApi from '@/api/WCApi'

export default {
  name: "App",

  components: {
    icons,
  },

  mounted() {
    // const data = {
    //   siteUrl: process.env.VUE_APP_WP_SITE_URL,
    //   key: process.env.VUE_APP_WC_KEY,
    //   secret: process.env.VUE_APP_WC_SECRET,
    // }

    // const WC_Api = new WCApi(data);
    // WC_Api.init();
    // this.$root.api = WC_Api.instance
  }
}
</script>
