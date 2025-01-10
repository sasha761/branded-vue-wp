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

  // beforeDestroy(){
  //   this.setProductsList([]);
  // },

  beforeMount() {
    this.page = this.currentPage
  },

  mounted() {
    this.fetchProductsData();
  },

  watch: {
    currentLang: 'fetchProductsData', // Отслеживаем изменение языка
  },

  computed: {
    ...mapGetters({
      products: 'catalog/products',
      productsCount: 'catalog/productsCount',
      categoryInfo: 'catalog/categoryInfo',
      currentLang: 'menu/getCurrentLang',
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
      if (this.categoryInfo.acf_title) {
        title = this.categoryInfo.acf_title
      } else if (this.categoryInfo.parent) { 
        title = this.categoryInfo?.parent + '. ' + this.categoryInfo.name 
      } else {
        title = this.categoryInfo.name 
      } 
      return title;
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

    fetchProductsData() {
      this.waitRequest(() => {
        return this.fetchProducts({
          url: this.$route.fullPath, 
          page: this.currentPage,
          slug: this.categorySlugFromRoute,
          offset: this.offset,
          lang: this.currentLang,
        }).then(result => {
          console.log(result);
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