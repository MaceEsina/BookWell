export default [
  {
    path: '/',
    name: 'Start',
    component: () => import('@/views/Start.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/hotel/:id?',
    name: 'Hotel',
    component: () => import('@/views/Hotel.vue')
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import('@/views/Reservation.vue'),
    props: true,
  },
]