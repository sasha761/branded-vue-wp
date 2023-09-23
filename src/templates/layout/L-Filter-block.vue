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
  props: {
    products: {
      type: Array,
      required: true,
    },
  },

  components: {
    SelectFilterForm,
  },

  computed: {
    filteredProducts() { 
      if(!this.currentFilters.length) return;

      let filteredProductResult = this.products;

      this.currentFilters.forEach(item => {
        if (item.key) {
          if (item.type === this.filterTypes.orderby) {
            filteredProductResult = this.sortProductsByPrice(filteredProductResult, item.key)
          } else {
            filteredProductResult = this.filterProductsByAttr(filteredProductResult, item.type, item.text);
          }
        }
      }); 

      return filteredProductResult;
    }
  },

  methods: {
    ...mapMutations({
      sortProductsByUpPrice: 'catalog/sortProductsByUpPrice',
      sortProductsByDownPrice: 'catalog/sortProductsByDownPrice'
    }),

    sortProductsByPrice(filteredProduct, key) {
      console.log(filteredProduct)
      if (key === sortTypes.priceAsc) {
        this.sortProductsByUpPrice(filteredProduct)
      } 
      if (key === sortTypes.priceDesc) {
        this.sortProductsByDownPrice(filteredProduct)
      }
    },

    filterProductsByAttr(filteredProduct, filterType, value) {
      if(filterType === this.filterTypes.brand) {
        return this.filterProductsByBrand(filteredProduct, value);
      } 
      if (filterType === this.filterTypes.size) {
        return this.filterProductsBySize(filteredProduct, value);
      }
    },

    filterProductsByBrand(products, brandName) {
      return products.filter((item) => {
        return item?.post_attr_brand?.toLowerCase().includes(brandName.toLowerCase())
      })
    },

    filterProductsBySize(products, productSize) {
      return products.filter((item) => {
        return item?.post_attr_size?.toLowerCase().split(', ').includes(productSize.toLowerCase())
      })
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
      this.$emit('filtered-product', this.filteredProducts)
    },
  },
}
</script>