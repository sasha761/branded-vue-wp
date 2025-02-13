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
        @keydown.enter="fetchSearch"
      />
    </form>

    <div class="c-search__result" :class="{'is-active': searchContainerVisability}">
      <C-Spinner v-if="requestInProgress"/>
      <svg v-if="searchResult.length > 0" @click="handleCloseClick" width="20px" height="20px" class="c-search__close">
        <use xlink:href="#icon-close"></use>
      </svg>
      <p v-if="!searchResult.length && !requestInProgress">По вашему запросу ничего не найдено!</p>
      <div v-if="searchResult.length > 0" class="l-mini-cart" :class="{'is-opacity': requestInProgress}">
        <!-- {{searchResult.length}} -->
        <ul  class="l-mini-cart__list">
          <li 
            v-for="(product, index) in searchResult" 
            :key="index"
            class="l-mini-cart__item"
          >
            <C-MiniCart-Item :product="product" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/Axios'
import CSpinner from '@/templates/components/C-Spinner.vue'
import CMiniCartItem from '@/templates/components/C-MiniCart-item.vue'

import stringConfig from '@/config/stringConfig.js'

import waitRequest from '@/mixins/waitRequest';
import { mapGetters } from 'vuex';
import { stripSlug, stripLang } from '@/assets/js/utils.js';

export default {
  data() {
    return {
      searchInput: '',
      searchResult: [],
      searchContainerVisability: false,
      debounceTimeout: null,
      strings: stringConfig,
    }
  },

  components: {
    CSpinner,
    CMiniCartItem
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
      this.searchContainerVisability = true;
      this.waitRequest(() => {
        return Api.post('search/search', {
					lang: this.currentLang,
          query: this.searchInput,
				})
				.then((result) => {
					this.searchResult = result.data
					console.log(this.searchResult)
				})
				.catch((error) => {
					console.log(error);
          this.searchContainerVisability = false;
				});
      })
    },

    handleCloseClick() {
      this.searchContainerVisability = false;
    },

    debouncedSearch() {
      // Если уже есть запущенный таймер - очищаем его
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      // Устанавливаем новый таймер на 500 мс
      this.debounceTimeout = setTimeout(() => {
        this.fetchSearch();
      }, 1000);
    },

    stripSlug, 
    stripLang
  }
}
</script>