<template>
  <div class="c-sort js-filter-sort">
    <select v-model="selected" @change="handleSelectChange">
      <option value="">{{currentOption}}</option>
      <option 
        v-for="(value, key) in options" 
        :key="key" 
        :value="value.key"
      >
        {{ value.text }}
      </option>
    </select>
  </div>
</template>

<script>
// import niceSelect from '../js/niceSelect.js'

export default {
  data() {
    return {
      selected: ''
    }
  },

  props: {
    options: {
      type: Array,
      required: true,
    },
    filterParam: {
      type: String,
    },
    currentOption: {
      type: String,
      required: true,
      default: ''
    },
  },

  methods: {
    handleSelectChange() {
      const selectedOption = this.options.find(option => option?.key === this.selected)?.text;
      this.$emit('select-filter', {type: this.filterParam, key: this.selected, text: selectedOption})
    },

    // selectFilterInit() {
    //   this.selected = '';
    // }
  },

  // mounted() {
  //   this.selectFilterInit();
  // }
}
</script>
