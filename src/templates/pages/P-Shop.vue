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
      searchResults: '',
      filterOrderby: ProductFiltersData.filterOrderby,
      filterOrderbyKeys: ProductFiltersData.filterOrderbyKeys,
      filterBrand: ProductFiltersData.filterBrand,
      filterSize: ProductFiltersData.filterSize, 
    }
  },

  mounted() {
    this.getProducts();
  },

  computed: {
    filteredProducts() {
      return Object.values(this.products).filter((item) =>
        item.post_title.toLowerCase().includes(this.searchResults.toLowerCase())
      )
    },
  },

  methods: {
    async getProducts() {
      return fetch('https://branded.loc/wp-json/api/archive/get_products')
        .then((result) => result.json())
        .then((rowData) => {this.products = rowData; this.resaultProducts = rowData})
    },

    handleSearch(searchResults) {
      this.searchResults = searchResults;
      if (this.sortedData) this.handleSort()
    },

    sortHendler(selectedOption) {

      this.handleSort(selectedOption)
    },

    filterProductsByUpPrice(products) {
      return products.sort((a, b) => a.post_price - b.post_price);
    },

    filterProductsByDownPrice(products) {
      return products.sort((a, b) => b.post_price - a.post_price)
    },

    handleSort(selectedOption) {
      switch(selectedOption) {
        case this.filterOrderbyKeys['price-asc']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsByUpPrice(this.filteredProducts);
          break;
        case this.filterOrderbyKeys['price-desc']:
          this.sortedData = true
          this.resaultProducts = this.filterProductsByDownPrice(this.filteredProducts);
          break;
        default :
          this.resaultProducts = this.filteredProducts;
      }
    }
  }
}
</script>
