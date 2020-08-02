import Dashboard from './pages/Dashboard.vue'
import Create from './pages/Create.vue'
import Settings from './pages/Settings.vue'
export const routes = [
    { path: '/', component: Dashboard, props:true },
    { path: '/add', component: Create },
    { path: '/settings', component: Settings}
  ]