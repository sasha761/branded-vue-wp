<template>
  <div>
    <C-Modal />
    <L-Header />
    <div class="wrapper">
      <main
        class="p-product"
        :data-id="product.id"
        :data-price="product.price"
        :data-categories="getProductCategory"
      >
        <div class="u-container">
          <C-Breadcrumb />
          <section class="l-product">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-sm-12 u-col">
                <div  class="l-product__img">
                  <a
                    v-if="product.post_img_xl"
                    :href="product.post_img_xl"
                    class="js-lightbox"
                  >
                    <img :src="product.post_img_xl" alt="" height="1440" width="1000">
                  </a>
                </div>
              </div>
              <div class="col-lg-5 col-md-12 u-col">
                <div class="l-product__content">
                  <a
                    href="https://branded.com.ua/brand/staff/"
                    class="l-product__category">
                    {{product.post_attr_brand}}
                  </a>
                  <h1 class="l-product__name">{{product.name}}</h1>
                  <p class="c-price" v-html="product.price_html"></p>

                  <form class="c-product-form" :data-product_id="product.id">
                    <span class="c-product-form__size">Размер</span>

                    <v-select 
                      v-model="selectedSize" 
                      @input="handleSelectChange" 
                      :options="product.size_attribute"
                      label="name">
                    </v-select>
                    
                    <div class="c-product-form__btn">
                      <CButton 
                        v-if="product.is_stock != 'outofstock'"
                        class="u-btn is-medium is-black"
                        @button-click="addProductToCart(product)"
                        :value="product.id"
                      >
                        В корзину
                      </CButton>

                      <CButton 
                        v-if="product.is_stock != 'outofstock'"
                        class="u-btn is-medium is-black-border"
                      >
                        Купить в 1 клик
                      </CButton>
                    </div>
                  </form>

                  <div  class="l-product__text">
                    <h4 class="l-product__text-title">Описание:</h4>
                    <div v-if="product.sku">
                      <span>Артикул: </span> <span>{{product.sku}}</span>
                    </div>
                    <div v-html="product.description"></div>
                  </div>

                  <div class="l-product__info ">
                    <C-Accordion :accordion-info="product.product_info" v-if="product.product_info"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-none d-lg-flex" v-if="hasProductImages">
              <div 
                class="col-lg-6 u-col" 
                v-for="(imageItem, index) in product.images"
                :key="index"
                >
                <a
                  :href="imageItem"
                  class="js-lightbox"
                >
                  <img :src="imageItem" alt="" height="1440" width="1000">
                </a>
              </div>
            </div>
          </section>
        </div>
        <L-Related ref="relatedProductsSection" :products="relatedProducts"/>
        <L-Comments />
        <L-Subscribe />
      </main>
      <L-Footer />
    </div>
  </div>
</template>

<script>
import Api from '@/api/Axios'

import vSelect from 'vue-select';
import LHeader from '@/templates/layout/L-Header.vue'
import LFooter from '@/templates/layout/L-Footer.vue'
import LSubscribe from '@/templates/layout/L-Subscribe.vue'
import LRelated from '@/templates/layout/L-Related.vue'
import LComments from '@/templates/layout/L-Comments.vue'

import CModal from '@/templates/components/C-Modal.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'
import CAccordion from '@/templates/components/C-Accordion.vue'
import CButton from '@/templates/components/C-Button.vue'

import { mapMutations } from 'vuex';

export default {
  components: {
    LHeader,
    LFooter,
    LSubscribe,
    LRelated,
    LComments,
    CBreadcrumb,
    CModal,
    CAccordion,
    CButton,
    vSelect
  },

  data() {
    return {
      product: [],
      selectedSize: '',
      relatedProducts: [],
      relatedProductsChecker: false,

    }
  },

  computed: {
    hasProductImages() {
      return this.product?.images?.length
    }, 
    getProductCategory() {
      return this.product?.cats?.join(', ');
    },
  },

  mounted() {
    if(this.$route.params.productData) {
      this.product = this.$route.params.productData
      this.selectedSize = this.product?.size_attribute[0]?.name;
    } else {
      Api.post('product/get_single_product', {
        url: this.$route.params.productName
      })
      .then((result) => {
        console.log(result)
        this.product = result.data
        this.selectedSize = result.data?.size_attribute[0]?.name;

      })
      .catch((error) => {
        console.log(error);
      });
    }

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },

  methods: {
    ...mapMutations({
      setProductToCart: 'cart/setProductToCart'
    }),

    handleScroll() {
      this.checkVisibility();
    },
    handleResize() {
      this.checkVisibility();
    },

    checkVisibility() {
      const section = this.$refs.relatedProductsSection.$el;
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible && this.relatedProductsChecker === false) {

        this.relatedProductsChecker = true;

        Api.post('product/get_related_products', {
          id: this.product.id
        })
        .then((result) => {
          this.relatedProducts = result.data.related_products
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },

    handleSelectChange(value) {
      console.log(value);
    },

    addProductToCart(product) {
      let addedProduct = { ...product };
      addedProduct.size_attribute = {};
      addedProduct.size_attribute = this.selectedSize;
      
      console.log(addedProduct);
      this.setProductToCart(addedProduct);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>
