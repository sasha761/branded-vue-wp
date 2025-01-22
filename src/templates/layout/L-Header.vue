<template>
  <header class="l-header">
    <div class="l-header__bottom u-relative">
      <div class="u-container">
        <div class="l-header__bottom-left">
          <C-Logo />
          <C-Menu :headerMenu="getHeaderMenu" v-if="getHeaderMenu.length"/>
        </div>
        <div class="l-header__bottom-right">
          <form
            role="search"
            method="get"
            id="searchform"
            class="c-search"
            action="https://branded.com.ua"
          >
            <button type="submit" class="c-search__button">
              <svg width="15px" height="17px" class="is-search">
                <use xlink:href="#search"></use>
              </svg>
            </button>
            <input type="hidden" name="post_type" value="product" />
            <input
              type="text"
              v-model="search"
              placeholder="Поиск"
              name="s"
              id="s"
            />
          </form>
          <div class="c-service cart d-none d-sm-block">
            <div>
              <span class="c-service__count">{{getCartProducts.length}}</span>
              <svg width="20px" height="20px"><use xlink:href="#cart"></use></svg>
            </div>
            <div class="c-service__dropdown">
              <div class="l-mini-cart widget_shopping_cart_content">
        
                <p class="u-h3">Корзина</p>
                <span class="l-mini-cart__count">{{getCartProducts.length}} товар</span>
                <div v-if="getCartProducts">
                  <ul class="l-mini-cart__list">
                    <li 
                      v-for="(product, index) in getCartProducts" 
                      :key="index"
                    >
                      <!-- <pre>{{getCartProducts[index].size_selected}}</pre> -->
                      <div class="l-mini-cart__item" v-if="(index == 0) || product.size_selected[0].id != getCartProducts[index-1].size_selected[0].id">
                        <div class="l-mini-cart__item-img">
                          <router-link
                            :to="{
                              name: 'product',
                              params: {
                                productName: extractProductName(product.permalink),
                                productData: product,
                              },
                            }"
                          >
                            <img :src="product.post_img_m"> 
                          </router-link>
                        </div>
                        <div class="l-mini-cart__item-info">
                          <div v-if="product.post_attr_brand" class="is-brand">{{product.post_attr_brand}}</div>
                          <span class="is-name">{{product.name}}</span>
                          <p class="is-quantity" v-if="product.quantity >= 2">Количество: <b>{{product.quantity}}</b></p>
                          <div class="l-mini-cart__item-attr">
                            <div v-if="product.size_selected" class="is-size">
                              <span>Размер: </span>
                              <span class="is-bold">{{product.size_selected[0].name}}</span>
                            </div>
                            <!-- {% if product.attr.size %}
                              <div class="is-size">
                                <span>{{ 'Size' | translateString('Cart - Size') }}:</span>
                                <span class="is-bold">{{product.attr.size}}</span>
                              </div>
                            {% endif %}	 -->
                            <!-- {% if product.attr.color %}
                              <div class="is-color">
                                <span>{{ 'Color' | translateString('Cart - Color') }}:</span>
                                <span class="is-bold">{{product.attr.color}}</span>
                              </div>
                            {% endif %} -->
                          </div>

                          <p class="c-price">
                            {{ product.price }} {{strings.string.currency}}
                          </p>

                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="l-mini-cart__total">
                    <span>Сумма заказа</span>
                    <span class="is-bold">{{getTotalAmount}} {{strings.string.currency}}</span>
                  </div>

                  <div class="l-mini-cart__btn">
                    <router-link :to="{name: 'checkout', params: { checkout: getCheckoutUrl } }" class="u-btn is-black">Оформление заказа</router-link>
                    <router-link :to="{name: 'cart', params: { cart: getCartUrl } }" class="is-cart">В корзину</router-link>
                  </div>
                </div>
                <div v-else>
                  <p>Корзина пуста</p>
                </div>
              </div>
            </div>
          </div>
          <div class="c-dropdown js-dropdown" :class="{'is-active': activeDropdown}" @click="activeDropdown = !activeDropdown">
            <span class="c-dropdown__current">Помощь</span>
            <svg width="11px" height="7px" class="u-arrow"><use xlink:href="#arrow"></use></svg>
            <ul class="c-dropdown__list">
              <li><router-link to="/dostavka-i-oplata">Доставка и оплата</router-link></li>
              <li><router-link to="/vozvrat-i-obmen">Возврат и обмен</router-link></li>
              <li><router-link to="/garantiya">Гарантия</router-link></li>
              <li><router-link to="/reviews">Отзывы</router-link></li>
              <li><a to="tel:+38(066)3156536">+38 (066) 315 65 36</a></li>
            </ul>
          </div>
          <!-- <pre>{{ getCurrentLang }}</pre> -->
          <!-- <pre>{{ getLanguages.length }}</pre> -->
          <C-Lang :langs="getLanguages" :current-lang="currentLang" @update:currentLang="updateLanguage" v-if="getLanguages.length" />
          <!-- <C-Lang :langs="getLanguages" v-if="getLanguages.length"/> -->

          <div class="c-burger d-block d-sm-none"  @click="mobileMenuModal">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <C-Sticky-Menu />
  </header>
</template>

<script>

import { mapMutations, mapActions, mapGetters } from 'vuex';
import stringConfig from '@/config/stringConfig.js'
import CMenu from '@/templates/components/C-Menu.vue';
import CLogo from '@/templates/components/C-Logo.vue';
import CLang from '@/templates/components/C-Lang.vue';

import CStickyMenu from '@/templates/components/C-sticky-menu.vue';


export default {
  data() {
    return {
      activeDropdown: false,
      search: '',
      strings: stringConfig,
    }
  },

  components: {
    CMenu,
    CLogo,
    CStickyMenu,
    CLang
  },

  created() {
    this.fetchCartUrl();
    this.fetchMenu();
    this.fetchLanguages();
    this.setTotalAmount();
    // console.log('header:', this.$router);
  },

  watch: {
    currentLang: 'fetchMenu', // Отслеживаем изменение языка
  },

  computed: {
    ...mapGetters({
      getCartProducts: 'cart/getCartProducts',
      getCartUrl: 'cart/getCartUrl',
      getCheckoutUrl: 'cart/getCheckoutUrl',
      getTotalAmount: 'cart/getTotalAmount',
      getHeaderMenu: 'menu/getHeaderMenu',
      getMobileMenu: 'menu/getMobileMenu',
      getLanguages: 'lang/getLanguages',
      currentLang: 'lang/getCurrentLang',
    }),
  },

  methods: {
    ...mapActions({
      fetchCartUrl: 'cart/fetchCartUrl',
      fetchHeaderMenu: 'menu/fetchHeaderMenu',
      fetchMobileMenu: 'menu/fetchMobileMenu',
      fetchLanguages: 'lang/fetchLanguages',
      setLanguageInStore: 'lang/updateCurrentLang'
    }),

    ...mapMutations({
      setTotalAmount: 'cart/setTotalAmount'
    }),

    updateLanguage(newLang) {
      this.setLanguageInStore(newLang); // Обновляем Store
      console.log('Текущий язык изменён:', newLang);
    },

    fetchMenu() {
      this.fetchHeaderMenu();
      this.fetchMobileMenu();
    },

    mobileMenuModal() {
      this.$popup.open('PopupMobileMenu', {menu: this.getMobileMenu})
    },

    extractProductName(url) {
      if (!url) return;

      const parts = url.split("/");
      return parts[parts.length - 2];
    },
  }
}
</script>
