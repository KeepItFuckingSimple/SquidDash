import Dashboard from './pages/Dashboard.vue'
import Create from './pages/Create.vue'

export const routes = [
    { path: '/', component: Dashboard, props:true },
    { path: '/add', component: Create }
  ]