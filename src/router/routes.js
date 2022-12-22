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
    path: '/password-recovery',
    name: 'PasswordRecovery',
    component: () => import('@/views/PasswordRecovery.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/Favorites.vue')
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: () => import('@/views/Bookings.vue')
  },
  {
    path: '/service/:partnerId/:id?',
    name: 'Service',
    component: () => import('@/views/Service.vue')
  },
  {
    path: '/partner/:id?',
    name: 'Partner',
    component: () => import('@/views/Partner.vue')
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