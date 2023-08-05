<template>
  <div>
    <icons />
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
                <div v-if="filteredProducts" class="l-shop__product">
                  <div class="row js-load-more">
                    <div
                      v-for="product in filteredProducts"
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
import icons from './templates/partial/iconsSvg.vue'
import LHeader from './templates/layout/L-Header.vue'
import LFooter from './templates/layout/L-Footer.vue'
import LSubscribe from './templates/layout/L-Subscribe.vue'

import SelectFilterForm from './templates/forms/SelectFilterForm.vue'

import CModal from './templates/components/C-Modal.vue'
import CProduct from './templates/components/C-Product.vue'
import CPagination from './templates/components/C-Pagination.vue'
import CLoadrMore from './templates/components/C-LoadMore.vue'
import CBreadcrumb from './templates/components/C-Breadcrumbs.vue'

export default {
  name: "App",

  components: {
    icons,
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
      sortedData: false,
      sortedStr: '',
      filteredProducts: [],
      filterOrderby: {
        'date': 'По новизне',
        'price-asc': 'Цены: по возрастанию',
        'price-desc': 'Цены: по убыванию'
      },
      filterBrand: {
        'bant-atelier': 'Bant Atelier',
        'be-om': 'BeOm Design',
        'lexie': 'Lexie',
        'wearme': 'WearMe'
      },
      filterSize: {
        'xs': 'XS',
        's': 'S',
        'm': 'M',
        'l': 'L'
      }
    }
  },

  mounted() {
    this.getProducts().then((result) => (this.filteredProducts = result))
  },

  methods: {
    async getProducts() {
      return fetch('https://branded.loc/wp-json/api/archive/get_products')
        .then((result) => result.json())
        .then((rowData) => (this.products = rowData))
    },

    handleSearch(searchResults) {
      this.filteredProducts = Object.values(this.products).filter((item) =>
        item.post_title.toLowerCase().includes(searchResults.toLowerCase())
      )
      if (this.sortedData) this.handleSort()
    },

    sortHendler(selectedOption) {
      console.log(selectedOption);

      this.sortedStr = selectedOption
      this.handleSort()
    },

    handleSort() {
      if (this.sortedStr === 'price-asc') {
        this.sortedData = true
        this.filteredProducts.sort((a, b) => a.post_price - b.post_price)
      } else if (this.sortedStr === 'price-desc') {
        this.sortedData = true
        this.filteredProducts.sort((a, b) => b.post_price - a.post_price)
      } else {
        this.sortedData = false
      }
    }
  }
}
</script>
