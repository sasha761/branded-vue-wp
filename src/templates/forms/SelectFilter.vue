<template>
  <div class="c-sort js-filter-sort">
    <select v-model="selected" @change="handleSelectChange" name="orderby" class="orderby" >
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
      selected: false
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
    }
  },

  methods: {
    handleSelectChange(event) {
      const selectedOption = event.target.options[event.target.selectedIndex];

      this.$emit('select-filter', {type: this.filterParam, key: this.selected, text: selectedOption.text})
      // console.log(selectedOption.text);
    },

    selectFilterInit() {
      this.selected = this.currentOption || this.options[0].key;
    }
  },

  mounted() {
    this.selectFilterInit();
  }
}
</script>
