<template>
  <select-filter 
    @select-filter="handleSelectChange" 
    :options="options" 
    :show-all="showAll"
    :filter-param="filterParam" 
    :current-option="currentOption"
  />
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
      type: Array,
      required: true,
    },
    showAll: {
      type: Object,
    },
    filterParam: {
      type: String,
      required: true,
      default: ''
    },
    currentOption: {
      type: Object,
      required: true
    },
  },

  methods: {
    addQueryParams(selectedOption) {
      console.log(selectedOption);
      const query = { ...this.$route.query };
      query[this.filterParam] = selectedOption.key;
      this.$router.push({ path: '', query });
    },
    removeQueryParams(selectedOption) {
      const query = { ...this.$route.query };
      delete query[selectedOption.type];
      this.$router.push({ path: '', query });
    },

    handleSelectChange(selectedOption) {
      
      if(selectedOption.key !== this.showAll.key) {
        this.addQueryParams(selectedOption);
      } else {
        this.removeQueryParams(selectedOption);
      }

      this.$emit('select-filter', selectedOption);
    },
  }
}
</script>