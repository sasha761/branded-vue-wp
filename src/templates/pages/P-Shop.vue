<template>
  <main class="p-shop">
    <C-PageLoader v-if="requestInProgress"/>
    <div class="u-container">
      <C-Breadcrumb />
      <div class="p-shop__flex">
        <div class="p-shop__sidebar">
          
        </div>
        <div class="p-shop__catalog">
          
          <section class="l-shop" data-categories="Женщинам" data-cat-id="17">
            <h1 class="u-h2">Женщинам</h1>
            <L-Filter-Block />
            
            <C-Product-list 
              :products="products"
              :callback="fetchProductsCustom"
              ref="productsList"
            ></C-Product-list>
            
            <div v-if="maxPages > 0" class="c-pagination">
              <pagination 
                v-model="page" 
                :records="productsCount" 
                :per-page="16"
                @paginate="paginationCallback"
                :options="{texts: null}"
              />
            </div>
            <!-- <C-Pagination 
              @pagination-Request-In-Progress="paginationRequst"
              :category-slug-from-route="categorySlugFromRoute" 
              :count-products="productsCount" 
              :current-page="currentPage"
            /> -->
          </section>
        </div>
      </div>
    </div>
    <L-Subscribe />
  </main>
</template>
<script>

import LSubscribe from '@/templates/layout/L-Subscribe.vue'
import LFilterBlock from '@/templates/layout/L-Filter-block.vue'

import CPageLoader from '@/templates/components/C-PageLoader.vue'
// import CPagination from '@/templates/components/C-Pagination.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'

import CProductList from '@/templates/components/C-Product-list.vue'
// import Api from '@/api/Axios'

import { mapActions, mapMutations, mapGetters } from 'vuex';
import waitRequest from '@/mixins/waitRequest';
import Pagination from 'vue-pagination-2';


export default {
  name: "App",

  mixins: [waitRequest],

  data() {
    return {
      page: 1,
      maxPages: 1,
      // offset: null,
    }
  },

  components: {
    LFilterBlock,
    LSubscribe,
    CPageLoader,
    CProductList,
    // CProduct,
    // CPagination,
    CBreadcrumb,
    Pagination
  },

  beforeDestroy(){
    this.setProductsList([]);
  },

  beforeMount() {
    this.page = this.currentPage
  },

  mounted() {
    this.waitRequest(() => {
      return this.fetchProducts({
        url: this.$route.fullPath, 
        page: this.currentPage,
        slug: this.categorySlugFromRoute,
        offset: this.offset
      }).then(result => {
        console.log(result);
      })
    })
  },

  computed: {
    ...mapGetters({
      products: 'catalog/products',
      productsCount: 'catalog/productsCount',
    }),

    offset() {
      return 16 * (this.currentPage - 1);
    },
    
    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    currentPage() { 
      const queryPage = this.$route?.query?.page;
      const currentPageNumber = Number(queryPage) || 1;
      return currentPageNumber;
    }
  },

  methods: {
    ...mapMutations({
      setProductsList: 'catalog/setProductsList'
    }),

    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    paginationCallback(changedPage) {
      this.addQueryParams(changedPage);
      // this.fetchProductsCustom();
      this.$refs.productsList?.callbackInit();
    },

    fetchProductsCustom() {
      const offset = this.productsLength * this.page;

      return this.fetchProducts({
        url: this.$route.fullPath, 
        page: this.page, 
        slug: this.categorySlugFromRoute,
        offset: offset, 
      })
    },

    addQueryParams(currentPage) {
      const query = { ...this.$route.query };
      query['page'] = currentPage;
      this.$router.push({ path: '', query });
    },

    removeQueryParams() {
      const query = { ...this.$route.query };
      delete query['page'];
      this.$router.push({ path: '', query });
    },
  }
}
</script>

<style>
  .VuePagination__count {
    display: none;
  }
</style>