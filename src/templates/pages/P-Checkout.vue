<template>
  <main class="p-checkout">
	  	<div class="u-container">
	  		<div class="row">
	  			<div class="col-lg-6">
	  				<form name="checkout" method="post" class="l-checkout" enctype="multipart/form-data">
							<div class="l-checkout__form">
								<h1 class="u-h3">Ordering</h1>

                <div v-for="field, key in checkout_billing" :key="key" class="c-input">
                  <span>{{field.label}}</span>
                  <!-- {% if user %}
                    <input 
                      {{field.required ? "required" : ""}} 
                      type="{{field.type ? field.type : "text"}}"
                      name="{{key}}" 
                      value="{{checkout_key[loop.index0] ? checkout_key[loop.index0] : ""}}" 
                    >
                  {% else %} -->
                    <input 
                      :required="field.required ? 'required' : ''"
                      :type="field.type ? field.type : 'text'"
                      :name="key" 
                    >
                  <!-- {% endif %} -->
                </div>

                <div v-for="field, key in checkout_order" :key="key" class="c-input ">
                  <span>{{field.label}}</span>
                  <textarea :name="key" :id="key" rows="4" :placeholder="field.placeholder"></textarea>
                </div>
					  	</div>
					  </form>
	  			</div>
	  			<div class="col-lg-6">
	  				<div class="l-cart">
              <div v-for="product, key in products" :key="key" class="c-product-cart">
                <router-link :to="product.url" class="c-product-cart__img">
                  <img :src="product.thumbnail">
                </router-link>
                <div class="c-product-cart__info">
                  <div class="c-product-cart__name">
                    <!-- {% for item in product.attr.brand %}
                      {% set brandlink = function('get_category_link', item.term_id) %}
                      <a href="{{brandlink}}" class="c-product-cart__name-brand">{{item.name}}</a>
                    {% endfor %} -->

                    <router-link :to="product.url" class="c-product-cart__name-title">{{product.title}}</router-link>
                    <!-- <span class="c-product-cart__name-cat">{{category}}</span> -->

                    <div class="mb-3">Size: {{product.attr.size}}</div>
                    <div class="d-flex justify-content-between">
                      <div class="c-price">{{ product.quantity }} шт</div>
                      <div class="c-total">{{product.total}}</div>
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
		              {{ nonce }}
									<li class="l-sidebar-cart__item">
										<span>Order amount</span>
										<span class="c-price">{{cart_total}}</span>
									</li>
									<li class="l-sidebar-cart__item">
										<span>Shipping</span>
										<span class="c-price">{{shipping}}</span>
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
										<span>{{total}}</span>
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

export default {

}
</script>