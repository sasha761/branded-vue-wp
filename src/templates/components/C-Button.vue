<template>
  <button
      type="button"
      @click="handleClick"
      class="u-btn is-load-more is-medium is-black js-show-more-product"
    >
      <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('button-click');
    }
  }
}
</script>