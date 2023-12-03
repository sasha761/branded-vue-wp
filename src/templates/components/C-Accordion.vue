<template>
  <div class="c-accordion">
    <div 
      v-for="(item, index) in accordionItems" 
      :key="index" 
      class="c-accordion__block"
    >
      <div @click="toggleAccordion(index)" class="c-accordion__block-title ">
        <span>{{ item.title }}</span>
        <svg width="11px" height="7px" class="u-arrow">
          <use xlink:href="#arrow"></use>
        </svg>
      </div>
      <div class="c-accordion__block-text" :class="{ 'is-open': isAccordionOpen[index] }" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isAccordionOpen: [], // Состояние аккордеона для каждого элемента
      accordionItems: [
        {
          title: 'Спецификация',
          content: '<p><b>Бренд:</b> Staff</p><p><b>Категория:</b> Женщинам, Футболки и поло</p><p><b>Артикул:</b> KKK0936</p><p><b>Наличие:</b> В наличии</p><p><b>Доставка:</b> Отправка завтра</p>',
        },
        {
          title: 'Доставка и возврат',
          content: '<p>Ваш контент для раздела "Доставка и возврат"</p>',
        },
        {
          title: 'Метод оплаты',
          content: '<p>Ваш контент для раздела "Метод оплаты"</p>',
        },
      ],
    }
  },

  methods: {
    toggleAccordion(index) {
      this.$set(this.isAccordionOpen, index, !this.isAccordionOpen[index]);
    },
  }
}
</script>
