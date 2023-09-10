<template>
  <div>
    <div 
      v-if="isShow"
      :class="{ 'is-show': isActive }" 
      class="c-load-icon js-load-more-icon"
    >
      <CSpinner />
    </div>
    <CButton 
      v-if="isShow"
      class="is-load-more is-medium is-black js-show-more-product"
      @button-click="loadMore"
    >
      Загрузить еще
    </CButton>
  </div>
</template>

<script>
// import Api from '@/api/Axios'
import CButton from '@/templates/components/C-Button.vue';
import CSpinner from '@/templates/components/C-Spinner.vue';

import { mapActions } from 'vuex';

export default {
  components: {
    CButton,
    CSpinner
  },

  data() {
    return {
      data: {},
      isActive: false,
      page: null,
      offset: null,
    }
  },

  mounted() {
    this.page = this.currentPage;
  },

  props: {
    productsLength: {
      type: Number,
      default: 16
    },
    categorySlug: {
      type: String,
      require: true
    },
    countProducts: {
      type: Number,
      default: 16
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },

  computed: {
    isShow() {
      return this.countProducts > this.productsLength;
    }
  },

  methods: {
    ...mapActions({
      fetchMoreProducts: 'Catalog/fetchMoreProducts'
    }),

    loadMore() {
      this.offset = this.productsLength * this.page;
      this.page += 1;
    
      if (this.productsLength >= this.countProducts) {
        this.isActive = false;
        this.isShow = false;
        return;
      }
      
      this.isActive = true;

      this.fetchMoreProducts(window.location.href, this.page, this.offset, this.categorySlug).then(result => {
        console.log(result)
        if(!result && !result.status) return;

        this.isActive = false;
        if(result.status === 'nomore') this.isShow = false;
      })

      // Api.post('archive/load_more_products', {
      //   url: window.location.href,
      //   page: this.page,
      //   offset: this.offset,
      //   slug: this.categorySlug,
      // })
      // .then((result) => {
      //   if(result.data.products !== 'nomore') {
      //     this.$emit('load-more-products', result.data.products)
      //     this.isActive = false;
      //   } else {
      //     this.isActive = false;
      //     this.isShow = false;
      //   }
      // })
      // .catch((error) => {
      //   console.log(error);
      // })
    }
  }
}
</script>