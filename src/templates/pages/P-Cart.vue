<template>
  <div>
    <C-Modal />
    <L-Header />
    <div class="wrapper">
      <main class="p-cart">
        <div class="u-container">
          <form class="p-cart__flex woocommerce-cart-form" action="" method="post">
            <div v-if="cartProducts" class="l-cart">
              <h1 class="u-h3">Корзина</h1>
              
              <div v-for="(product, index) in cartProducts" :key="index" class="c-product-cart">
                <router-link
                  :to="{ 
                    name: 'product', 
                    params: { productName: extractProductName(product.permalink), productData: product }
                  }" 
                  class="c-product-cart__img"
                >
                  <img :src="product.post_img_m">
                </router-link>
                <div class="c-product-cart__info">
                  <div class="c-product-cart__name">
                    <!-- {% for item in product.attr.brand %}
                      {% set brandlink = function('get_category_link', item.term_id) %}
                      <a href="{{brandlink}}" class="c-product-cart__name-brand">{{ 'Brand' | translateString('Cart - Brand') }}: {{item.name}}</a>
                    {% endfor %} -->
                    <router-link
                      :to="{ 
                        name: 'product', 
                        params: { productName: extractProductName(product.permalink), productData: product }
                      }" 
                      class="c-product-cart__name-title"
                    >
                      {{product.name}}
                    </router-link>

                    <!-- {% if product.attr.size %} -->
                      <div v-if="product.size_attribute" class="is-size mb-3">Размер: {{product.size_attribute[0].name}}</div>
                    <!-- {% endif %} -->
                    <!-- {% if product.attr.color %}
                      <div class="is-color mb-3">{{ 'Color' | translateString('Cart - Color') }}: {{product.attr.color}}</div>
                    {% endif %} -->
                      <div v-if="product.quantity >= 2" class="is-quantity mb-3">Количество: <b>{{product.quantity}}</b></div>

                    <div class="d-block d-sm-none align-items-center">
                      <div class="c-price">{{product.price * product.quantity}}</div>
                      <div class="c-remove">
                        <svg width="20px" height="20px">
                          <use xlink:href="#icon-close"></use>
                        </svg>
                        <span>Удалить</span>
                      </div>
                    </div>	
                  </div>
                  
                  <div class="d-none d-sm-block">
                    <div class="c-price">{{product.price * product.quantity}}</div>
                    
                    <div class="c-remove">
                      <svg width="20px" height="20px">
                        <use xlink:href="#icon-close"></use>
                      </svg>
                      <span>Удалить</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="l-cart l-cart-empty">
              <!-- {# <img src="{{ theme.link }}/dist/img/empty-cart-icon.svg"> #} -->
              <h2>Корзина пуста</h2>
              <!-- <a href="{{ site.url }}/shop">{{ 'In store' | translateString('buttons - In store') }}</a> -->
            </div>

            <aside class="l-sidebar-cart actions">
              <div class="l-sidebar-cart__cupons">
                <h2 class="u-h3">Купоны</h2>

                <div class="c-form-cupons">
                  <input type="text" name="coupon_code" id="coupon_code" value="" placeholder="Промо код">
                  <button type="submit" name="apply_coupon" value="Apply coupon" class="u-btn-submit">
                    <svg width="26px" height="14px" class="">
                      <use xlink:href="#big-arrow"></use>
                    </svg>
                  </button>
                </div>  
              </div>

              <div class="l-sidebar-cart__total actions">
                <h2 class="u-h3">Ваш заказ</h2>
                <ul class="l-sidebar-cart__list">
                  <li class="l-sidebar-cart__item">
                    <span>Сумма заказа</span>
                    <span class="c-price">{{}}</span>
                  </li>
                  <!-- <li class="l-sidebar-cart__item">
                    <span>Доставка</span>
                    <span class="c-price"></span>
                  </li> -->

                  <!-- {% if coupons %}
                    {% for item in coupons %}
                      <li class="l-sidebar-cart__item is-red">
                        <span>{{ 'Discount Coupon' | translateString('Cart - Discount Coupon') }}</span>
                        <span>-{{item.amount}} {{currency}}</span>
                      </li>
                    {% endfor %}
                  {% endif %} -->

                  <li class="l-sidebar-cart__item">
                    <span>Всего</span>
                    <span></span>
                  </li>
                  
                  <router-link :to="{name: 'checkout', params: { checkout: getCheckoutUrl } }" class="u-btn is-black">Оформить заказ</router-link>
                </ul>
              </div>
            </aside>
              
          </form>
        </div>
      </main>
      <L-Footer />
    </div>  
  </div>
</template>      

<script>
// import Api from '@/api/Axios'

import LHeader from '@/templates/layout/L-Header.vue'
import LFooter from '@/templates/layout/L-Footer.vue'

import CModal from '@/templates/components/C-Modal.vue'
// import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'
// import CButton from '@/templates/components/C-Button.vue'

import { mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    LHeader,
    LFooter,
    CModal
  },

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters({
      cartProducts: 'cart/getCartProducts',
      getCheckoutUrl: 'cart/getCheckoutUrl'
    }),
  },

  methods: {
    ...mapMutations({
      setProductToCart: 'cart/setProductToCart'
    }),

    extractProductName(url) {
      if (!url) return;

      const parts = url.split('/');
      return parts[parts.length - 2];
    }
  }

}
</script>
