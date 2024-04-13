import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test.vue'
import Container from '@/components/Container.vue'
import Avatar from '@/components/Avatar'
import BackendManagement from '@/components/BackendManagement'
import Table from '@/components/Table'
import MarkdownEdit from '../components/MarkdownEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BackendManagement',
    component: BackendManagement,
    children: [
      {
        path: '/menu1',
        component: HelloWorld
      },
      {
        path: '/menu2',
        component: Table
      }
    ]
  },
  {
    path: '/markdown',
    component: MarkdownEdit
  }

];

const router = new VueRouter({
  mode: 'history', // 使用HTML5 History模式，去除URL中的#
  routes
});

export default router;
