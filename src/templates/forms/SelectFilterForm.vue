<template>
  <select-filter @select-filter="handleSelectChange" :options="options" :current-option="currentOption"/>
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

  computed: {
    currentOption() {
      return this.$route.query[this.filterParam];
    }
  },

  methods: {
    handleSelectChange(selectedOption) {
      this.$emit('select-filter', selectedOption)
      const query = { ...this.$route.query };
      query[this.filterParam] = selectedOption;
      this.$router.push({ path: '', query });
      // this.$router.push({ path: '', query: { [this.filterParam]: selectedOption } })
    },
  }
}
</script>