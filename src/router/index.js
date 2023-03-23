import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'RoomLook',
    component: () => import('@/views/room/room-look'),
  },
  {
    path: '/island-sky',
    name: 'IslandSky',
    component: () => import('@/views/islandSky/island-sky'),
  },
  {
    path: '/car-display',
    name: 'CarDisplay',
    component: () => import('@/views/carDisplay/car-display'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
