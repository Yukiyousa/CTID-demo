<template>
    <div class="container">
        <div class="panels-container">
            <div class="panel right-panel">
                <div class="content">
                    <h1>可信认证平台</h1>
                    <p>基于多模态生物特征鉴伪的可信认证系统</p>
                </div>
                <img src="@/assets/images/register.svg" class="image" alt="" />
            </div>
        </div>
        <div class="mborder">
            <h2 style="text-align: center;position: relative;margin-top: 10px" class="name">立即注册</h2>
                <el-form :model="ruleForm" 
                    :rules="rules"  
                    ref="registerForm"  
                    class="demo-ruleForm" >
                   <el-form-item  prop="username">
                       <el-input prefix-icon="el-icon-user-solid" 
                            v-model="ruleForm.username" 
                            @input="update($event)" 
                            placeholder="请输入用户名">
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input prefix-icon="el-icon-lock" 
                            type="password" v-model="ruleForm.password" 
                            @input="update($event)" 
                            placeholder="请输入密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="test_password">
                        <el-input prefix-icon="el-icon-lock" 
                            type="password" 
                            v-model="ruleForm.test_password" 
                            @input="update($event)" 
                            placeholder="请再次输入并确认密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="phone">
                        <el-input prefix-icon="el-icon-phone"  
                            v-model="ruleForm.phone" 
                            @input="update($event)" 
                            placeholder="请输入手机号码">
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="email">
                        <el-input prefix-icon="el-icon-s-order"  
                            v-model="ruleForm.email" 
                            @input="update($event)" 
                            placeholder="请输入邮箱地址">
                        </el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button  type="primary" @click="submitForm('registerForm')">注册</el-button>
                        <el-button @click="goLogin">登录</el-button>
                    </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password:'',
                    phone:'',
                    email:'',
                    test_password:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    test_password: [
                        {required:true ,message: '请再次输入并确认密码', trigger: 'blur'}
                    ],
                    phone:[
                        {required: true, message:'请输入手机号码',trigger:'blur'},
                        { min:11, max: 11, message: '请输入正确的手机号码' }
                    ],
                    email:[
                        {required: true, message:'请输入邮箱地址',trigger:'blur'}
                    ]
                },
            };
        },
        methods: {
            goLogin(){
                this.$router.push('/')
            },
            
            submitForm(formName){
                var that = this
                if(this.$data.ruleForm.password !== this.$data.ruleForm.test_password){
                    that.$message.error("输入两次密码不一致");
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       var that = this;
                       //这块的url你根据serve_url改
                       this.$http.post("http://121.199.173.22:49158/user/register",that.ruleForm).then(res=>{
                            console.log(res)
                            if(res.data.message === 'ok'){
                                this.$message({
                                    message: '注册成功!',
                                    type: 'success'
                                });
                                that.$router.push('/')
                            }
                            if(res.data.message === '该账号已经注册'){
                                this.$message({
                                    message: '该用户名已被占用!',
                                    type: 'warning'
                                });
                            }
                       })
                    } else {
                    }
                });
            },
        },
    }
</script>

<style scoped>
.mshowimg{
    width: 300px;
}
.container{
    position: fixed;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    min-width:300px;
}
.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  left: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  border-radius: 50%;
}
.mborder{
    /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
    box-shadow: 0px 5px 10px #cccc;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    width: 400px;
    padding: 20px;
    margin-top: 20vh;
    margin-left: 5vw;
}

.demo-ruleForm{
    margin: 10px 30px;
}


.box-card {
    width: 300px;
    background-color: rgba(255, 255, 255, 0.4);
}
.btns {
    text-align: center;
}

.name{
    font-family: "Microsoft YaHei";
}
.el-alert{
    font-size: 20px;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 50vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.image {
  width: 100%;
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}
.panel .content {
    color: #fff;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 2rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}
</style>