<template>
  <main
    class="p-product"
    :data-id="product.id"
    :data-price="product.price"
    :data-categories="getProductCategory"
  >
    <C-PageLoader v-if="requestInProgress"/>
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
                @click.prevent="openLightbox"
                data-key="0"
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
                    @button-click="quickBuyModal"
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

              <div class="l-product__info" v-if="product.product_info">
                <C-Accordion :accordion-info="product.product_info" />
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
              @click.prevent="openLightbox"
              :data-key="index + 1"
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
</template>

<script>
import Api from '@/api/Axios'

import vSelect from 'vue-select';
import LSubscribe from '@/templates/layout/L-Subscribe.vue'
import LRelated from '@/templates/layout/L-Related.vue'
import LComments from '@/templates/layout/L-Comments.vue'

import CPageLoader from '@/templates/components/C-PageLoader.vue'

import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'
import CAccordion from '@/templates/components/C-Accordion.vue'
import CButton from '@/templates/components/C-Button.vue'
// import CSpinner from '@/templates/components/C-Spinner.vue'

// import stringConfig from '@/config/stringConfig.js';
import waitRequest from '@/mixins/waitRequest';

import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    LSubscribe,
    LRelated,
    LComments,
    CBreadcrumb,
    CAccordion,
    CButton,
    vSelect,
    CPageLoader
  },

  mixins: [waitRequest],

  data() {
    return {
      product: [],
      selectedSize: '',
      relatedProducts: [],
      relatedProductsChecker: false,
      // relatedRequestInProgress: false
    }
  },

  computed: {
    ...mapGetters({
      cartProducts: 'cart/getCartProducts',
    }),

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
      this.selectedSize = this.product?.size_attribute[0];
    } else {
      this.waitRequest(() => {
        return Api.get('product/get_single_product', {
          params: {
            url: this.$route.params.productName
          }
        })
        .then((result) => {
          console.log(result)
          this.product = result.data
          this.selectedSize = result.data?.size_attribute[0];
        })
        .catch((error) => {
          console.log(error);
        });
      })
    }

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },

  methods: {
    ...mapMutations({
      setProductToCart: 'cart/setProductToCart',
      setTotalAmount: 'cart/setTotalAmount'
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

        return Api.get('product/get_related_products', {
          params: {
            id: this.product.id
          }
        })
        .then((result) => {
          this.relatedProducts = result.data.related_products
          this.relatedProductsChecker = true;
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },

    handleSelectChange() {
      // console.log(value);
    },

    addProductToCart(product) {      
      let addedProduct = { ...product };
      let allProducts = this.cartProducts;
      addedProduct.quantity = 1;
      
      // addedProduct.size_attribute = addedProduct.size_attribute.filter(obj => obj.name === this.selectedSize.name);
      addedProduct.size_selected = addedProduct.size_attribute.filter(obj => obj.name === this.selectedSize.name);

      const index = allProducts.findIndex(obj => obj.size_selected[0].id === this.selectedSize.id);

      if (index !== -1) {
        allProducts[index].quantity += 1;
      } else {
        allProducts.push(addedProduct);
      }

      // // Обновление состояния корзины
      this.setProductToCart(allProducts);
      this.setTotalAmount();
    },

    openLightbox(event) {
      // console.log();
      const elementKey = event.currentTarget.getAttribute('data-key')
      console.log()
      this.$popup.open('PopupLightbox', {
        images: [
          ...[this.product.post_img_xl], 
          ...this.product.images, 
          this.product.video
        ], 
        slideKey: elementKey})
    },

    quickBuyModal() {
      this.$popup.open('PopupQuickBuy', {product: this.product})
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>
