<template>
<div class="login-box">
  <div class="login-content">
    <div class="login_admin" v-if="Isboxform">
      <div class="login-content-form login-container animated fadeInDown">
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="100px">
          <div class="login-content-title">
            580网吧后台管理
          </div>
          <div class="input-box-input">
            <span class="svg-container">
              <i class="el-icon-mobile-phone"></i>
            </span>
            <el-form-item prop="accountNumber" label="账　　号：">
              <el-input name="accountNumber" type="text" v-model="loginForm.accountNumber" autoComplete="on" placeholder="请输入登录账号" />
            </el-form-item>
            <div class="clearfix"></div>
          </div>
          <div class="input-box-input">
            <span class="svg-container">
              <i class="el-icon-goods"></i>
            </span>
            <el-form-item prop="password" label="密　　码：">
              <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <div class="clearfix"></div>
          </div>
          <el-button type="primary" style="width:100%;height: 40px;font-size: 16px;" :loading="loading" @click.native.prevent="handleLogin">立 即 登 录</el-button>
          <p class="ForgetPassword" @click="ForgetPassword(false)"> 忘记密码 </p>
        </el-form>
      </div>
    </div>
    <div class="login_admin" v-if="!Isboxform">
      <div class="login-content-form login-container animated fadeInRight">
        <el-form class="login-form" autoComplete="on" :model="BodifyInformationList" :rules="loginRules" ref="BodifyInformationList" label-position="left" label-width="120px">
          <div class="login-content-title">
            <i class="el-icon-back" @click="ForgetPassword(true)"></i>
            忘记密码
          </div>
          <el-form-item label="登录账号：" prop="AccountNumber">
            <el-input v-model="BodifyInformationList.AccountNumber" auto-complete="off" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="手机号码：" prop="Phone">
            <el-input v-model="BodifyInformationList.Phone" auto-complete="off"  placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <div style="position: relative;">
            <el-form-item label="验证码：" prop="PhoneCode">
              <el-input v-model="BodifyInformationList.PhoneCode" auto-complete="off" style="width:50%"  placeholder="请输入验证码"></el-input>
            </el-form-item>
            <!-- <el-button type="primary" icon="el-icon-mobile-phone" style="position: absolute;top: 0;right: 0px;"> 获取验证码 </el-button> -->
            <el-button type="primary" icon="el-icon-mobile-phone" v-show="Modifyshow" @click="ModifyGetPhoneCode()" style="position: absolute;top: 0;right: 0px;">获取验证码</el-button>
            <el-button type="primary" icon="el-icon-mobile-phone" v-show="!Modifyshow" style="position: absolute;top: 0;right: 0px;">倒计时{{Modifycount}}s</el-button>
          </div>
          <el-form-item label="设置新密码：" prop="Password">
            <el-input type="password" v-model="BodifyInformationList.Password" auto-complete="off"  placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="password_confirm">
            <el-input type="password" v-model="BodifyInformationList.password_confirm" auto-complete="off"  placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-button type="primary" style="width:100%;height: 40px;font-size: 16px;" :loading="loading" @click.native.prevent="PasswordSubmit('BodifyInformationList')">确定修改</el-button>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapActions,
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'login',
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.BodifyInformationList.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      checked: true,
      loginForm: {
        accountNumber: null,
        password: null
      },
      loading: false,
      //忘记密码
      Isboxform: true,
      Modifyshow: true,
      Modifycount: '',
      Modifytimer: '',
      BodifyInformationList: {},
      loginRules: {
        AccountNumber: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        accountNumber: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
        Phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            pattern: /^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码'
          }
        ],
        PhoneCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ],
        Password: [{
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password_confirm: [{
          required: true,
          validator: validatePass,
          trigger: 'blur'
        }],
      },
    }
  },
  created() {},
  methods: {
    //登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let paramList = {
            accountNumber: this.loginForm.accountNumber,
            password: this.loginForm.password
          };
          var _this = this;
          this.axios.post("/api/UserInfo/GenerateAccessToken", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              var AccessToken = res.data.Object.AccessToken;
              this.$store.dispatch('Login', AccessToken).then(() => {
                setTimeout(() => {
                  _this.loading = false;
                  _this.$router.push({
                    path: '/homepage'
                  })
                }, 1000);
              }).catch(() => {
                this.loading = false
              })
            } else {
              _this.loading = false;
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //忘记密码
    ForgetPassword: function(a) {
      this.Isboxform = a
    },
    //修改密码获取手机验证码
    ModifyGetPhoneCode: function() {
      if (this.BodifyInformationList.Phone) {
        let paramList = {
          phone: this.BodifyInformationList.Phone
        };
        var _this = this;
        this.axios.get("/api/UserInfo/GetPhoneCode", paramList).then(res => {
          if (res.statusText == 'OK') {
            _this.ModifygetCode();
          } else {
            _this.$message.error(res.data.Message);
          }
        });
      } else {
        this.$message.error('请先输入手机号码');
      }

    },
    //倒计时
    ModifygetCode: function() {
      const TIME_COUNT = 60;
      if (!this.Modifytimer) {
        this.Modifycount = TIME_COUNT;
        this.Modifyshow = false;
        this.Modifytimer = setInterval(() => {
          if (this.Modifycount > 0 && this.Modifycount <= TIME_COUNT) {
            this.Modifycount--;
          } else {
            this.Modifyshow = true;
            clearInterval(this.Modifytimer);
            this.Modifytimer = null;
          }
        }, 1000)
      }
    },
    //忘记密码submit
    PasswordSubmit: function(BodifyInformationList) {
      this.$refs[BodifyInformationList].validate((valid) => {
        if (valid) {
          let paramList = {
            AccountNumber: this.BodifyInformationList.AccountNumber,
            phone: this.BodifyInformationList.Phone,
            PhoneCode: this.BodifyInformationList.PhoneCode,
            Password: this.BodifyInformationList.Password,
          };
          console.log(paramList);
          var _this = this;
          this.axios.post("/api/UserInfo/ForgetPassword", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.Isboxform = true;
              clearInterval(_this.Modifytimer);
              _this.$refs[BodifyInformationList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.svg-container {
    position: absolute;
    top: 3px;
    left: 107px;
    z-index: 15;
    font-size: 24px;
}
.svg-container i {
    color: #999;
}
.input-box-input input {
    padding-left: 40px;
}
.ForgetPassword {
    margin: 0;
    line-height: 35px;
    font-size: 14px;
    color: #424565;
    text-align: left;
    cursor: pointer;
}
// .ForgetPassword:hover{
//   color: #f57979;
// }
</style>
