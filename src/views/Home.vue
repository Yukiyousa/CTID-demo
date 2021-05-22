<template>
    <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="name">
                <h1 v-if="!isCollapse">可信认证平台</h1>
                <h1 v-if="isCollapse">平台</h1>
            </div>
            <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false"
              text-color="#fff"
              background-color="#304156"
              router
              active-text-color="#409FFF">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>攻击监控</span>
                    </template>
                    <el-menu-item index="/attack">
                        <template slot="title">
                        <i class="el-icon-warning"></i>
                        <span>攻击日志</span>
                        </template>
                    </el-menu-item>
              </el-submenu>
              <el-menu-item index="/profile">
                  <i class="el-icon-document"></i>
                  <span slot="title">信息修改</span>
              </el-menu-item>
              <el-menu-item index="/login">
                  <i class="el-icon-info"></i>
                  <span slot="title">意见反馈</span>
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="content">
                    <div class="show_img">
                        <i class="el-icon-s-fold" @click="togleCollapse" v-if="!isCollapse"></i>
                        <i class="el-icon-s-unfold" @click="togleCollapse" v-if="isCollapse"></i>
                    </div>
                    <div class="bread">
                        <el-breadcrumb>
                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item><a href="">攻击日志</a></el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

export default {
    name: 'Home',
    components: {
  
    },
    data(){
        return{
            isCollapse:false
        }
    },
    methods:{
        togleCollapse(){
            this.isCollapse = !this.isCollapse
        }
    }
}
</script>

<style  scoped>
.el-container {
    margin: 0;
    padding: 0;
    height: 100%;
}
.el-aside{
    /* background-color: #333744; */
    background-color: #304156;
    line-height: 100vh;
    box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.1);
}
.el-menu {
    border: none;
}
.el-header{
    background-color: #fff;
}
.el-main{
    background: #f0f2f5;
}
.name{
    line-height: 24px;
    text-align: center;
    color: #fff;
}
.content{
    display: flex;
    padding: 0;
    margin: 0;
}
.show_img{
    margin-top: 15px;
    font-size: 25px;
    padding: 0;

}
.bread{
  padding: 23px;
}
</style>
