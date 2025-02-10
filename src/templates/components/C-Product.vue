<template>
  <div
    class="c-product js-product-item"
    :data-id="product.id"
    :data-brand="product.post_attr_brand"
    :data-size="product.post_attr_size"
  >
    <router-link
      :to="{
        name: 'product',
        params: {
          lang: stripLang(product.permalink) || null,
          productName: stripSlug(product.permalink),
          productData: product 
        }
      }"
      class="c-product__img"
    > 
      <picture>
        <source
          :data-srcset="product.post_img_l"
          media="(min-width: 426px)"
          :srcset="product.post_img_l"
        />
        <source
          :data-srcset="product.post_img_m"
          media="(max-width: 425px)"
          :srcset="product.post_img_m"
        />
        <img
          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
          :alt="product.name"
          :title="product.name + ' - tooltip'"
          width="342"
          height="435"
          class="lazy entered loaded"
          data-ll-status="loaded"
        />
      </picture>
    </router-link>

    <div v-if="isBrand" class="c-product__brand">
      <svg width="61px" height="19px" class="c-product__arrow">
        <use xlink:href="#small-arrow"></use>
      </svg>
      <p>{{product.post_attr_brand}}</p>
    </div>

    <div v-else class="c-product__text">
      <p class="c-product__text-title">
        {{ product.name }}
      </p>
      
      <p class="c-price" v-html="product.price_html"></p>
    </div>
  </div>
</template>

<script>
import { stripSlug, stripLang } from '@/assets/js/utils.js';

export default {
  props: {
    product: {
      type: Object,
    },
    isBrand: {
      type: Boolean,
      default: false,
    }
  },
  
  methods: {
    stripSlug, 
    stripLang
    
    // stripSlug(url) {
    //   if (!url) return '';

    //   return url.split('/').filter(Boolean).pop();
    // },

    // stripLang(url) {
    //   if (!url) return '';

    //   const urlObj = new URL(url);
    //   const pathParts = urlObj.pathname.split('/');

    //   // Если первый сегмент пути равен "uk", возвращаем его
    //   if (pathParts[1] === 'uk') return pathParts[1];
      
    //   return null;
    // },
  }
}
</script>
