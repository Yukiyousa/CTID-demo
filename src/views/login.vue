<template>
    <div class="container">
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h1>可信认证平台</h1>
                    <p>基于多模态生物特征鉴伪的可信认证系统</p>
                </div>
                <img src="@/assets/images/log.svg" class="image" alt="" />
            </div>
        </div>
        <div class="mborder">
            <h2 style="text-align: center;position: relative;margin-top: 10px" class="name">欢迎登录</h2>
            <el-form :model="ruleForm"   ref="loginForm"  class="demo-ruleForm" :rules="rules">
               <el-form-item  prop="username">
                    <el-input prefix-icon="el-icon-user-solid" 
                        v-model="ruleForm.username" 
                        placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input prefix-icon="el-icon-lock" 
                        type="password" 
                        v-model="ruleForm.password" 
                        placeholder="请输入密码"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" @click="dialogVisible = true" class="verify">点击进行认证</el-button>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                    <el-button @click="goRegister">注册</el-button>
                </el-form-item>
            </el-form>
            <el-dialog class="dialog" :visible.sync="dialogVisible" title="音视频鉴伪" width="40%"  :append-to-body='true' center>
                <div>
                    <el-steps :active="active" finish-status="success" align-center>
                        <el-step title="确认认证"></el-step>
                        <el-step title="音视频鉴伪"></el-step>
                    </el-steps>
                    <div class="next" v-if="this.active === 0">
                         <el-button type="primary"  @click="next" >确认</el-button>
                    </div>
                    <div class="next" v-if="this.active === 2">
                        <el-button type="primary"  @click="dialogVisible = false" >完成认证</el-button>
                    </div>
                    <div class="next" v-if="this.active === 1">
                        <!-- <img src="@/assets/images/speak.png"  class="speak_img" alt="" /> -->
                        <div class="camera_outer">
                            <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
                            <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                        </div>
                        <div class="deepfake_button">
                            <el-button type="primary" @click="startRecorder()"  >开始认证</el-button>
                            <el-button type="primary" @click="stopRecorder()"  >结束认证</el-button>
                            <el-button type="primary"  @click="next" >完成认证</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
    const recorder = new Recorder({
        sampleBits: 16,                 // 采样位数
        sampleRate: 48000,              // 采样率
        numChannels: 1,                 // 声道
    })
    recorder.onprogress = function(params) {
    }
    export default {
        name: "login",
        data() {
            return {
                active:0,
                dialogVisible: false,
                ruleForm: {
                    username: '',
                    password:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        { min: 3, max: 15, message: '长度在 3 到 15 个字符' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                },
                //拍照对应参数
                videoWidth: 300,
                videoHeight: 200,
                imgSrc: "",
                thisCancas: null,
                thisContext: null,
                thisVideo: null,
                openVideo:false
            };
        },
        methods: {
            next() {
                if (this.active++ > 2) 
                    this.active = 0;
            },
            goRegister(){
                this.$router.push('/register')
            },
            // 登录请求函数
            submitForm(formName){
                if(this.active !== 2){
                    this.$message({
                        message: '请进行认证!',
                        type: 'warning'
                    });
                }else if(this.active === 2){
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                        var that = this;
                        // 这块的url你根据serve_url改
                        this.$http.post("http://121.199.173.22:49158/user/login",that.ruleForm).then(res=>{
                            if(res.data.message === '登录成功'){
                                    this.$message({
                                        message: '登录成功!',
                                        type: 'success'
                                    });
                                    this.$router.push('/home')
                            }
                            if(res.data.message === '登录失败'){
                                this.$message({
                                        message: '用户名或密码不正确!',
                                        type: 'warning'
                                    });
                            }
                        })
                        } else {
            
                        }
                    });
                }
            },
            // 开始认证
            startRecorder () {
                // 录音
                recorder.start().then(() => {

                }, (error) => {
                    console.log(`${error.name} : ${error.message}`);
                });
                // 人脸
                var _this = this;
                _this.thisCancas = document.getElementById("canvasCamera");
                _this.thisContext = this.thisCancas.getContext("2d");
                _this.thisVideo = document.getElementById("videoCamera");
                _this.thisVideo.style.display = 'block';
                // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {};
                }
                // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
                // 使用getUserMedia，因为它会覆盖现有的属性。
                // 这里，如果缺少getUserMedia属性，就添加它。
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = function(constraints) {
                    // 首先获取现存的getUserMedia(如果存在)
                    var getUserMedia =
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.getUserMedia;
                    // 有些浏览器不支持，会返回错误信息
                    // 保持接口一致
                    if (!getUserMedia) {//不存在则报错
                        return Promise.reject(
                        new Error("getUserMedia is not implemented in this browser")
                        );
                    }
                    // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                    return new Promise(function(resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                    };
                }
                var constraints = {
                    audio: false,
                    video: {
                    width: this.videoWidth,
                    height: this.videoHeight,
                    transform: "scaleX(-1)"
                }
                };
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(function(stream) {
                    // 旧的浏览器可能没有srcObject
                    if ("srcObject" in _this.thisVideo) {
                        _this.thisVideo.srcObject = stream;
                    } else {
                        // 避免在新的浏览器中使用它，因为它正在被弃用。
                        _this.thisVideo.src = window.URL.createObjectURL(stream);
                    }
                    _this.thisVideo.onloadedmetadata = function(e) {
                        _this.thisVideo.play();
                    };
                    })
                    .catch(err => {
                        console.log(err);
                });
            },
            // 上传录音及拍照 通过结果判断是否登录
            stopRecorder () {
                recorder.stop()
                var _this = this;
                // canvas画图
                _this.thisContext.drawImage(
                    _this.thisVideo,
                    0,
                    0,
                    _this.videoWidth,
                    _this.videoHeight
                );

                // 获取图片base64链接
                var image = this.thisCancas.toDataURL("image/jpg");
                _this.imgSrc = image;//赋值并预览图片
                console.log(this.imgSrc)
                this.thisVideo.srcObject.getTracks()[0].stop();//关闭摄像头

                let toltime = recorder.duration;//录音总时长
                let fileSize = recorder.fileSize;//录音总大小

                // 文件上传
                var file1 = recorder.getWAVBlob();//获取 WAV 数据
                var file2 = this.imgSrc
                console.log(file1)
                console.log(file2)
                // 文件存储至formdata
                const formData = new FormData()
                formData.append('file1',file1)
                formData.append('file2',file2)
                //serve的url
                this.$http.post('http://121.199.173.22:49158/user/login', formData,{"headers": {"Content-Type": "application/json; charset=utf-8"}}).then(res => {
                    if(res.data.message === 'ok'){
                        this.$message({
                            message: '认证成功!',
                            type: 'success'
                        });
                    }
                    if(res.data.message === '验证失败'){
                        this.$message({
                            message: '认证失败!',
                            type: 'warning'
                        });
                    }
                }).catch(error => {
                    console.log('认证出现错误')
                })
            },
        }
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
  right: 48%;
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
    padding: 15px;
    margin-top: 20vh;
    margin-left: 60vw;
    position: relative;
}
.step{
    box-shadow: 0px 5px 10px #cccc;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    width: 400px;
    height: 300px;
    padding: 15px;
    margin-top: 20vh;
    margin-left: 60vw;
    position: relative;
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
    left: 0;
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

.left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
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
.speak_img{
    width: 60px;
    height: 60px;
}
.camera_img{
    width: 70px;
    height: 60px;
}
.next{
    margin-top: 40px;
    text-align: center;
}
.verify{
    float: right;
}
.camera_outer{
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.deepfake_button{
    padding: 20px;
}
</style>