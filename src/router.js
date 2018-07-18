import Vue from 'vue'
import Router from 'vue-router'
import AnimatedSlider from './views/AnimatedSlider.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'animated-slider'
    },
    {
      path: '/animated-slider',
      name: 'animated-slider',
      component: AnimatedSlider
    }
  ]
})
