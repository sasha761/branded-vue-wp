<template>
  <div>
    <div class="l-filter">
      <div class="widget">
        <Select-filter-form @select-filter="sortHendler" :options="filterBrand" filter-param="brand" current-option="Бренд" />
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
import ProductFiltersData from '@/config/productFilterNew'
import { mapGetters, mapMutations } from 'vuex'

const sortTypes = {
  priceAsc: 'price-asc',
  priceDesc: 'price-desc'
}

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

  methods: {
    ...mapMutations({
      sortProductsByUpPrice: 'catalog/sortProductsByUpPrice',
      sortProductsByDownPrice: 'catalog/sortProductsByDownPrice',
      filterProductsByBrand: 'catalog/filterProductsByBrand',
      filterProductsBySize: 'catalog/filterProductsBySize',
      resetResultProducts: 'catalog/resetResultProducts'
    }),
    ...mapGetters({
      products: 'catalog/products',
    }),

    filteredProducts() { 
      if(!this.currentFilters.length) return;
      
      this.currentFilters.forEach(item => {
        if (item.key) {
          if (item.type === this.filterTypes.orderby) {
            this.sortProductsByPrice(item.key)
          } else {
            this.filterProductsByAttr(item.type, item.text);
          }
        } else {
          this.resetResultProducts()
        }
      }); 
    },

    sortProductsByPrice(key) {
      if (key === sortTypes.priceAsc) {
        this.sortProductsByUpPrice()
      } 
      if (key === sortTypes.priceDesc) {
        this.sortProductsByDownPrice()
      }
    },

    filterProductsByAttr(filterType, value) {
      if(filterType === this.filterTypes.brand) {
        this.filterProductsByBrand(value);
      } 
      if (filterType === this.filterTypes.size) {
        this.filterProductsBySize(value);
      }
    },

    filterCollection(selectedOption) {
      const hasFilter = this.currentFilters.some(item => item.type === selectedOption.type);

      if (!hasFilter) {
        this.currentFilters.push(selectedOption)
      } else {
        const findedElIndex = this.currentFilters.findIndex(item => item.type === selectedOption.type)
        this.currentFilters.splice(findedElIndex, 1, selectedOption);
      }
    },

    sortHendler(selectedOption) {
      if (!selectedOption) return;
      
      this.filterCollection(selectedOption)
      this.filteredProducts()
    },
  },
}
</script>