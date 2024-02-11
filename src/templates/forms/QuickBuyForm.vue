<template>
  <form @submit.prevent="submitForm" class="c-form" name="quick-buy">
    <div class="c-input">
      <input type="text" required placeholder="Name" v-model="formData.name" name="name">
    </div>
    <div class="c-input">
      <input type="text" required placeholder="Surname" v-model="formData.surname" name="surname">
    </div>
    <div class="c-input">
      <input type="tel" required placeholder="Phone" v-model="formData.phone" name="phone">
    </div>
    <div class="c-input">
      <input type="email" required placeholder="Email" v-model="formData.email" name="email">
    </div>
    <div class="c-input">
      <input type="text" required placeholder="City" v-model="formData.city" name="city">
    </div>
    <div class="c-input">
      <input type="text" required placeholder="Post Office" v-model="formData.post" name="address">
    </div>

    <input type="hidden" name="product_id" :value="formData.productId">
    <!-- <input type="hidden" name="variation_id" :value="variation_id"> -->

    <div class="c-form__submit">
      <button type="submit" class="u-btn is-black is-medium">Send</button>
    </div>
    <div class="c-load-icon js-load-more-icon">
      <CSpinner />
    </div>
    <div class="js-form-answer"></div>
  </form>
</template>

<script>
import Api from '@/api/Axios'

import CSpinner from '@/templates/components/C-Spinner.vue';

export default {
  data() {
    return {
      formData: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        city: '',
        post: '',
        productId: ''
      },
    }
  },

  components: {
    CSpinner
  },

  mounted() {
    
  },

  methods: {
    submitForm() {
      Api.post('cart/create_quick_order', {
        product_id: this.formData.productId,
        name: this.formData.name,
        surname: this.formData.surname,
        phone: this.formData.phone,
        email: this.formData.email,
        city: this.formData.city,
        post: this.formData.post
      })
      .then((result) => {
        console.log(result)
        // this.product = result.data
        // this.selectedSize = result.data?.size_attribute[0];

      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>