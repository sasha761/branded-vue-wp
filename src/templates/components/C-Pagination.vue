<template>
  <div v-if="maxPages > 1" class="c-pagination">
    <ul>
      <!-- <li class="is-active">
        <span class="page-number page-numbers current">1</span>
      </li> -->

      <!-- {{$route.params}} -->
      <li 
        v-for="(page, key) in maxPages"
        :key="key"
        :class="{'is-active' : page === currentPage}"
      >
        <!-- <span v-if="maxPages > 10 & key === 6" class="dots">…</span> -->
        <router-link
          :to="{ 
            name: 'product-category', 
            params: { 
              categorySlug: $route.params.categorySlug,
              subcategorySlug: $route.params.subcategorySlug,
            },
            query: {
              page: page
            }
          }" 
          class="page-number page-numbers"
        >
          {{page}}
        </router-link>
      </li>
      <!-- <li>
        <a
          href="https://branded.com.ua/product-category/women/page/3/"
          class="page-number page-numbers"
          >3</a
        >
      </li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/4/"
          class="page-number page-numbers"
          >4</a
        >
      </li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/5/"
          class="page-number page-numbers"
          >5</a
        >
      </li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/6/"
          class="page-number page-numbers"
          >6</a
        >
      </li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/7/"
          class="page-number page-numbers"
          >7</a
        >
      </li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/8/"
          class="page-number page-numbers"
          >8</a
        >
      </li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/9/"
          class="page-number page-numbers"
          >9</a
        >
      </li>
      <li class="is-active"><span class="dots">…</span></li>
      <li>
        <a
          href="https://branded.com.ua/product-category/women/page/47/"
          class="page-number page-numbers"
          >47</a
        >
      </li> -->
    </ul>
  </div>
</template>

<script>
import Api from '@/api/Axios'

export default {
  data() {
    return {
      pagination: [],
      maxPages: 1,
      currentPage: 1,
      url: ''
    }
  },

  mounted() {
    this.loadPagination()
    console.log(this.url)
  },  

  methods: {
    loadPagination() {
      this.url = this.$route.params.subcategorySlug || this.$route.params.categorySlug;

      Api.post('archive/pagination', {
        url: this.url
      })
      .then((result) => {
        console.log(result)
        this.maxPages = result.data.max_num_pages
        this.currentPage = result.data.current_page
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>