<template>
  <main class="p-page" id="post">
		<div class="u-container">
			<div class="row">
				<div class="col-lg-3 col-md-3 col-12 u-col">
					<div class="l-sidebar">
						<ul>
              <li v-for="page in content.related_pages" :key="page.ID">
                <router-link :to="page.link">{{page.post_title}}</router-link>
              </li>
							<!-- {% for page in pages %}
								{% set permalink = function('get_the_permalink', page.ID) %}
								<li class="{% if query_object.ID == page.ID %}is-active {% endif %}"><a href="{{permalink}}">{{page.post_title}}</a></li>
							{% endfor %} -->
						</ul>
						<div class="l-sidebar__contact">
							<!-- {% if current_lang == 'ru' %}
								<p>Не нашли ответ на вопрос? <br> Свяжитесь с нами:</p>
							{% elseif current_lang == 'uk' %}
								<p>Не знайшли відповідь на запитання? <br> Зв'яжіться з нами:</p>
							{% endif %} -->
							<!-- <a href="tel:{{ options.social.phone|replace({' ': ''}) }}">{{ options.social.phone }}</a> -->
							<a href="mailto:branded.own@gmail.com">branded.own@gmail.com</a>
							<p>Пн-Пт 9:00 – 21:00 <br> Сб-Вс 9:00 – 19:00</p>
						</div>
					</div>
				</div>
				<div class="col-lg-9 col-md-9 col-12 u-col">
					<div class="p-page__content">
						<h1 class="p-page__title u-h2">{{content.page.title}}</h1>
						<div class="p-page__content-text" v-html="content.page.content"></div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>

import Api from '@/api/Axios'

export default {
  data() {
    return {
      'content': null
    }
  },

  created() {
    Api.post('page/page', {url: this.$route.path})
      .then((result) => {
        this.content = result.data
        console.log(this.page)
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    extractProductName(url) {
      if (!url) return;

      const parts = url.split('/');
      return parts[parts.length - 2];
    }
  }
}
</script>