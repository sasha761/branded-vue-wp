<template>
  <div>
    <div class="l-filter">
      <div class="widget">
        <Select-filter-form 
          @select-filter="sortHendler" 
          ref="select" 
          :options="filterBrand" 
          filter-param="brand" 
          :current-option="brandSelect" 
        />
      </div>
      <div class="widget">
        <Select-filter-form 
          @select-filter="sortHendler" 
          :options="filterSize" 
          filter-param="size" 
          :current-option="sizeSelect" 
        />
      </div>
    </div>
    <div class="l-shop__result">
      <div class="l-shop__result-count">
        <p class="woocommerce-result-count">Отображение 1–16 из 750</p>
      </div>
      <Select-filter-form 
        @select-filter="sortHendler" 
        :options="filterOrderby" 
        filter-param="orderby" 
        :current-option="orderbySelect" 
      />
    </div>
  </div>
</template>

<script>
import SelectFilterForm from '@/templates/forms/SelectFilterForm.vue'
import ProductFiltersData from '@/config/productFilterNew'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      currentFilters: [],
      filterOrderby: ProductFiltersData.orderby,
      filterBrand: ProductFiltersData.brand,
      filterSize: ProductFiltersData.size, 
      filterTypes: ProductFiltersData.types, 
    }
  },

  components: {
    SelectFilterForm,
  },

  computed: {
    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    brandSelect() { return this.$route.query.brand || 'Бренд'},
    sizeSelect() { return this.$route.query.size || 'Размер' },
    orderbySelect() {return this.$route.query.orderby || 'По новизне'}
  },

  mounted() {
    console.log(this.$route);
  },

  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    removeQueryParams(param) {
      const query = { ...this.$route.query };
      delete query[param];
      this.$router.push({ path: '', query });
    },

    sortHendler(selectedOption) {
      if (!selectedOption) return;
      
      if(this.$route.query.page) {
        this.removeQueryParams('page');
      }

      this.fetchProducts({
        url: this.$route.fullPath,
        page: 1,
        slug: this.categorySlugFromRoute,
        offset: null
      }).then(result => {
        console.log(result);
      })
      
    },
  },
}
</script>