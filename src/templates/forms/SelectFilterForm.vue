<template>
  <select-filter @select-filter="handleSelectChange" :options="options" :filter-param="filterParam" :current-option="currentOption"/>
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
      type: String,
      required: true,
      default: ''
    },
  },

  computed: {
    // currentOption() {
    //   return this.filterParam
    //   // return this.$route.query[this.filterParam];
    // }
  },

  // mounted() {
  //   console.log(this.currentOption);
  // },

  methods: {
    handleSelectChange(selectedOption) {
      this.$emit('select-filter', selectedOption)
      // const query = { ...this.$route.query };
      // query[this.filterParam] = selectedOption;
      // this.$router.push({ path: '', query });
      // this.$router.push({ path: '', query: { ...this.$route.query, [this.filterParam]: selectedOption } })
    },
  }
}
</script>