<template>
  <div class="l-modal" :class="{ 'is-active': popupName }">
    <div class="l-modal__overlay"></div>
    <div class="l-modal__wrapper">
      <component :is="popupName" :data="popupData"></component>
    </div>
  </div>
</template>

<script>
import PopupQuickBuy from '@/templates/popups/PopupQuickBuy.vue';
import PopupMobileMenu from '@/templates/popups/PopupMobileMenu.vue';
import PopupLightbox from '@/templates/popups/PopupLightbox.vue';

export default {
  data() {
    return {
      popupName: null,
      popupData: null,
      isActive: false,
    }
  },
  
  components: {
    PopupQuickBuy,
    PopupMobileMenu,
    PopupLightbox
  },

  mounted() {
    this.$popup.onOpen({callback: (data)=> {
      this.openModal(data);
    }})

    this.$popup.onClose({callback: (data)=> {
      // console.log(data);
      this.openModal(data);
    }})
    // this.$popup.onOpen((data) => {
    //   console.log(data);
    // });
    // window.emitter.on('closeModal', (data) => {
    //   this.closeModal(data);
    // });

    // window.emitter.on('openModal', ({data, popup}) => {
    //   this.openModal(data, popup);
    // });
  },

  methods: {
    openModal(data) {
      // console.log('openModal: ', data);
      this.popupData = data.data;
      this.popupName = data.name;
    },

    closeModal() {
      // console.log('closeModal: ');
      this.popupData = null
      this.popupName = null;
    }
  },
}
</script>
