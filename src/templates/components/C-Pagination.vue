<template>
  <div v-if="maxPages > 0" class="c-pagination">
    <pagination 
      v-model="page" 
      :records="countProducts" 
      :per-page="16"
      @paginate="callback"
    />
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

  beforeMount() {
    this.page = this.currentPage
  },

  props: {
    countProducts: {
      type: Number,
      default: 16
    },
    categorySlugFromRoute: {
      type: String
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
 
  methods: {
    ...mapActions({
      fetchProducts: 'catalog/fetchProducts'
    }),

    callback: function(changedPage) {
      this.addQueryParams(changedPage);

      console.log(this.page);
      this.offset = this.productsLength * this.page;

      this.fetchProducts({
        url: this.$route.fullPath, 
        page: this.page, 
        slug: this.categorySlugFromRoute,
        offset: this.offset, 
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