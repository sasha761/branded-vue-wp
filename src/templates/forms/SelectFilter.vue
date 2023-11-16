<template>
  <div class="c-sort js-filter-sort">
    <v-select 
      v-model="selected" 
      @input="handleSelectChange" 
      :options="optionsAdapted" 
      label="text"></v-select>
  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  components: {
    vSelect
  },

  data() {
    return {
      selected: '',
      optionsAdapted: []
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
      type: Object,
      required: true,
    },
  },

  beforeMount() {
    this.selected = this.currentOption.text;
  },

  mounted() {
    this.optionsAdapted = this.options.filter(x => x.key !== this.currentOption.key);
  },

  methods: {
    handleSelectChange(value) {
      if (value !== null) {
        this.$emit('select-filter', {type: this.filterParam, key: value.key, text: value.text})
      } else {
        this.selected = 'Показать все';
        this.$emit('select-filter', {type: this.filterParam, key: 'all', text: 'Показать все'})
      }      
    },
  },
}
</script>
<style>
  @import "vue-select/dist/vue-select.css";
</style>