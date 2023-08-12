<template>
  <div class="c-sort js-filter-sort">
    <select v-model="selected" @change="handleSelectChange" name="orderby" class="orderby" >
      <option 
        v-for="(value, key) in options" 
        :key="key" 
        :value="key"
      >
        {{ value }}
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
      type: Object,
      required: true,
      default: () => ({
        'date': 'По новизне',
        'price-asc': 'Цены: по возрастанию',
        'price-desc': 'Цены: по убыванию'
      })
    },
    currentOption: {
      type: String,
    }
  },

  methods: {
    handleSelectChange() {
      this.$emit('select-filter', this.selected)
    },

    selectFilterInit() {
      this.selected = this.currentOption || Object.keys(this.options)[0];
    }
  },

  mounted() {
    this.selectFilterInit();

    // console.log(Object.keys(this.options)[0]);
  }
}
</script>
