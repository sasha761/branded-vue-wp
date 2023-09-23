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
                <L-Filter-Block :products="products" @filtered-product="filteredProduct" />
                <div v-if="resultProducts" class="l-shop__product">
                  <div class="row js-load-more">
                    <div
                      v-for="product in resultProducts"
                      :key="product.id"
                      class="col-lg-3 col-md-4 col-sm-6 col-6 u-col js-gallery-item"
                    >
                      <C-Product :product="product" />
                    </div>
                  </div>
                  <C-LoadMore
                    :products-length="16" 
                    :current-page="currentPage"
                    :category-slug="categorySlugFromRoute"
                    :count-products="countProducts"
                  />
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
import LFilterBlock from '@/templates/layout/L-Filter-block.vue'

import CModal from '@/templates/components/C-Modal.vue'
import CProduct from '@/templates/components/C-Product.vue'
import CPagination from '@/templates/components/C-Pagination.vue'
import CLoadMore from '@/templates/components/C-LoadMore.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'

// import Api from '@/api/Axios'

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: "App",

  components: {
    LFilterBlock,
    LHeader,
    LFooter,
    LSubscribe,
    CModal,
    CProduct,
    CPagination,
    CLoadMore,
    CBreadcrumb
  },

  data() {
    return {
      countProducts: 0
    }
  },

  mounted() {
    this.fetchProducts(this.categorySlugFromRoute).then(result => {
      this.countProducts = result?.products_count;
    })
  },

  // 1) в фильтрах добавлять 

  computed: {
    ...mapGetters({
      products: 'catalog/products',
      resultProducts: 'catalog/resultProducts',
    }),
    

    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    currentPage() { 
      const queryPage = this.$route?.query?.page;
      const currentPageNumber = Number(queryPage) || 1;

      return currentPageNumber;
    }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    ...mapMutations({
      changeResultProducts: 'catalog/changeResultProducts'
    }),


    searchHendler(searchResults) {
      let products = Object.values(this.products).filter((item) => {
        return item.post_title.toLowerCase().includes(searchResults.toLowerCase())
      })
      this.resultProducts = products;
      // this.sortHendler('', products)
    },

    filteredProduct(filteredProduct) {
      this.changeResultProducts(filteredProduct);
    }
  }
}
</script>