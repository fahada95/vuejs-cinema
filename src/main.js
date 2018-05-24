import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

Vue.use(VueResource);
moment.tz.setDefault('UTC');
//JS magic
/*Takes the vue prototype and adds a hook for moment similar to how $http works.
The object for the $moment property contains a single get call which returns an instance of moment */
Object.defineProperty(Vue.prototype, '$moment', {
  get() {
    return this.$root.moment;
  }
});

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment()
  },
  methods: {
    checkFilter(category, title, checked) {
      if (checked) {
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if (index > -1) {
          this[category].splice(index, 1);
        }
      }
    }
  },
  components: {
    MovieList,
    MovieFilter
  },
  created() {
    this.$http.get('/api').then(response => {
      this.movies = response.data;
    });
  }
});
