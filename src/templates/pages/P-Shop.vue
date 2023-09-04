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
                <div v-if="resaultProducts" class="l-shop__product">
                  <div class="row js-load-more">
                    <div
                      v-for="product in resaultProducts"
                      :key="product.id"
                      class="col-lg-3 col-md-4 col-sm-6 col-6 u-col js-gallery-item"
                    >
                      <C-Product :product="product" />
                    </div>
                  </div>
                  <C-LoadrMore @load-more-products="loadMoreProducts" :products-length="products.length" />
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
import CLoadrMore from '@/templates/components/C-LoadMore.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'

import Api from '@/api/Axios'

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
    CLoadrMore,
    CBreadcrumb
  },

  data() {
    return {
      products: [],
      resaultProducts: [],
    }
  },

  mounted() {
    this.getProducts();

    console.log(this.$route)
  },

  methods: {
    // getProducts() {
    //   this.$root.api.get("products", {
    //     per_page: 16,
    //     category: 17
    //   })
    //   .then((response) => {
    //     this.products = response.data
    //     this.resaultProducts = response.data;
    //     console.log(this.resaultProducts)
    //   })
    //   .catch(error => console.log(error));
    // },
    getProducts() {
      // let url = this.$route.fullPath.replace('/product-category/', '');
      let url = this.$route.params.subcategorySlug ? this.$route.params.subcategorySlug : this.$route.params.categorySlug;

      Api.post('archive/get_products', {
        url: url
      })
      .then((result) => {
        this.products = result.data; 
        this.resaultProducts = result.data;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    },

    loadMoreProducts(loadMoreProducts) {
      // console.log(loadMoreProducts)
      this.resaultProducts = [...this.resaultProducts, ...loadMoreProducts];
    },

    searchHendler(searchResults) {
      let products = Object.values(this.products).filter((item) => {
        return item.post_title.toLowerCase().includes(searchResults.toLowerCase())
      })
      this.resaultProducts = products;
      // this.sortHendler('', products)
    },

    filteredProduct(filteredProduct) {
      this.resaultProducts = filteredProduct;
    }

  }
}
</script>
