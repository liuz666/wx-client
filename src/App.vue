<template>
    <div id="app">
        <section id="content">
            <header id="header">
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
                    <ul class="navbar-nav">
                        <li class="nav-item active"><router-link to="/score"  class="nav-link"><i class="fa fa-star"></i> 成绩概览</router-link></li>
                        <li class="nav-item"><router-link to="/home" class="nav-link"><i class="fa fa-file"></i> 题目列表</router-link></li>
                        <li class="nav-item"><router-link to="/news" class="nav-link"><i class="fa fa-newspaper-o"></i> 消息列表</router-link></li>
                        <li class="nav-item"><router-link to="/userList" class="nav-link"><i class="fa fa-user"></i> 用户列表</router-link></li>
                        <li class="nav-item"><router-link to="/set" class="nav-link"><i class="fa fa-asterisk"></i> 功能设置</router-link></li>
                    </ul>
                   <!--  <a class="d-flex flex-row-reverse" href="/index.php/Home/Login/logout">
                        <button type="button" class="btn btn-danger btn-sm navbar-btn">退出登录</button>
                    </a> -->
                   
                </nav>
            </header>
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
    export default {
      name: 'App',
    }
</script>

<style>

</style>
