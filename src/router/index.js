import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import News from '@/components/News'
import Score from '@/components/Score'
import Sets from '@/components/Set'
import UserList from '@/components/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',           //这个表示的是根目录，即一进入的页面
      redirect:'score'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/set',
      name: 'set',
      component: Sets
    },
    {
      path: '/userList',
      name: 'userList',
      component: UserList
    }
  ],
  mode:'history'
})
