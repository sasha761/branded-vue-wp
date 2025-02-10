<template>
  <div class="c-search">
    <form
      role="search"
      method="get"
      id="searchform"
      class="c-search-form"
      @submit.prevent="fetchSearch"
    >
      <button type="submit" class="c-search-form__button">
        <svg width="15px" height="17px" class="is-search">
          <use xlink:href="#search"></use>
        </svg>
      </button>
      <input
        type="text"
        v-model="searchInput"
        placeholder="Поиск"
        name="s"
        id="s"
        @keydown.enter="fetchSearch"
      />
    </form>

    <div class="c-search__result">
      <C-Spinner v-if="requestInProgress"/>
      <div v-if="searchResult.length > 0" class="l-mini-cart">
        <!-- {{searchResult.length}} -->
        <ul  class="l-mini-cart__list">
          <li 
            v-for="(product, index) in searchResult" 
            :key="index"
          >
            <div class="l-mini-cart__item">
              <div class="l-mini-cart__item-img">
                <router-link
                  :to="{
                    name: 'product',
                    params: {
                      lang: stripLang(product.permalink) || null,
                      productName: stripSlug(product.permalink),
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


                <p class="c-price">
                  {{ product.price }} {{strings.string.currency}}
                </p>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<script>
import Api from '@/api/Axios'
import CSpinner from '@/templates/components/C-Spinner.vue'
import stringConfig from '@/config/stringConfig.js'

import waitRequest from '@/mixins/waitRequest';
import { mapGetters } from 'vuex';
import { stripSlug, stripLang } from '@/assets/js/utils.js';

export default {
  data() {
    return {
      searchInput: '',
      searchResult: [],
      debounceTimeout: null,
      strings: stringConfig,
    }
  },

  components: {
    CSpinner
  },

  mixins: [waitRequest],

  computed: {
    ...mapGetters({
      currentLang: 'lang/getCurrentLang',
    }),
	},

  watch: {
    searchInput(newValue) {
      if (newValue.length >= 3) {
        this.debouncedSearch();
      }
    },
  },

  methods: {
    fetchSearch() {
      this.waitRequest(() => {
        return Api.post('search/search', {
					lang: this.currentLang,
          query: this.searchInput,
				})
				.then((result) => {
					this.searchResult = result.data?.products
					console.log(this.searchResult)
				})
				.catch((error) => {
					console.log(error);
				});
      })
    },

    debouncedSearch() {
      // Если уже есть запущенный таймер - очищаем его
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      // Устанавливаем новый таймер на 500 мс
      this.debounceTimeout = setTimeout(() => {
        this.fetchSearch();
      }, 500);
    },

    stripSlug, 
    stripLang
  }
}
</script>