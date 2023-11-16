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
    brandSelect() { return this.getFilterByKey('brand', this.$route.query.brand)},
    sizeSelect() { return this.getFilterByKey('size', this.$route.query.size)},
    orderbySelect() {return this.getFilterByKey('orderby', this.$route.query.orderby)}
  },

  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    getFilterByKey(filterKey, searchParam) {
      // console.log(ProductFiltersData[filterKey][ProductFiltersData[filterKey].length - 1]);
      return ProductFiltersData[filterKey].find(filter => filter.key === searchParam) || ProductFiltersData[filterKey][ProductFiltersData[filterKey].length - 1] 
    },

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