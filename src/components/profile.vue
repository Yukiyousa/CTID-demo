<template>
    <div>
        <div class="container">
            <el-card class="show">
                <div slot="header" class="clearfix">
                    <span>个人信息</span>
                </div>
                <ul class="user-info">
                <li><i class="el-icon-user-solid"></i> 用户名称 <div class="user-right">{{user.username}}</div></li>
                <li><i class="el-icon-phone"></i> 手机号码 <div class="user-right">{{user.phone}}</div></li>
                <li><i class="el-icon-s-comment"></i> 用户邮箱 <div class="user-right">{{user.email}}</div></li>
                </ul>
            </el-card>
            <el-card class="alter">
                <div slot="header" class="clearfix">
                    <span>信息修改</span>
                </div>
                <ul class="user-info">
                <li><i class="el-icon-user-solid"></i> 用户名称 <div class="user-right"><el-button type="text" @click="dialogVisible = true" class="verify">修改用户名</el-button></div></li>
                <li><i class="el-icon-phone"></i> 手机号码 <div class="user-right"><el-button type="text" @click="dialogVisible = true" class="verify">修改手机号码</el-button></div></li>
                <li><i class="el-icon-s-comment"></i> 用户邮箱 <div class="user-right"><el-button type="text" @click="dialogVisible = true" class="verify">修改邮箱</el-button></div></li>
                <li><i class="el-icon-more"></i> 用户密码 <div class="user-right"><el-button type="text" @click="dialogVisible = true" class="verify">修改密码</el-button></div></li>
                </ul>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile',
    components: {

    },
    data() {
        return {
            user:{
                username:'yuki',
                phone:'18791310507',
                email:'yukiyousa2021@163.com'
            }
        };
    },
};
</script>

<style  scoped>
.container{
    display: flex;
}
.show{
    width: 400px;
    height: 300px;
}
.alter{
    width: 600px;
    height: 300px;
    margin-left: 90px;
}
.user-info {
    padding-left: 0;
    list-style: none;
}
.user-info li{
    border-bottom: 1px solid #F0F3F4;
    padding: 11px 0;
    font-size: 13px;
}
.user-right {
    float: right;
}
</style>
