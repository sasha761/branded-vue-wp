<template>
  <main class="p-shop">
    <C-PageLoader v-if="requestInProgress"/>
    <div class="u-container">
      <C-Breadcrumb />
      <div class="p-shop__flex">
        <div class="p-shop__sidebar">
          
        </div>
        <div class="p-shop__catalog">
          
          <section class="l-shop" :data-categories="categoryTitle" >
            <h1 class="u-h2">{{categoryTitle}}</h1>
            <L-Filter-Block @filterRequestInProgress="filterRequestInProgress"/>
            
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
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'

import CProductList from '@/templates/components/C-Product-list.vue'

import { mapActions, mapMutations, mapGetters } from 'vuex';
import waitRequest from '@/mixins/waitRequest';
import Pagination from 'vue-pagination-2';


export default {
  name: "App",

  mixins: [waitRequest],

  data() {
    return {
      currentFullPath: this.$route.fullPath,
      isReplacingRoute: false,
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
    CBreadcrumb,
    Pagination
  },

  beforeMount() {
    this.page = this.currentPage
  },

  mounted() {
    this.fetchProductsData();
  },

  watch: {
    currentLang(newLang, oldLang) {
      console.log('watch: ', newLang, oldLang)
      // if (!this.isReplacingRoute && newLang !== oldLang) {
        this.fetchProductsData();
      // }
    }, 
  },

  computed: {
    ...mapGetters({
      products: 'catalog/products',
      productsCount: 'catalog/productsCount',
      categoryInfo: 'catalog/categoryInfo',
      currentLang: 'lang/getCurrentLang',
      apiUrl: 'lang/getCurrentLang',
    }),

    offset() {
      return 16 * (this.currentPage - 1);
    },
    
    categorySlugFromRoute() { return this.$route.params.subcategorySlug || this.$route.params.categorySlug },
    currentPage() { 
      const queryPage = this.$route?.query?.page;
      const currentPageNumber = Number(queryPage) || 1;
      return currentPageNumber;
    },

    categoryTitle() {
      let title = '';
      if (this.categoryInfo.parent) { 
        title = this.categoryInfo?.parent + '. ' + this.categoryInfo.name 
      } else {
        title = this.categoryInfo.name 
      } 
      return title;
    }
  },

  methods: {
    ...mapMutations({
      setProductsList: 'catalog/setProductsList',
      setApiUrl: 'lang/setApiUrl'
    }),

    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    setRequestInProgress(status) {
      console.log(status)
      this.requestInProgress = status;
    },

    paginationCallback(changedPage) {
      this.addQueryParams(changedPage);
      // this.fetchProductsCustom();
      this.$refs.productsList?.callbackInit();
    },

    filterRequestInProgress(request) {
      this.requestInProgress = request
    },

    fetchProductsData() {
      this.waitRequest(() => {
        return this.fetchProducts({
          url: this.currentFullPath, 
          page: this.currentPage,
          slug: this.categorySlugFromRoute,
          offset: this.offset,
          lang: this.currentLang,
        }).then(result => {
          this.setApiUrl(result.product_cat.url)
        })
      })
    },

    fetchProductsCustom() {
      const offset = this.productsLength * this.page;

      return this.fetchProducts({
        url: this.$route.fullPath, 
        page: this.page, 
        slug: this.categorySlugFromRoute,
        offset: offset, 
        lang: this.currentLang,
      }).then(result => {
        this.setApiUrl(result.product_cat.url)
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