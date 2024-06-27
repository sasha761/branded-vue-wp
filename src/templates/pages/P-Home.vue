<template>
  <main class="p-main">
    <L-Hero-Home :data="heroHome" />
    <L-Accessory :data="accessory" />
    <L-Product-Row :data="productRow" />
    <L-Brand :data="brand" />
    <L-Outlet :data="outlet" />
    <L-Branded />
    <L-Subscribe />
  </main>
</template>
<script>

import LSubscribe from '@/templates/layout/L-Subscribe.vue'
import LHeroHome from '@/templates/layout/L-Hero-home.vue'
import LAccessory from '@/templates/layout/L-Accessory.vue'
import LProductRow from '@/templates/layout/L-Product-row.vue'
import LBrand from '@/templates/layout/L-Brand.vue'
import LOutlet from '@/templates/layout/L-Outlet.vue'
import LBranded from '@/templates/layout/L-Branded.vue'

import Api from '@/api/Axios'

export default {
  name: "App",

  components: {
    LHeroHome,
    LSubscribe,
    LAccessory,
    LProductRow,
    LBrand,
    LOutlet,
    LBranded
  },

  data() {
    return {
      heroHome: {},
      accessory: [],
      productRow: [],
      brand: [],
      outlet: [],
      branded: []
    }
  },

  created() {
    return Api.get('home/get_home_info')
    .then((result) => {
      this.heroHome = result.data?.banners_group;
      this.accessory = result.data?.accesories;
      this.productRow = result.data?.best_offers;
      this.brand = result.data?.products_brand;
      this.outlet = result.data?.products_sale
    })
    .catch((error) => {
      console.log(error);
    });
  },

  computed: {
    // ...mapGetters({
    //   products: 'catalog/products',
    //   productsCount: 'catalog/productsCount',
    // }),
  },

  methods: {
    // ...mapMutations({
    //   setProductsList: 'catalog/setProductsList'
    // }),

    // ...mapActions({
    //   fetchProducts: 'catalog/fetchProducts'
    // }),
  }
}
</script>