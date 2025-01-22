<template>
  <div>
    <div class="l-filter">
      <div class="widget">
        <Select-filter-form 
          @select-filter="sortHendler" 
          ref="select" 
          :options="filterBrand" 
          :show-all="showAll"
          filter-param="brand" 
          :current-option="brandSelect" 
        />
      </div>
      <div class="widget">
        <Select-filter-form 
          @select-filter="sortHendler" 
          :options="filterSize" 
          :show-all="showAll"
          filter-param="size" 
          :current-option="sizeSelect" 
        />
      </div>
    </div>
    <div class="l-shop__result">
      <div class="l-shop__result-count">
        <p class="woocommerce-result-count" v-if="products.length">Отображение {{productCurrentCount}} из {{productsLength}}</p>
      </div>
      <Select-filter-form 
        @select-filter="sortHendler" 
        :options="filterOrderby" 
        :show-all="showAll"
        filter-param="orderby" 
        :current-option="orderbySelect" 
      />
    </div>
  </div>
</template>

<script>
import waitRequest from '@/mixins/waitRequest';

import SelectFilterForm from '@/templates/forms/SelectFilterForm.vue'
import ProductFiltersData from '@/config/productFilterNew'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      currentFilters: [],
      filterOrderby: ProductFiltersData.orderby,
      filterBrand: ProductFiltersData.brand,
      filterSize: ProductFiltersData.size, 
      filterTypes: ProductFiltersData.types,
      showAll: ProductFiltersData.showAll
    }
  },

  components: {
    SelectFilterForm,
  },

  mounted() {
    console.log(this.showAll);
  },

  mixins: [waitRequest],

  computed: {
    ...mapGetters({
      products: 'catalog/products',
      productsLength: 'catalog/productsCount',
      currentLang: 'lang/getCurrentLang',
    }),

    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    brandSelect() { return this.getFilterByKey('brand', this.$route.query.brand)},
    sizeSelect() { return this.getFilterByKey('size', this.$route.query.size)},
    orderbySelect() { return this.getFilterByKey('orderby', this.$route.query.orderby)},
    currentPage() {
      const queryPage = this.$route?.query?.page;
      const currentPageNumber = Number(queryPage) || 1;

      return currentPageNumber;
    },
    productsExample() {
      return this.products.length;
    },

    productCurrentCount() {
      let maxProductsItems = this.products.length ? 16 : 0;
      let sliceFirstIndex = this.products.length ? 1 : 0;

      return `${maxProductsItems * this.currentPage - (maxProductsItems - sliceFirstIndex)}-${maxProductsItems * this.currentPage - (maxProductsItems - this.products.length)}`;
    }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    getFilterByKey(filterKey, searchParam) {
      return ProductFiltersData[filterKey].find(filter => filter.key === searchParam) || this.showAll || ProductFiltersData[filterKey][ProductFiltersData[filterKey][0]]
    },

    removeQueryParams(param) {
      const query = { ...this.$route.query };
      delete query[param];
      this.$router.push({ path: '', query });
    },

    sortHendler(selectedOption) {
      if (!selectedOption) return;
      console.log('sortHendler: ', selectedOption);
      this.$emit('filterRequestInProgress', true);

      if(this.$route.query.page) {
        this.removeQueryParams('page');
      }

      this.waitRequest(() => {
        return this.fetchProducts({
          url: this.$route.fullPath,
          page: 1,
          slug: this.categorySlugFromRoute,
          offset: 0,
          lang: this.currentLang,
        });
      }).finally(() => {
        this.$emit('filterRequestInProgress', false);
      }) 
    },
  },
}
</script>