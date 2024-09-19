<template>
  <div class="c-lang js-lang">
    <div class="c-lang__current">
      {{activeLang}}
      <svg width="11px" height="7px" class="c-lang__arrow">
        <use xlink:href="#arrow"></use>
      </svg>
    </div>
    <div class="c-lang__sub">
      <router-link 
        v-for="lang in langs" 
        :key="lang.language_code" 
        :to="extractDomainName(lang.url)"
        @click="changeCurrentLang(lang.language_code)"
        class="c-lang__item">
        {{lang.language_code}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLang: 'ru'
    };
  },

  props: {
    langs: {
      type: Array
    }
  },

  methods: {
    changeCurrentLang(lang) {
      this.activeLang = lang
    },
    extractDomainName(url) {
      if (!url) return;
      const urlObj = new URL(url);

      return urlObj.pathname + urlObj.search + urlObj.hash;
    },
  }
};
</script>
