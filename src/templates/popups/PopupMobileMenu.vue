<template>
  <div class="c-modal c-mobile-menu js-tab-mobile-menu" id="mobile-menu">
    <div class="c-tab">
      <div class="c-tab__nav">
        <span data-tab="#wooman" class="c-tab__item is-active">For her</span>
        <span data-tab="#man" class="c-tab__item">For him</span>
        
        <span class="js-mobile-menu-back">
          <svg width="28px" height="28px">
            <use xlink:href="#left_arrow"></use>
          </svg>
        </span>
        <svg @click="handleCloseClick" width="20px" height="20px" data-modal="close" class="c-mobile-menu__close">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
      <div class="c-tab__container">
        <div id="wooman" v-if="data.menu.wooman" class="c-tab__content is-active">
          <div class="c-mobile-menu__cat">
            <router-link 
              v-for="(item, index) in data.menu.wooman" 
              :key="index" 
              :to="item.slug" 
              class="c-mobile-menu__item"
            >
              <span>{{ item.title }}</span>
                <picture v-if="item.image">
                  <!-- <source data-srcset="{{image.url|resize(180, 180, 'center')|towebp}}" type="image/webp"> -->
                  <source :data-srcset="item.image.url" :srcset="item.image.url" type="image/jpeg"> 
                  <img 
                    src="data:image/png;base64,TEVITGhbV0IyeWs4cHlvSmFkUiouN2tDTWRuag==" 
                    :alt="item.title" 
                    :title="item.title + '- tooltip'"
                    width="95" 
                    height="95"
                    class=""
                  >
                </picture>
            </router-link>
          </div>
        </div>
        <div id="man" class="c-tab__content">
          <div class="c-mobile-menu__cat">
            <router-link 
              v-for="(item, index) in data.menu.man" 
              :key="index" 
              :to="item.slug" 
              class="c-mobile-menu__item"
            >
              <span>{{ item.title }}</span>
                <picture v-if="item.image">
                  <!-- <source data-srcset="{{image.url|resize(180, 180, 'center')|towebp}}" type="image/webp"> -->
                  <source :data-srcset="item.image.url" :srcset="item.image.url" type="image/jpeg"> 
                  <img 
                    src="data:image/png;base64,TEVITGhbV0IyeWs4cHlvSmFkUiouN2tDTWRuag==" 
                    :alt="item.title" 
                    :title="item.title + '- tooltip'"
                    width="95" 
                    height="95"
                    class=""
                  >
                </picture>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations, mapActions, mapGetters } from 'vuex';


export default {
  mounted() {

  },

  props: {
    data: {
      type: Object,
    }
  },

  computed: {
    // ...mapGetters({
    //   getHeaderMenu: 'menu/getHeaderMenu',
    // })
  },

  methods: {
    handleCloseClick() {
      this.$popup.close(1, () => {})
    },
  }
}
</script>