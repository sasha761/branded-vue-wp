<template>
  <div class="l-modal" :class="{ 'is-active': isActive }">
    <div class="l-modal__overlay"></div>
    <div class="l-modal__wrapper">
      <component :is="popup"></component>
    </div>
  </div>
</template>

<script>
import PopupQuickBuy from '@/templates/popups/PopupQuickBuy.vue';

export default {
  data() {
    return {
      popup: null,
      isActive: false
    }
  },
  
  components: {
    PopupQuickBuy
  },

  mounted() {
    window.emitter.on('getProductId', (data) => {
      console.log('form: ', data);
      // this.formData.productId = data.productId;
    });

    window.emitter.on('closeModal', (data) => {
      this.closeModal(data);
    });

    window.emitter.on('openModal', (data) => {
      this.openModal(data);
    });
  },

  methods: {
    openModal(data) {
      this.isActive = true;
      this.popup = data.popup
    },

    closeModal(data) {
      console.log(data);
      this.isActive = false;
    }
  },
}
</script>
