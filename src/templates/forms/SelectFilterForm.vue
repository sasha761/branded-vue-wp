<template>
  <select-filter @select-filter="handleSelectChange" :options="options"/>
</template>

<script>
import selectFilter from './SelectFilter.vue'

export default {
  name: 'SelectFilterForm',

  components: {
    selectFilter,
  },

  data() {
    return {
      filteredOptions: Object
    }
  },
  
  props: {
    options: {
      type: Object,
      required: true,
      default: () => ({
        'date': 'По новизне',
        'price-asc': 'Цены: по возрастанию',
        'price-desc': 'Цены: по убыванию'
      })
    },
    filterParam: {
      type: String,
      required: true,
      default: ''
    }
  },
  
  created() {
    // const windowData = Object.fromEntries(
    //   new URL(window.location).searchParams.entries()
    // );

    // if (windowData[this.filterParam]) {
    //   
    // }

    ///  какая-то хуйня получается не могу изменять обьект походу
    const filteredOptions = this.options;
    const queryVal = this.options[this.$route.query[this.filterParam]];
    const queryKey = Object.values(this.$route.query)[0];
    console.log(queryKey, queryVal);
    if (this.$route.query) {
      delete filteredOptions[queryKey];
      Object.assign({'queryKey': 2}, filteredOptions);
      console.log(filteredOptions);
    }
  },

  methods: {
    handleSelectChange(selectedOption) {
      this.$emit('select-filter', selectedOption)
      this.$router.push({ path: '', query: { [this.filterParam]: selectedOption } })
    },
  }
}
</script>