<template>
  <div>
    <icons />
    <router-view></router-view>
  </div>
</template>

<script>
import icons from './templates/partial/iconsSvg.vue'

export default {
  name: "App",

  components: {
    icons,
  },
}
</script>
