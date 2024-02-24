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
        params: { productName: extractProductName(product.permalink), productData: product }
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
          :alt="product.post_title"
          :title="product.post_title + ' - tooltip'"
          width="342"
          height="435"
          class="lazy entered loaded"
          data-ll-status="loaded"
        />
      </picture>
    </router-link>
    <div class="c-product__text">
      <p class="c-product__text-title">
        {{ product.name }}
      </p>
      
      <p class="c-price" v-html="product.price_html"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    }
  },
  
  methods: {
    extractProductName(url) {
      if (!url) return;

      const parts = url.split('/');
      return parts[parts.length - 2];
    }
  }
}
</script>
