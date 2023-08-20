<template>
  <div>
    <C-Modal />
    <L-Header :products="products" @search-product="searchHendler" />
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
                    <Select-filter-form @select-filter="sortHendler" :options="filterBrand" filter-param="brand" />
                  </div>
                  <div class="widget">
                    <Select-filter-form @select-filter="sortHendler" :options="filterSize" filter-param="size" />
                  </div>
                </div>
                <div class="l-shop__result">
                  <div class="l-shop__result-count">
                    <p class="woocommerce-result-count">Отображение 1–16 из 750</p>
                  </div>
                  <Select-filter-form @select-filter="sortHendler" :options="filterOrderby" filter-param="orderby" />
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

// import ProductFiltersData from '@/config/productFilters'
import ProductFiltersData from '@/config/productFilterNew'

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
      currentFilters: [],
      // currentFilters: [
      //   {flag: false, type: 'brand', text: ''}, 
      //   {flag: false, type: 'size', text: ''}
      // ],
      sortedData: false,
      filterOrderby: ProductFiltersData.orderby,
      filterBrand: ProductFiltersData.brand,
      filterSize: ProductFiltersData.size, 
      
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
        .then((rowData) => {
          this.products = rowData; 
          this.resaultProducts = rowData;
        })
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

    filterCollection(selectedOption) {
      if (!this.currentFilters.some(item => item.type === selectedOption.type)) {
        this.currentFilters.push(selectedOption)
      } else {
        const findedEl = this.currentFilters.find(item => item.type === selectedOption.type)
        const findedElIndex = this.currentFilters.indexOf(findedEl)
        this.currentFilters[findedElIndex] = selectedOption
      }
    },

    searchHendler(searchResults) {
      let products = Object.values(this.products).filter((item) => {
        return item.post_title.toLowerCase().includes(searchResults.toLowerCase())
      })
      this.resaultProducts = products;
      this.sortHendler('', products)
      // if (this.sortedData) this.sortHendler()
    },

    sortHendler(selectedOption, products = this.products) {
      if (selectedOption) {
        let filteredProduct = products;
        this.filterCollection(selectedOption)
      
        if(this.currentFilters.length) {
          this.currentFilters.forEach(item => {
            if(item.type === 'brand') {
              filteredProduct = this.filterProductsByBrand(filteredProduct, item.text);
            } 
            if (item.type === 'size') {
              filteredProduct = this.filterProductsBySize(filteredProduct, item.text);
            }
            if (item.type === 'orderby') {
              if (item.key === 'price-asc') {
                filteredProduct = this.filterProductsByUpPrice(filteredProduct)
              } else if (item.key === 'price-desc') {
                filteredProduct = this.filterProductsByDownPrice(filteredProduct)
              }
            }
          }); 
        }

        this.resaultProducts = filteredProduct;
      }
      // let filteredProduct = this.products;
      // const findedEl = this.currentFilters.find(item => item.type === selectedOption.type)
      // const findedElIndex = this.currentFilters.indexOf(findedEl)

      // this.currentFilters[findedElIndex].text = selectedOption.text
      // this.currentFilters[findedElIndex].flag = true

      // this.currentFilters.forEach(filter => {
      //   let funcName = `filterProductsBy${filter.type}`;

      //   if(filter.flag) {
      //     filteredProduct = this[funcName](filteredProduct, filter.text);
      //   }
      // });


      // ================================================ //
      // this.currentFilters[selectedOption.type].text = selectedOption.text;
      // this.currentFilters[selectedOption.type].flag = true;

      // Object.values(this.currentFilters).forEach(filter => {
      //   console.log(filter);
      //     if(filter.flag) {
      //       filteredProduct = this[`filterProductsBy${filter[0]}`](filteredProduct, item.text);
      //     }
      // });

      
    },
  }
}
</script>
