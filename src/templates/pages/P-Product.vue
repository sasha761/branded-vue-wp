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
                    <img :src="product.post_img_xl" alt="">
                  </a>
                </div>
              </div>
              <div class="col-lg-5 col-md-12 u-col">
                <div class="l-product__content">
                  <a
                    href="https://branded.com.ua/brand/staff/"
                    class="l-product__category"
                    >{{product.post_attr_brand}}</a
                  >
                  <h1 class="l-product__name">{{product.name}}</h1>

                  <p class="c-price" v-html="product.price_html"></p>

                  <form
                    class="js-product-form cart c-product-form variations_form wvs-loaded"
                    :data-product_id="product.id"
                  >
                    <span class="c-product-form__size">Размер</span>

                    <v-select 
                      v-model="selectedSize" 
                      @input="handleSelectChange" 
                      :options="product.size_attribute"
                      label="name">
                    </v-select>
                    
                    <div class="c-product-form__btn">
                      <button
                        @click="setProductToCart(product)"
                        type="button"
                        class="u-btn is-medium is-black single_add_to_cart_button button disabled wc-variation-selection-needed"
                        name="add-to-cart"
                        :value="product.id"
                      >
                        <span>В корзину</span>
                      </button>
                      <button type="button" class="u-btn is-medium is-black-border js-quick-add-to-card is-disabled">
                        <span>Купить в 1 клик</span>
                      </button>
                    </div>
                  </form>
                  <div class="l-product__text">
                    <h4 class="l-product__text-title">Описание:</h4>
                    <div v-if="product.sku">
                      <span>Артикул: </span> <span>{{product.sku}}</span>
                    </div>
                    <div v-html="product.short_description"></div>
                  </div>
                  <div class="l-product__info ">
                    <C-Accordion />
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
                  <img :src="imageItem" alt="">
                </a>
              </div>
            </div>
          </section>
        </div>
        <L-Related />
        <L-Comments />
        <L-Subscribe />
      </main>
      <L-Footer />
    </div>
  </div>
</template>

<style>
  @import 'vue-select/dist/vue-select.css';
</style>

<script>
import vSelect from 'vue-select';
import LHeader from '@/templates/layout/L-Header.vue'
import LFooter from '@/templates/layout/L-Footer.vue'
import LSubscribe from '@/templates/layout/L-Subscribe.vue'
import LRelated from '@/templates/layout/L-Related.vue'
import LComments from '@/templates/layout/L-Comments.vue'

import CModal from '@/templates/components/C-Modal.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'
import CAccordion from '@/templates/components/C-Accordion.vue'

import { mapActions, mapMutations } from 'vuex';

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
    vSelect
  },

  data() {
    return {
      product: [],
      selectedSize: '',
    }
  },

  computed: {
    hasProductImages() {
      return this.product?.images?.length
    }, 
    getProductCategory() {
      return this.product?.cats?.join(', ');
    },

    // deliverAndReturn() {
    //   return this.product?.product_info?.delivery_and_return;
    // },
    // payment_method() {
    //   return this.product?.product_info?.payment_method;
    // }
  },

  mounted() {
    if(this.$route.params.productData) {
      this.product = this.$route.params.productData
      this.selectedSize = this.product?.size_attribute[0]?.name;
    } else {
      this.fetchSingleProduct(this.$route.params.productName).then(result => {
        this.product = result
        console.log(result);
        this.selectedSize = this.product?.size_attribute[0]?.name;
      });
    }
  },

  methods: {
    ...mapActions({
      fetchSingleProduct: 'product/fetchSingleProduct'
    }),

    ...mapMutations({
      setProductToCart: 'cart/setProductToCart'
    }),

    handleSelectChange(value) {
      console.log(value);
    }
  }
}
</script>
