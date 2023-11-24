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
        <p class="woocommerce-result-count">Отображение {{productCurrentCount}} из {{productsLength}}</p>
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

  computed: {
    ...mapGetters({
      products: 'catalog/products',
      productsLength: 'catalog/productsCount',
    }),

    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    brandSelect() { return this.getFilterByKey('brand', this.$route.query.brand)},
    sizeSelect() { return this.getFilterByKey('size', this.$route.query.size)},
    orderbySelect() {return this.getFilterByKey('orderby', this.$route.query.orderby)},
    currentPage() {
      const queryPage = this.$route?.query?.page;
      const currentPageNumber = Number(queryPage) || 1;

      return currentPageNumber;
    },
    productsExample() {
      return this.products.length;
    },

    // 16 - количество товаров на странице
    // x - текущее количество товаров которое пришло (10)
    // y - текущая страница  (3)
    // 16 * y - x = 33 
    // 16 * 3 - (16 - 1) = 48 

    productCurrentCount() {
      return `${16 * this.currentPage - (16 - 1)}-${16 * this.currentPage - (16 - this.products.length)}`;
    }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    getFilterByKey(filterKey, searchParam) {
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