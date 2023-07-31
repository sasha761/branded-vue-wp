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

  computed: {
    selectedFirstItem() {
      return Object.keys(this.options)[0] || ''
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
  },

  methods: {
    handleSelectChange() {
      this.$emit('select-filter', this.selected)
    }
  },

  mounted() {
    this.selected = this.selectedFirstItem;
  }
}
</script>
