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
  {
    path: '/ball-surround',
    name: 'BallSurround',
    component: () => import('@/views/surround/ball-surround'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
