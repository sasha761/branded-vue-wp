<template>
  <div>
    <C-Modal />
    <L-Header :products="products" @search-product="handleSearch" />
    <div class="wrapper">
      <main class="p-shop">
        <div class="u-container">
          <C-Breadcrumb />
          <div class="p-shop__flex">
            <div class="p-shop__sidebar">
              
            </div>
            <div class="p-shop__catalog">
              <section class="l-shop" data-categories="Женщинам" data-cat-id="17">
                <h1 class="u-h2">Женщинам</h1>
                <div class="l-filter">
                  <div class="widget">
                    <Select-filter-form @select-filter="sortHendler" :options="filterBrand" filterParam="filter_brand" />
                  </div>
                  <div class="widget">
                    <Select-filter-form @select-filter="sortHendler" :options="filterSize" filterParam="filter_size" />
                  </div>
                </div>
                <div class="l-shop__result">
                  <div class="l-shop__result-count">
                    <p class="woocommerce-result-count">Отображение 1–16 из 750</p>
                  </div>
                  <Select-filter-form @select-filter="sortHendler" :options="filterOrderby" filterParam="orderby" />
                </div>
                <div v-if="resaultProducts" class="l-shop__product">
                  <div class="row js-load-more">
                    <div
                      v-for="product in resaultProducts"
                      :key="product.post_id"
                      class="col-lg-3 col-md-4 col-sm-6 col-6 u-col js-gallery-item"
                    >
                      <C-Product :product="product" />
                    </div>
                  </div>
                  <C-LoadrMore />
                </div>
                <C-Pagination />
              </section>
            </div>
          </div>
        </div>
        <L-Subscribe />
      </main>
      <L-Footer />
    </div>
  </div>
</template>

<script>
import LHeader from '@/templates/layout/L-Header.vue'
import LFooter from '@/templates/layout/L-Footer.vue'
import LSubscribe from '@/templates/layout/L-Subscribe.vue'

import SelectFilterForm from '@/templates/forms/SelectFilterForm.vue'

import CModal from '@/templates/components/C-Modal.vue'
import CProduct from '@/templates/components/C-Product.vue'
import CPagination from '@/templates/components/C-Pagination.vue'
import CLoadrMore from '@/templates/components/C-LoadMore.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'

import ProductFiltersData from '@/config/productFilters'

export default {
  name: "App",

  components: {
    SelectFilterForm,
    LHeader,
    LFooter,
    LSubscribe,
    CModal,
    CProduct,
    CPagination,
    CLoadrMore,
    CBreadcrumb
  },

  data() {
    return {
      products: [],
      resaultProducts: [],
      sortedData: false,
      sortedStr: '',
      filterOrderby: ProductFiltersData.filterOrderby,
      filterOrderbyKeys: ProductFiltersData.filterOrderbyKeys,
      filterBrand: ProductFiltersData.filterBrand,
      filterBrandKeys: ProductFiltersData.filterBrandKeys,
      filterSize: ProductFiltersData.filterSize, 
      filterSizeKey: ProductFiltersData.filterSizeKey, 
    }
  },

  mounted() {
    this.getProducts();
  },

  computed: {
    filteredProducts() { // тут загвостка
      return Object.values(this.products).filter((item) => {
        item.post_title.toLowerCase().includes(this.searchResults.toLowerCase())
      })
    },
  },

  methods: {
    async getProducts() {
      return fetch('https://branded.loc/wp-json/api/archive/get_products')
        .then((result) => result.json())
        .then((rowData) => {this.products = rowData; this.resaultProducts = rowData;})
    },

    handleSearch(searchResults) {
      // this.searchResults = searchResults;

      this.resaultProducts = Object.values(this.products).filter((item) => {
        return item.post_title.toLowerCase().includes(searchResults.toLowerCase())
      })
      if (this.sortedData) this.sortHendler()
    },

    sortHendler(selectedOption) {
      this.handleSortBrand(selectedOption)
      this.handleSortPrice(selectedOption)
      this.handleSortSize(selectedOption)
    },

    filterProductsByUpPrice(products) {
      return products.sort((a, b) => a.post_price - b.post_price);
    },

    filterProductsByDownPrice(products) {
      return products.sort((a, b) => b.post_price - a.post_price)
    },

    filterProductsByBrand(products, brandName) {
      return products.filter((item) => {
        return item.post_attr_brand.toLowerCase().includes(brandName.toLowerCase())
      })
    },

    filterProductsBySize(products, productSize) {
      return products.filter((item) => {
        return item.post_attr_size.toLowerCase().split(', ').includes(productSize.toLowerCase())
      })
    },

    handleSortPrice(selectedOption) {
      switch(selectedOption) {
        case this.filterOrderbyKeys['price-asc']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsByUpPrice(this.resaultProducts);
          break;
        case this.filterOrderbyKeys['price-desc']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsByDownPrice(this.resaultProducts);
          break;
        default :
      }
    },

    handleSortSize(selectedOption) {
      switch(selectedOption) {
        case this.filterSizeKey['xs']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsBySize(this.filteredProducts, 'xs');
          break;
        case this.filterSizeKey['s']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsBySize(this.filteredProducts, 's');
          break;
        case this.filterSizeKey['m']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsBySize(this.filteredProducts, 'm');
          break;
        case this.filterSizeKey['l']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsBySize(this.filteredProducts, 'l');
          break;
        case this.filterSizeKey['xl']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsBySize(this.filteredProducts, 'xl');
          break;   
      } 
    },

    handleSortBrand(selectedOption) {
      let brandName;
      switch(selectedOption) {
        case this.filterBrandKeys['bant-atelier']:
          this.sortedData = true
          brandName = 'Bant Atelier';
          this.resaultProducts = this.filterProductsByBrand(this.filteredProducts, brandName);
          break;
        case this.filterBrandKeys['be-om']:
          this.sortedData = true
          brandName = 'BeOm Design';
          this.resaultProducts = this.filterProductsByBrand(this.filteredProducts, brandName);
          break;
        case this.filterBrandKeys['lexie']:
          this.sortedData = true
          brandName = 'Lexie';
          this.resaultProducts = this.filterProductsByBrand(this.filteredProducts, brandName);
          break;  
        case this.filterBrandKeys['wearme']:
          this.sortedData = true
          brandName = 'WearMe';
          this.resaultProducts = this.filterProductsByBrand(this.filteredProducts, brandName);
          break;  
      }
    },
  },
  watch: {
    resaultProducts: function (val) {
      console.log(val)
    },
  }
}
</script>
