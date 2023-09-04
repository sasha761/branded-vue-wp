<template>
  <div v-if="isShow">
    <div :class="{ 'is-show': isActive }" class="c-load-icon js-load-more-icon">
      <span class="c-spinner"> 
        <span></span> 
        <span></span> 
        <span></span> 
      </span>
    </div>
    <button
      :data-current-page="data.current_page"
      :data-all-pages="allPages"
      :data-slug="data.query_object.slug"
      :data-count="productsLength"
      :data-all-posts="data.query_object.count"
      :data-category="data.query_object.taxonomy"
      @click="loadMore"
      class="u-btn is-load-more is-medium is-black js-show-more-product"
    >
      Загрузить еще
    </button>
  </div>
</template>

<script>
import Api from '@/api/Axios'

export default {
  data() {
    return {
      data: {
        query_object: {
          slug: ''
        }
      },
      isActive: false,
      isShow: true
    }
  },

  computed: {
    allPages: function () {
      return this.productsLength >= 16 ? Math.ceil(this.data?.query_object?.count / this.productsLength) : 1;
    },

    offset: function () {
      return this.productsLength * this.data.current_page;
    }
  },

  props: {
    productsLength: {
      type: Number
    }
  },

  mounted() {
    this.getCategoryInfo()
  },

  methods: {
    getCategoryInfo() {
      let url = this.$route.params.subcategorySlug ? this.$route.params.subcategorySlug : this.$route.params.categorySlug;

      Api.post('archive/load_more_products_button', {
        url: url
      })
      .then((result) => {
        this.data = result.data; 
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    },



    loadMore() {
      if (this.productsLength >= this.data?.query_object?.count) {
        this.isActive = false;
        this.isShow = false;
        return;
      }

      this.isActive = true;
      const url = this.$route.fullPath
      
      Api.post('archive/load_more_products', {
        url: url,
        page: this.data.current_page,
        offset: this.offset,
        slug: this.data.query_object.slug,
        taxonomy: this.data.query_object.taxonomy,
      })
      .then((result) => {
        if(result.data.products !== 'nomore') {
          this.data.current_page += 1
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