<template>
  <div v-if="maxPages > 0" class="c-pagination">
    <pagination 
      v-model="page" 
      :records="countProducts" 
      :per-page="16"
      @paginate="callback"
    />

    <!-- <ul>
      <li 
        v-for="(page, key) in maxPages"
        :key="key"
        :class="{'is-active' : page === currentPage}"
      >
        <router-link
          :to="{ 
            name: 'product-category', 
            params: { 
              categorySlug: $route.params.categorySlug,
              subcategorySlug: $route.params.subcategorySlug,
            },
            query: {
              page: page
            }
          }" 
          class="page-number page-numbers"
        >
          {{page}}
        </router-link>
      </li>
    </ul> -->
  </div>
</template>

<script>
// import Api from '@/api/Axios'
import Pagination from 'vue-pagination-2';

import { mapActions } from 'vuex';

export default {
  components: {
    Pagination
  },

  // options: {
  //   chunksNavigation: 'fixed',
  // },  

  data() {
    return {
      page: 1,
      maxPages: 1,
      offset: null,
    }
  },

  props: {
    countProducts: {
      type: Number,
      default: 16
    },
  },

  mounted() {
    // this.loadPagination();
    console.log(this.page);
  },  

  computed: {
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

    callback: function(changedPage) {
      this.addQueryParams(changedPage);
      this.offset = this.productsLength * this.currentPage;

      console.log(this.currentPage);
      this.fetchProducts({
        url: this.$route.fullPath, 
        page: this.currentPage, 
        slug: this.categorySlugFromRoute,
        offset: this.offset, 
      })
      // if(changedPage > 1) {
        
      // } else {
        // this.removeQueryParams();
      // }
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

    // loadPagination() {
    //   this.url = this.$route.params.subcategorySlug || this.$route.params.categorySlug;

    //   Api.post('archive/pagination', {
    //     url: this.url
    //   })
    //   .then((result) => {
    //     console.log(result)
    //     this.maxPages = result.data.max_num_pages
    //     this.currentPage = result.data.current_page
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // }
  }
}
</script>