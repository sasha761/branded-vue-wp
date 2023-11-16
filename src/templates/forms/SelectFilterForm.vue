<template>
  <select-filter 
    @select-filter="handleSelectChange" 
    :options="options" 
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

  // computed: {
    // currentOption() {
    //   return this.filterParam
    //   // return this.$route.query[this.filterParam];
    // }
  // },

  // mounted() {
  //   console.log(this.currentOption);
  // },

  methods: {
    addQueryParams(selectedOption) {
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
      if(selectedOption.key !== 'all') {
         this.addQueryParams(selectedOption);
      } else {
        this.removeQueryParams(selectedOption);
      }

      this.$emit('select-filter', selectedOption);
    },
  }
}
</script>