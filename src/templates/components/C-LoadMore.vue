<template>
  <div v-if="isShow">
    <div :class="{ 'is-show': isActive }" class="c-load-icon js-load-more-icon">
      <CSpinner />
    </div>
    <CButton @button-click="loadMore">Загрузить еще</CButton>
  </div>
</template>

<script>
import Api from '@/api/Axios'
import CButton from '@/templates/components/C-Button.vue';
import CSpinner from '@/templates/components/C-Spinner.vue';

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
      isShow: false,
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

  watch: {
    countProducts(countProducts) {
      this.isShow = countProducts > 16;
    }
  },

  methods: {
    loadMore() {
      this.offset = this.productsLength * this.page;
      this.page += 1;
    
      if (this.productsLength >= this.countProducts) {
        this.isActive = false;
        this.isShow = false;
        return;
      }
      
      this.isActive = true;

      Api.post('archive/load_more_products', {
        url: window.location.href,
        page: this.page,
        offset: this.offset,
        slug: this.categorySlug,
      })
      .then((result) => {
        if(result.data.products !== 'nomore') {
          this.$emit('load-more-products', result.data.products)
          this.isActive = false;
        } else {
          this.isActive = false;
          this.isShow = false;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>