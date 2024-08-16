import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import TeamView from './views/TeamView.vue';
import PokemonDetailView from './views/PokemonDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView,
  },
  {
    path: '/team/:id',
    name: 'PokemonDetail',
    component: PokemonDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;