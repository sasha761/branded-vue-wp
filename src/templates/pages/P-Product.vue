<template>
  <div>
    <C-Modal />
    <L-Header />
    <div class="wrapper">
      <main
        class="p-product"
        :data-id="product.id"
        :data-price="product.price"
        :data-categories="getProductCategory"
      >
        <div class="u-container">
          <C-Breadcrumb />
          <section class="l-product">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-sm-12 u-col">
                <!-- <pre>{{product}}</pre> -->
                <div  class="l-product__img">
                  <a
                    v-if="product.post_img_xl"
                    :href="product.post_img_xl"
                    class="js-lightbox"
                  >
                    <img :src="product.post_img_xl" alt="">
                  </a>
                </div>
              </div>
              <div class="col-lg-5 col-md-12 u-col">
                <div class="l-product__content">
                  <div class="woocommerce-notices-wrapper"></div>
                  <a
                    href="https://branded.com.ua/brand/staff/"
                    class="l-product__category"
                    >{{product.post_attr_brand}}</a
                  >
                  <h1 class="l-product__name">
                    {{product.name}}
                  </h1>
                  <p class="c-price" v-html="product.price_html"></p>
                  <form
                    class="js-product-form cart c-product-form variations_form wvs-loaded"
                    :data-product_id="product.id"
                  >
                    <div class="variations woo-variation-items-wrapper">
                      <div class="c-product-form__size">
                        <div class="label">
                          <label for="pa_size">Размер </label
                          ><span
                            class="woo-selected-variation-item-name"
                            data-default=""
                          ></span>
                        </div>
                      </div>
                      <div class="value woo-variation-items-wrapper">
                        <v-select 
                          v-model="selectedSize" 
                          @input="handleSelectChange" 
                          :options="product.size_attribute"
                          label="name">
                        </v-select>
                        <!-- <select
                          style="display: none"
                          id="pa_size"
                          class="woo-variation-raw-select"
                          name="attribute_pa_size"
                          data-attribute_name="attribute_pa_size"
                          data-show_option_none="yes"
                        >
                          <option value="">Выбрать опцию</option>
                          <option value="xs" class="attached enabled">XS</option>
                          <option value="s" class="attached enabled">S</option>
                          <option value="m" class="attached enabled">M</option>
                          <option value="l" class="attached enabled">L</option>
                        </select> -->

                      </div>
                      <div class="js-product-form-notification"></div>
                    </div>
                    <div class="c-product-form__btn">
                      <button
                        @click="setProductToCart(product)"
                        type="button"
                        class="u-btn is-medium is-black single_add_to_cart_button button disabled wc-variation-selection-needed"
                        name="add-to-cart"
                        :value="product.id"
                      >
                        <span>В корзину</span>
                      </button>
                      <button
                        type="button"
                        class="u-btn is-medium is-black-border js-quick-add-to-card is-disabled"
                        data-modal=""
                      >
                        <span>Купить в 1 клик</span>
                      </button>
                    </div>
                  </form>
                  <div class="l-product__text">
                    <h4 class="l-product__text-title">Описание:</h4>
                    <div v-if="product.sku">
                      <span>Артикул: </span> <span>{{product.sku}}</span>
                    </div>
                    <div v-html="product.short_description"></div>
                  </div>
                  <div class="l-product__info js-accordion">
                    <div class="l-product__info-block js-accordion__item">
                      <div class="l-product__info-title js-accordion__heading">
                        <span>Спецификация</span>
                        <svg width="11px" height="7px" class="u-arrow">
                          <use xlink:href="#arrow"></use>
                        </svg>
                      </div>
                      <div
                        class="l-product__info-text js-accordion__list"
                        style="box-sizing: border-box; display: none"
                      >
                        <p><b>Бренд:</b> Staff</p>
                        <p><b>Категория:</b> Женщинам, Футболки и поло</p>
                        <p><b>Артикул:</b> KKK0936</p>
                        <p><b>Наличие:</b> В наличии</p>
                        <p><b>Доставка:</b> Отправка завтра</p>
                      </div>
                    </div>
                    <div class="l-product__info-block js-accordion__item">
                      <div class="l-product__info-title js-accordion__heading">
                        <span>Доставка и возврат</span>
                        <svg width="11px" height="7px" class="u-arrow">
                          <use xlink:href="#arrow"></use>
                        </svg>
                      </div>
                      <div
                        class="l-product__info-text js-accordion__list"
                        style="box-sizing: border-box; display: none"
                      >
                        <p>
                          Мы стараемся отправлять заказы <b>до 12:00</b> в тот же
                          рабочий день. Как только ваш заказ будет отправлен, вы
                          получите уведомление по электронной почте, содержащее
                          информацию об отслеживании.
                        </p>
                        <p>
                          Онлайн-покупки на нашем сайте могут быть возвращены или
                          обменены в течение 14 дней.
                        </p>
                      </div>
                    </div>
                    <div class="l-product__info-block js-accordion__item">
                      <div class="l-product__info-title js-accordion__heading">
                        <span>Метод оплаты</span>
                        <svg width="11px" height="7px" class="u-arrow">
                          <use xlink:href="#arrow"></use>
                        </svg>
                      </div>
                      <div
                        class="l-product__info-text js-accordion__list"
                        style="box-sizing: border-box; display: none"
                      >
                        <p>
                          <b>Кредитные карты:</b> Visa и MasterCard.<br />
                          <b>Наложенный платеж:</b> В отделении Новой почты.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-none d-lg-flex" v-if="hasProductImages">
              <div 
                class="col-lg-6 u-col" 
                v-for="(imageItem, index) in product.images"
                :key="index"
                >
                <a
                  :href="imageItem"
                  class="js-lightbox"
                >
                  <img :src="imageItem" alt="">
                </a>
              </div>
            </div>
          </section>
        </div>
        <section class="l-related js-slider-container">
          <div class="u-container">
            <h2 class="u-h2">Похожие товары</h2>
            <div class="c-arrow is-big">
              <div
                class="c-arrow__prev js-prev"
                tabindex="0"
                role="button"
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-3276b83ac8ebdde9"
                aria-disabled="false"
              >
                <svg width="22px" height="13px" class="c-arrow__angle">
                  <use xlink:href="#arrow"></use>
                </svg>
                <span class="c-arrow__line"></span>
              </div>
              <div
                class="c-arrow__count swiper-pagination-fraction swiper-pagination-horizontal"
              >
                <span class="swiper-pagination-current">6</span> /
                <span class="swiper-pagination-total">6</span>
              </div>
              <div
                class="c-arrow__next js-next swiper-button-disabled"
                tabindex="-1"
                role="button"
                aria-label="Next slide"
                aria-controls="swiper-wrapper-3276b83ac8ebdde9"
                aria-disabled="true"
              >
                <span class="c-arrow__line"></span>
                <svg width="22px" height="13px" class="c-arrow__angle">
                  <use xlink:href="#arrow"></use>
                </svg>
              </div>
            </div>
            <div class="js-product-row swiper">
              <div class="swiper-wrapper">
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="32307"
                    data-brand="Staff"
                  >
                    <a
                      href="https://branded.com.ua/product/futbolka-zhenskaya-ukorochennaya-molochnaya-ot-staff/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/G2-86138ccdb9b24f01b1321d5b86d1f73f-532x665.jpeg"
                          media="(min-width: 426px)"
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/G2-86138ccdb9b24f01b1321d5b86d1f73f-420x504.jpeg"
                          media="(max-width: 425px)"
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Футболка женская укороченная молочная от Staff
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >699.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="32290"
                    data-brand="Staff"
                  >
                    <a
                      href="https://branded.com.ua/product/futbolka-zhenskaya-ukorochennaya-chernaya-ot-staff/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/M-797cf8f255414f98a15e653ad4b05b43-532x665.jpeg"
                          media="(min-width: 426px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/07/M-797cf8f255414f98a15e653ad4b05b43-532x665.jpeg
                          "
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/M-797cf8f255414f98a15e653ad4b05b43-420x504.jpeg"
                          media="(max-width: 425px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/07/M-797cf8f255414f98a15e653ad4b05b43-420x504.jpeg
                          "
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy entered loaded"
                          data-ll-status="loaded"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Футболка женская укороченная черная от Staff
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >599.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="32265"
                    data-brand="Staff"
                  >
                    <a
                      href="https://branded.com.ua/product/futbolka-zhenskaya-oversajz-chernaya-ot-staff/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/M-955f6755f25d4fcab4b0a081d2860df4-532x665.jpeg"
                          media="(min-width: 426px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/07/M-955f6755f25d4fcab4b0a081d2860df4-532x665.jpeg
                          "
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/M-955f6755f25d4fcab4b0a081d2860df4-420x504.jpeg"
                          media="(max-width: 425px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/07/M-955f6755f25d4fcab4b0a081d2860df4-420x504.jpeg
                          "
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy entered loaded"
                          data-ll-status="loaded"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Футболка женская оверсайз черная от Staff
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >799.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="31746"
                    data-brand="WearMe"
                  >
                    <a
                      href="https://branded.com.ua/product/majka-zhenskaya-na-tonkih-bretelyah-ot-wearme/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/CB000002574___1_981f3a65-89d8-4f8d-94bf-8b7f43c81c59_1946x-532x665.webp"
                          media="(min-width: 426px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/07/CB000002574___1_981f3a65-89d8-4f8d-94bf-8b7f43c81c59_1946x-532x665.webp
                          "
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/07/CB000002574___1_981f3a65-89d8-4f8d-94bf-8b7f43c81c59_1946x-420x504.webp"
                          media="(max-width: 425px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/07/CB000002574___1_981f3a65-89d8-4f8d-94bf-8b7f43c81c59_1946x-420x504.webp
                          "
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy entered loaded"
                          data-ll-status="loaded"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Майка женская на тонких бретелях от WearMe
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >495.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="31629"
                    data-brand="BeOm Design"
                  >
                    <a
                      href="https://branded.com.ua/product/majka-zhenskaya-vyvarennaya-bezhevaya-ot-beom-design/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-1093-1000x1444-1.png"
                          media="(min-width: 426px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/06/beom-1093-1000x1444-1.png
                          "
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-1093-1000x1444-1.png"
                          media="(max-width: 425px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/06/beom-1093-1000x1444-1.png
                          "
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy entered loaded"
                          data-ll-status="loaded"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Майка женская вываренная бежевая от BeOm Design
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >899.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="31609"
                    data-brand="BeOm Design"
                  >
                    <a
                      href="https://branded.com.ua/product/majka-zhenskaya-vyvarennaya-temno-seraya-ot-beom-design/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-1056-1000x1444-1-532x665.png"
                          media="(min-width: 426px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/06/beom-1056-1000x1444-1-532x665.png
                          "
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-1056-1000x1444-1-420x504.png"
                          media="(max-width: 425px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/06/beom-1056-1000x1444-1-420x504.png
                          "
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy entered loaded"
                          data-ll-status="loaded"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Майка женская вываренная темно-серая от BeOm Design
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >899.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="31598"
                    data-brand="BeOm Design"
                  >
                    <a
                      href="https://branded.com.ua/product/majka-zhenskaya-vyvarennaya-temno-sinyaya-ot-beom-design/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-1083-1000x1444-1-532x665.png"
                          media="(min-width: 426px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/06/beom-1083-1000x1444-1-532x665.png
                          "
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-1083-1000x1444-1-420x504.png"
                          media="(max-width: 425px)"
                          srcset="
                            https://branded.com.ua/wp-content/uploads/2023/06/beom-1083-1000x1444-1-420x504.png
                          "
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy entered loaded"
                          data-ll-status="loaded"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Майка женская вываренная темно-синяя от BeOm Design
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >899.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="30544"
                    data-brand="BeOm Design"
                  >
                    <a
                      href="https://branded.com.ua/product/futbolka-zhenskaya-vyvarennaya-bezhevaya-ot-beom-design/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-336-1000x1444-1-532x665.png"
                          media="(min-width: 426px)"
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-336-1000x1444-1-420x504.png"
                          media="(max-width: 425px)"
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Футболка женская вываренная бежевая от BeOm Design
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >1,499.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="30518"
                    data-brand="BeOm Design"
                  >
                    <a
                      href="https://branded.com.ua/product/futbolka-zhenskaya-vyvarennaya-temno-sinyaya-ot-beom-design/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-75-1000x1444-1-532x665.png"
                          media="(min-width: 426px)"
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-75-1000x1444-1-420x504.png"
                          media="(max-width: 425px)"
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Футболка женская вываренная темно-синяя от BeOm Design
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >1,499.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="u-col swiper-slide">
                  <div
                    class="c-product js-product-item"
                    data-id="30501"
                    data-brand="BeOm Design"
                  >
                    <a
                      href="https://branded.com.ua/product/futbolka-zhenskaya-vyvarennaya-temno-seraya-ot-beom-design/"
                      class="c-product__img"
                    >
                      <picture>
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-173-1000x1444-1-532x665.png"
                          media="(min-width: 426px)"
                        />
                        <source
                          data-srcset="https://branded.com.ua/wp-content/uploads/2023/06/beom-173-1000x1444-1-420x504.png"
                          media="(max-width: 425px)"
                        />
                        <img
                          src="data:image/gif;base64,R0lGODlhBAAFAIAAAP///wAAACH5BAEAAAEALAAAAAAEAAUAAAIEjI+ZBQA7"
                          alt=""
                          width="342"
                          height="435"
                          class="lazy"
                        />
                      </picture>
                    </a>
                    <div class="c-product__text">
                      <h4 class="c-product__text-title">
                        Футболка женская вываренная темно-серая от BeOm Design
                      </h4>
                      <p class="c-price">
                        <span class="woocommerce-Price-amount amount"
                          ><bdi
                            >1,499.00&nbsp;<span
                              class="woocommerce-Price-currencySymbol"
                              >грн</span
                            ></bdi
                          ></span
                        >
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="l-comments">
          <div class="u-container">
            <div class="row">
              <div class="col-lg-8">
                <div class="c-comments comment-respond" id="respond">
                  <h3 class="u-h4">Отзывы: 0</h3>
                  <div class="c-comments__box"></div>
                  <form
                    class="comment-form"
                    id="commentform"
                    method="post"
                    action="https://branded.com.ua/wp-comments-post.php"
                  >
                    <div class="c-comments__registration">
                      <div class="c-comments__registration-label">
                        Оценка* <br />
                        <div class="comment-form-rating">
                          <select name="rating" id="rating" required="">
                            <option value="">Оценка…</option>
                            <option value="5">Отлично</option>
                            <option value="4">Хорошо</option>
                            <option value="3">Средне</option>
                            <option value="2">Неплохо</option>
                            <option value="1">Очень плохо</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="c-comments__submit">
                      <input type="hidden" name="email" value="" />
                      <input type="hidden" name="author" value="sasha761" />
                      <input
                        type="hidden"
                        name="url"
                        value="https://branded.com.ua/"
                      />
                      <input name="comment_post_ID" value="32307" type="hidden" />
                      <input name="comment_parent" value="0" type="hidden" />
                      <input
                        type="text"
                        name="comment"
                        required=""
                        placeholder="Ваш комментарий"
                      />
                      <button
                        class="u-btn is-medium is-black"
                        type="submit"
                        name="Submit"
                      >
                        Отправить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <L-Subscribe />
      </main>
      <L-Footer />
    </div>
  </div>
</template>

<style>
  @import 'vue-select/dist/vue-select.css';
  @import 'swiper/css/bundle';

</style>

<script>
import Swiper from 'swiper/bundle';
import vSelect from 'vue-select';
import LHeader from '@/templates/layout/L-Header.vue'
import LFooter from '@/templates/layout/L-Footer.vue'
import LSubscribe from '@/templates/layout/L-Subscribe.vue'

import CModal from '@/templates/components/C-Modal.vue'
import CBreadcrumb from '@/templates/components/C-Breadcrumbs.vue'

import { mapActions, mapMutations } from 'vuex';

export default {
  components: {
    LHeader,
    LFooter,
    LSubscribe,
    CBreadcrumb,
    CModal,
    vSelect
  },

  data() {
    return {
      product: [],
      selectedSize: ''
    }
  },

  // props: ['productData'],

  computed: {
    hasProductImages() {
      return this.product?.images?.length
    }, 
    getProductCategory() {
      return this.product?.cats?.join(', ');
    }
  },

  mounted() {
    if(this.$route.params.productData) {
      this.product = this.$route.params.productData
    } else {
      this.fetchSingleProduct(this.$route.params.productName).then(result => {
        this.product = result
        this.selectedSize = this.product?.size_attribute[0]?.name;
        console.log(result);

        this.swiperFn();
      });
    }
  },

  methods: {
    ...mapActions({
      fetchSingleProduct: 'product/fetchSingleProduct'
    }),

    ...mapMutations({
      setProductToCart: 'cart/setProductToCart'
    }),

    swiperFn() {
      const productSlider = this.$el.querySelectorAll('.js-product-row');
      console.log(productSlider);
      if (productSlider.length) {
        productSlider.forEach(slider => {
          console.log(slider);
          let sliderContainer = slider.closest('.js-slider-container');
          let sliderArrows = sliderContainer.querySelector('.c-arrow');
          let navArrows = false;
          let countArrows = false;
          if (sliderArrows) {
            let next = sliderArrows.querySelector('.js-next');
            let prev = sliderArrows.querySelector('.js-prev');
            let countEl = sliderArrows.querySelector('.c-arrow__count');
            navArrows = {
              nextEl: next,
              prevEl: prev
            }
            countArrows = {
              el: countEl,
              type: "fraction",
            }
          }

          new Swiper(slider, {
            slidesPerView: 'auto',
            watchOverflow: true,
            autoplay: {
              delay: 2500,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
            navigation: navArrows,
            pagination: countArrows,
          })
        })
      }
    },

    handleSelectChange(value) {
      console.log(value);
    }
  }
}
</script>
