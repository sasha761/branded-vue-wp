<template>
  <div class="c-accordion">
    <div 
      v-for="(item, index) in accordionItems" 
      :key="index" 
      ref="accordionItem"
      class="c-accordion__block"
    >
      <div @click="toggleAccordion(index)" class="c-accordion__block-title ">
        <span>{{ item.title }}</span>
        <svg width="11px" height="7px" class="u-arrow">
          <use xlink:href="#arrow"></use>
        </svg>
      </div>
      <div 
        class="c-accordion__block-text" 
        :class="{'is-open': accordionItems[index].active }" 
        v-html="item.content"></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      accordionItems: [],
    }
  },

  props: {
    accordionInfo: {
      type: Object,
    }
  },

  mounted() {
    // this.accordionItems = this.accordionInfo.map(item => {
    //   return { ...item, active: false };
    // });

    // this.accordionItems = Object.entries(this.accordionInfo).map((index, item) => {
    //   return { 
        
    //     active: false 
    //   };
    // });
    for (const [key, value] of Object.entries(this.accordionInfo)) {
      const newObj = { 
        'title': key,
        'content': value,
        'active': false
      };

      this.accordionItems.push(newObj);
    }

    // Перебор массива ключей
    // Object.entries(this.accordionInfo).forEach((index, entry) => {
    //   // Добавление нового свойства в каждый объект
    //   this.accordionItems[index]
    //   this.accordionItems[index].active = false;
    //   console.log(index, entry);
    // });

    console.log(this.accordionItems);
  },

  

  methods: {
    toggleAccordion(index) {
      this.accordionItems[index].active = !this.accordionItems[index].active;
      console.log(index, this.accordionItems[index]);
    },
  }
}
</script>
