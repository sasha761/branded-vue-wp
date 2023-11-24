<template>
  <section class="l-related js-slider-container">
    <div class="u-container">
      <h2 class="u-h2">Похожие товары</h2>
      <div class="c-arrow is-big">
        <div @click="slidePrev" class="c-arrow__prev js-prev">
          <svg width="22px" height="13px" class="c-arrow__angle">
            <use xlink:href="#arrow"></use>
          </svg>
          <span class="c-arrow__line"></span>
        </div>

        <div class="c-arrow__count">
          <span class="swiper-pagination-current">{{currentSlideIndex}}</span> /
          <span class="swiper-pagination-total">6</span>
        </div>

        <div @click="slideNext" class="c-arrow__next js-next swiper-button-disabled">
          <span class="c-arrow__line"></span>
          <svg width="22px" height="13px" class="c-arrow__angle">
            <use xlink:href="#arrow"></use>
          </svg>
        </div>
      </div>
      <div ref="relatedProductSlider" class="swiper">
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
</template>

<style>
  @import 'swiper/css/bundle';
</style>

<script>
import Swiper from 'swiper/bundle';

export default {
  data() {
    return {
      swiperInstance: null,
    }
  },

  computed: {
    currentSlideIndex() {
      return this.swiperInstance?.activeIndex + 1 || 1;
    },
  },

  mounted() {
    this.swiperFn();
  },

  methods: {
    swiperFn() {
      this.swiperInstance = new Swiper(this.$refs.relatedProductSlider, {
        slidesPerView: 'auto',
        watchOverflow: true,
        autoplay: {
          delay: 2500,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
      })
    },

    slideNext() {
      this.swiperInstance.slideNext();
    },

    slidePrev() {
      this.swiperInstance.slidePrev();
    },
  }
}
</script>
