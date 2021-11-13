import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RestaurantHotel from '../views/Restaurant&Hotel.vue'
import Bus from '../views/Bus.vue'
import Search from '../views/Search.vue'
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Type/ScenicSpot&Active',
    name: 'Types',
    component: Home,
  },
  {
    path: '/Type/Restaurant&Hotel',
    name: 'Restaurant&Hotel',
    component: RestaurantHotel,
  },
  {
    path: '/Location/:type',
    name: 'Filter By Location',
    component: Search,
    meta: {
      useLocation: true
    }
  },
  {
    path: '/Search/:type/',
    name: 'Search',
    component: Search,
    children: [
      {
        path: ':city/', component: Search, name: 'Filter By City', children: [{
          path: ':keyword', component: Search, name: 'Filter By City & Keyword'
        }],
      },
    ]
  },
  {
    path: '/Bus/',
    name: 'Bus',
    component: Bus,
    children: [
      {
        path: ':city/',
        name: 'Bus with City',
        component: Bus,
        meta: {
          bus: true
        },
        children: [{
          path: ':routeID/:direction/',
          name: 'Bus with RouteID',
          component: Bus,
          meta: {
            bus: true
          },
        }]
      }
    ],
    meta: {
      bus: true
    }
  },
  {
    path: '/*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
