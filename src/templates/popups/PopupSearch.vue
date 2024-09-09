<template>
  <div class="c-modal is-search" id="mobile-search">
    <svg @click="handleCloseClick" width="20px" height="20px" class="c-modal__close">
      <use xlink:href="#icon-close"></use>
    </svg>
    <form role="search" method="get" id="searchform" class="c-search" action="">
      <button type="submit" class="c-search__button">
        <svg width="15px" height="17px" class="is-search">
          <use xlink:href="#search"></use>
        </svg>
      </button>
      <input type="text" value="" placeholder="Search" name="s" id="s" />
      <button type="submit" class="c-search__submit">
        <svg width="18px" height="14px" class="is-search">
          <use xlink:href="#big-arrow"></use>
        </svg>
      </button>
    </form>
  </div>

</template>

<script>
// import QuickBuyForm from '@/templates/forms/QuickBuyForm.vue'

export default {
  components: {
    // QuickBuyForm,
  },

  props: {
    data: {
      type: Object,
    }
  },

  methods: {
    handleCloseClick() {
      this.$popup.close(1, () => {})
    },
  }
}
</script>