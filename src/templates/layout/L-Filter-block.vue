<template>
  <div>
    <div class="l-filter">
      <div class="widget">
        <Select-filter-form @select-filter="sortHendler" ref="testFilter" :options="filterBrand" filter-param="brand" current-option="Бренд" />
      </div>
      <div class="widget">
        <Select-filter-form @select-filter="sortHendler" :options="filterSize" filter-param="size" current-option="Размер" />
      </div>
    </div>
    <div class="l-shop__result">
      <div class="l-shop__result-count">
        <p class="woocommerce-result-count">Отображение 1–16 из 750</p>
      </div>
      <Select-filter-form @select-filter="sortHendler" :options="filterOrderby" filter-param="orderby" current-option="По новизне" />
    </div>
  </div>
</template>

<script>
import SelectFilterForm from '@/templates/forms/SelectFilterForm.vue'
// import ProductFiltersData from '@/config/productFilterNew'
import { mapActions } from 'vuex'

// const sortTypes = {
//   priceAsc: 'price-asc',
//   priceDesc: 'price-desc'
// }

export default {
  // data() {
  //   return {
  //     currentFilters: [],
  //     filterOrderby: ProductFiltersData.orderby,
  //     filterBrand: ProductFiltersData.brand,
  //     filterSize: ProductFiltersData.size, 
  //     filterTypes: ProductFiltersData.types, 
  //   }
  // },

  components: {
    SelectFilterForm,
  },

  computed: {
    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    // currentPage() { 
    //   const queryPage = this.$route?.query?.page;
    //   const currentPageNumber = Number(queryPage) || 1;

    //   return currentPageNumber;
    // }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    // ...mapMutations({
    //   sortProductsByUpPrice: 'catalog/sortProductsByUpPrice',
    //   sortProductsByDownPrice: 'catalog/sortProductsByDownPrice',
    //   filterProductsByBrand: 'catalog/filterProductsByBrand',
    //   filterProductsBySize: 'catalog/filterProductsBySize',
    //   resetResultProducts: 'catalog/resetResultProducts'
    // }),

    // filteredProducts() { 
    //   if(!this.currentFilters.length) return;

    //   this.resetResultProducts()
      
    //   this.currentFilters.forEach(item => {
    //     if (item.type === this.filterTypes.orderby) {
    //       this.sortProductsByPrice(item.key)
    //     } else {
    //       this.filterProductsByAttr(item.type, item.text);
    //     }
    //   }); 
    // },

    // sortProductsByPrice(key) {
    //   if (key === sortTypes.priceAsc) {
    //     this.sortProductsByUpPrice()
    //   } 
    //   if (key === sortTypes.priceDesc) {
    //     this.sortProductsByDownPrice()
    //   }
    // },

    // filterProductsByAttr(filterType, value) {
    //   console.log(filterType, value);
    //   if(filterType === this.filterTypes.brand) {
    //     this.filterProductsByBrand(value);
    //   } 
    //   if (filterType === this.filterTypes.size) {
    //     this.filterProductsBySize(value);
    //   }
    // },

    // filterCollection(selectedOption) {
    //   const hasFilter = this.currentFilters.some(item => item.type === selectedOption.type);

    //   if (!hasFilter) {
    //     this.currentFilters.push(selectedOption)
    //   } else {
    //     const findedElIndex = this.currentFilters.findIndex(item => item.type === selectedOption.type)
    //     this.currentFilters.splice(findedElIndex, 1, selectedOption);
    //   }
    // },

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
        // this.countProducts = result?.products_count;
        console.log(result);
      })
      
    },
  },
}
</script>