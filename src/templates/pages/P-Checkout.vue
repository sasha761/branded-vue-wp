<template>
  <main class="p-checkout">
		<div class="u-container">
			<div class="row">
				<div class="col-lg-6">
					<form @submit.prevent="submitForm" method="post" class="l-checkout">
						<div class="l-checkout__form">
							<h1 class="u-h3">Оформление заказа</h1>
							<div class="c-input">
								<span>Имя</span>
								<input required type="text" v-model="formData.name" name="billing_first_name" maxlength="20">
							</div>
							<div class="c-input">
								<span>Фамилия</span>
								<input required type="text" v-model="formData.surname" name="billing_last_name" maxlength="20">
							</div>
							<div class="c-input">
								<span>Отделение почты</span>
								<input required type="text" v-model="formData.post" name="billing_address_1" maxlength="4">
							</div>
							<div class="c-input">
								<span>Населенный пункт</span>
								<input required type="text" v-model="formData.city" name="billing_city" maxlength="20">
							</div>
							<div class="c-input">
								<span>Телефон</span>
								<input required type="tel" v-model="formData.phone" name="billing_phone" placeholder="+38(000)000-00-00">
							</div>
							<div class="c-input">
								<span>Email</span>
								<input required type="email" v-model="formData.email" name="billing_email">
							</div>
							<div class="c-input">
								<span>Примечание к заказу</span>
								<textarea v-model="formData.comments" name="order_comments" rows="4" placeholder="Примечания к вашему заказу, например, особые пожелания отделу доставки."></textarea>
							</div>

							<div id="payment" class="woocommerce-checkout-payment">
								<ul class="wc_payment_methods payment_methods methods">
									<li class="wc_payment_method payment_method_bacs">
										<input id="payment_method_bacs" type="radio" class="input-radio" name="payment_method" value="bacs" checked="checked" data-order_button_text="">

										<label for="payment_method_bacs">Прямой банковский перевод 	</label>
										<div class="payment_box payment_method_bacs">
											<p>Оплату нужно направлять напрямую на наш банковский счет. Используйте идентификатор заказа в качестве кода платежа. Заказ будет отправлен после поступления средств на наш счет.</p>
										</div>
									</li>
									<li class="wc_payment_method payment_method_cod">
										<input id="payment_method_cod" type="radio" class="input-radio" name="payment_method" value="cod" data-order_button_text="">

										<label for="payment_method_cod">Оплата при доставке 	</label>
										<div class="payment_box payment_method_cod" style="display:none;">
											<p>Оплата наличными при доставке заказа.</p>
										</div>
									</li>
								</ul>
								<div class="form-row place-order">
									<button type="submit" class="button alt" name="woocommerce_checkout_place_order" id="place_order" value="Подтвердить заказ" data-value="Подтвердить заказ">Подтвердить заказ</button>
									<input type="hidden" id="woocommerce-process-checkout-nonce" name="woocommerce-process-checkout-nonce" value="21a6f4cfbf">
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="col-lg-6">
					<div class="l-cart">
						<div v-for="product, key in cartProducts" :key="key" class="c-product-cart">
							<!-- <pre>{{product}}</pre> -->
							<router-link
								:to="{
									name: 'product', 
									params: { productName: extractProductName(product.permalink), productData: product }
								}"
								class="c-product-cart__img"
							>
								<img :src="product.post_img_m">
							</router-link>
							<div class="c-product-cart__info">
								<div class="c-product-cart__name">
									<router-link :to="'/brand/' + product.post_link_brand" class="c-product-cart__name-brand">
										{{product.post_attr_brand}}
									</router-link>

									<router-link 
										:to="{
											name: 'product', 
											params: { productName: extractProductName(product.permalink), productData: product }
										}"
										class="c-product-cart__name-title"
									>
										{{product.name}}
									</router-link>

									<div class="mb-3">Size: {{product.size_attribute[0].name}}</div>
									<div class="d-flex justify-content-between">
										<div class="c-price">{{ product.quantity }} шт</div>
										<div class="c-total">{{product.price * product.quantity}}</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="l-sidebar-cart">
						<form class="l-checkout__coupon l-sidebar-cart__cupons actions" method="post">
							<h2 class="u-h3">Coupons</h2>
							<div class="c-form-cupons">
								<input type="text" name="coupon_code" id="coupon_code" value="" placeholder="Promo code">
								<button type="submit" name="apply_coupon" value="Apply coupon" class="u-btn-submit">
									<svg width="26px" height="14px" class="">
										<use xlink:href="#big-arrow"></use>
									</svg>
								</button>
							</div> 
						</form>

						<div class="l-sidebar-cart__total actions">
							<h2 class="u-h3">Your order</h2>
							<ul class="l-sidebar-cart__list">
								<!-- {{ nonce }} -->
								<li class="l-sidebar-cart__item">
									<span>Order amount</span>
									<span class="c-price">{{getTotalAmount}}</span>
								</li>
								<li class="l-sidebar-cart__item">
									<span>Shipping</span>
									<span>Free !</span>
									<!-- <span class="c-price">{{shipping}}</span> -->
								</li>

								<!-- {% if coupons %}
									{% for item in coupons %}
										<li class="l-sidebar-cart__item is-red">
											<span>{{ 'Discount Coupon' | translateString('Cart - Discount Coupon') }}</span>
											<span>-{{item.amount}} {{currency}}</span>
										</li>
									{% endfor %}
								{% endif %} -->

								<li class="l-sidebar-cart__item">
									<span>Total</span>
									<span>{{getTotalAmount}}</span>
								</li>
							</ul>
						</div>		
					</div>
				</div>
			</div>
		</div>	
	</main> 	
</template>      

<script>
import Api from '@/api/Axios'
import { mapGetters } from 'vuex';

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
				comments: '',
        productId: []
      },
    }
  },
	computed: {
    ...mapGetters({
      cartProducts: 'cart/getCartProducts',
      getCheckoutUrl: 'cart/getCheckoutUrl',
      getTotalAmount: 'cart/getTotalAmount',
    }),
  },

	mounted() {},

	methods: {
		submitForm() {

			// this.cartProducts.forEach(element => {
			// 	console.log(element);
			// });
      Api.post('cart/create_order', {
        products: this.cartProducts,
        name: this.formData.name,
        surname: this.formData.surname,
        phone: this.formData.phone,
        email: this.formData.email,
        city: this.formData.city,
        post: this.formData.post,
				comments: this.formData.comments
      })
      .then((result) => {
        console.log(result)
        // this.product = result.data
        // this.selectedSize = result.data?.size_attribute[0];

      })
      .catch((error) => {
        console.log(error);
      });
    },

    extractProductName(url) {
      if (!url) return;

      const parts = url.split('/');
      return parts[parts.length - 2];
    },
  }
}
</script>