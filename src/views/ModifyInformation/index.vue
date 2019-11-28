<template>
<div class="ModifyInformation">
  <div class="ModifyInformation_body animated fadeInDown">
    <div class="title_h3"> 个人中心 </div>
    </br>
    <el-tabs v-model="boxIndex" type="border-card">
      <el-tab-pane name="0">
        <span slot="label"><i class="el-icon-date"></i> 编辑资料</span>
        <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
          <el-form :model="ModifyInformationList" :rules="rules" ref="ModifyInformationList" label-width="150px" class="demo-ruleForm">
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1" style="position: relative;">
                <el-form-item label="绑定手机号：" prop="BindingPhone">
                  <el-input v-model="ModifyInformationList.BindingPhone" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-button type="primary" icon="el-icon-edit" @click="modifymodelNamebox()" style="position: absolute;top: 0;right: -54px;"></el-button>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="网吧联系人：" prop="Contacts">
                  <el-input v-model="ModifyInformationList.Contacts" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="QQ：" prop="QQ">
                  <el-input v-model="ModifyInformationList.QQ" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="网吧名称：" prop="NetbarName">
                  <el-input v-model="ModifyInformationList.NetbarName" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="网吧ID：" prop="NetbarId">
                  <el-input v-model="ModifyInformationList.NetbarId" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="所属代理商：" prop="AgencyName">
                  <el-input v-model="ModifyInformationList.AgencyName" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="代理商ID：" prop="AgencyId">
                  <el-input v-model="ModifyInformationList.AgencyId" auto-complete="off" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="20" :xl="16" class="td1">
                <el-form-item label="所属地区：" prop="Tel">
                  <el-cascader size="large" :options="provinceAndCityData" v-model="selectedOptions" @change="handleChange"></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer" style="    padding-left: 149px;">
            <!-- <el-button size="small" @click="addSysOwnerName = false">取 消</el-button> -->
            <el-button type="primary" size="small" @click.native="EditSubmit('ModifyInformationList')">确定修改</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label"><i class="el-icon-info"></i> 实名认证 </span>
        <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
          <el-form :model="ChangeContactsList" :rules="rules" ref="ChangeContactsList" label-width="150px" class="demo-ruleForm">
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="18" :lg="14" :xl="6" class="td1">
                <el-form-item label="真实姓名：" prop="name">
                  <el-input v-model="ChangeContactsList.name" auto-complete="off" :disabled="ContactsShow"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="" style="padding-left: 150px;" v-if="!WeChat">
              <img :src="ImgBse64" alt="">
              <p style="line-height: 40px;margin: 0;">请使用微信扫码进行绑定！</p>
              <p style="line-height: 50px;">注：身份实名认证必须与微信实名一致，否则无法转账成功，请认真填写，一旦提交不可再修改；每一笔兑换实时转账</p>
            </div>
            <div class="" style="padding-left: 150px;" v-if="ContactsShow">
              <p style="line-height: 30px;">注：该网吧已实名认证</p>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer" style="padding-left: 149px;">
            <!-- <el-button size="small" @click="addSysOwnerName = false">取 消</el-button> -->
            <el-button type="primary" size="small" :disabled="ContactsShow" @click.native="ChangeContactsSubmit('ChangeContactsList')">确定</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label"><i class="el-icon-edit-outline"></i> 修改密码 </span>
        <div class="grid-content bg-purple" :style="{minHeight:fullHeight}">
          <el-form :model="BodifyInformationList" :rules="rules" ref="BodifyInformationList" label-width="150px" class="demo-ruleForm">
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="绑定手机号：" prop="Tel">
                  <div class="">
                    {{ModifyInformationList.BindingPhone}}
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1" style="position: relative;">
                <el-form-item label="验证码：" prop="PhoneCode">
                  <el-input v-model="BodifyInformationList.PhoneCode" auto-complete="off" style="width:50%"></el-input>
                </el-form-item>
                <!-- <el-button type="primary" icon="el-icon-mobile-phone" style="position: absolute;top: 0;right: 0px;"> 获取验证码 </el-button> -->
                <el-button type="primary" icon="el-icon-mobile-phone" v-show="Modifyshow" @click="ModifyGetPhoneCode()" style="position: absolute;top: 0;right: 0px;">获取验证码</el-button>
                <el-button type="primary" icon="el-icon-mobile-phone" v-show="!Modifyshow" style="position: absolute;top: 0;right: 0px;">倒计时{{Modifycount}}s</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="设置新密码：" prop="Password">
                  <el-input type="password" v-model="BodifyInformationList.Password" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" style="width: 100%;">
              <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" class="td1">
                <el-form-item label="确认新密码：" prop="password_confirm">
                  <el-input type="password" v-model="BodifyInformationList.password_confirm" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer" style="padding-left: 149px;">
            <el-button type="primary" size="small" @click.native="PasswordSubmit('BodifyInformationList')">确定修改</el-button>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
  <!--更换手机号-->
  <el-dialog title="更换手机号" :visible.sync="modifyPlaceClassifyName" @close='modifycloseDialog' center width="500px">
    <el-form :model="modifyPlaceClassifyList" :rules="rules" ref="modifyPlaceClassifyList" label-width="120px" class="demo-ruleForm">
      <el-form-item label="手机号码：" prop="Phone">
        <el-input v-model="modifyPlaceClassifyList.Phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="获取验证码：" prop="PhoneCode">
        <el-input v-model="modifyPlaceClassifyList.PhoneCode" auto-complete="off" style="width:60%"></el-input>
        <el-button type="primary" v-show="show" @click="GetPhoneCode()" style="position: absolute;top: 0;left: 234px;">获取验证码</el-button>
        <el-button type="primary" v-show="!show" style="position: absolute;top: 0;left:234px;">倒计时{{count}}s</el-button>
      </el-form-item>
      <el-form-item label="登录密码：" prop="Password">
        <el-input v-model="modifyPlaceClassifyList.Password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="modifyPlaceClassifyName = false">取 消</el-button>
      <el-button size="small" type="primary" @click.native="modifySubmit('modifyPlaceClassifyList')">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  setAccount
} from '@/utils/auth'
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
export default {
  name: 'ModifyInformation', //修改信息
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
      fullHeight: document.documentElement.clientHeight *0.5 + 'px',
      CodeToText,
      TextToCode,
      provinceAndCityData,
      selectedOptions: [],
      ModifyInformationList: {},
      //更换手机号
      modifyPlaceClassifyName: false,
      modifyPlaceClassifyList: {
        Phone: '',
        PhoneCode: '',
        Password: ''
      },
      boxIndex: 0,
      show: true,
      count: '',
      timer: '',
      //实名认证
      ContactsShow: true,
      WeChat: '',
      ImgBse64: null,
      ChangeContactsList: {
        name: null
      },
      //修改密码
      Modifyshow: true,
      Modifycount: '',
      Modifytimer: '',
      BodifyInformationList: {},
      //表单验证
      rules: {
        Contacts: [{
            required: true,
            message: '请输入网吧联系人',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        QQ: [{
            required: false,
            message: '请输入QQ号码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
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
  created() {
    var boxIndex = this.$route.query.boxIndex || 0;
    this.boxIndex = boxIndex.toString();
    this.getUser();
    this.getIamges();
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['SET_ACCOUNT']),
    //省市区选择
    handleChange(arr) {
      console.log(this.CodeToText[arr[0]]);
      console.log(this.CodeToText[arr[1]]);
      this.ModifyInformationList.ProName = this.CodeToText[arr[0]];
      this.ModifyInformationList.CityName = this.CodeToText[arr[1]];
    },
    //tabel数据获取
    getUser: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/UserInfo/GetUserInfo", paramList).then(res => {
        console.log(res.data);
        if (res.statusText == 'OK') {
          var data = res.data;
          if (res.data.Contacts != "" && res.data.Contacts != null) {
            _this.ContactsShow = true;
            setAccount(res.data.Contacts);
            _this.SET_ACCOUNT(res.data.Contacts);
          } else {
            _this.ContactsShow = false;
            setAccount(res.data.AccountNumber);
            _this.SET_ACCOUNT(res.data.AccountNumber);
          }
          _this.ChangeContactsList.name = res.data.Contacts;
          _this.WeChat = res.data.WeChat;
          _this.ModifyInformationList = data;
          var ProName = _this.TextToCode[data.ProName].code || null;
          var CityName = _this.TextToCode[data.ProName][data.CityName].code || null;
          // console.log(ProName);
          _this.selectedOptions = [ProName, CityName];
          // console.log(_this.selectedOptions);
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    getIamges: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/UserInfo/GetQRCode", paramList).then(res => {
        console.log(res.data);
        if (res.statusText == 'OK') {
          this.ImgBse64 = "data:image/png;base64," + res.data.Object;

        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //编辑资料数据提交
    ChangeContactsSubmit: function(ChangeContactsList) {
      this.$refs[ChangeContactsList].validate((valid) => {
        if (valid) {
          let paramList = {
            name: this.ChangeContactsList.name,
          };
          var _this = this;
          this.axios.post("/api/UserInfo/ChangeContacts", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.getUser();
              _this.$refs[ChangeContactsList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //编辑资料数据提交
    EditSubmit: function(ModifyInformationList) {
      this.$refs[ModifyInformationList].validate((valid) => {
        if (valid) {
          let paramList = {
            id: this.ModifyInformationList.Id,
            netbarId: this.ModifyInformationList.NetbarId,
            ProName: this.ModifyInformationList.ProName,
            CityName: this.ModifyInformationList.CityName,
            // Contacts: this.ModifyInformationList.Contacts,
            QQ: this.ModifyInformationList.QQ,
            BandBingPhone: this.ModifyInformationList.BindingPhone,
          };
          console.log(paramList);
          var _this = this;
          this.axios.post("/api/UserInfo/SetData", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              _this.$message({
                message: '修改成功',
                type: 'success'
              });
              _this.getUser();
              _this.$refs[ModifyInformationList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改手机号码
    modifymodelNamebox: function() {
      this.modifyPlaceClassifyName = true;
    },
    modifycloseDialog: function() {
      this.$refs.modifyPlaceClassifyList.resetFields();
      clearInterval(this.timer);
      this.show = true;
    },
    //获取验证码
    GetPhoneCode: function() {
      if (this.modifyPlaceClassifyList.Phone) {
        let paramList = {
          phone: this.modifyPlaceClassifyList.Phone
        };
        var _this = this;
        this.axios.get("/api/UserInfo/GetPhoneCode", paramList).then(res => {
          console.log(res.data);
          if (res.statusText == 'OK') {
            _this.getCode();
          } else {
            _this.$message.error(res.data.Message);
          }
        });
      } else {
        this.$message.error('请先输入手机号码');
      }
    },
    //倒计时
    getCode: function() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }
    },
    //修改手机号码数据提交
    modifySubmit: function(modifyPlaceClassifyList) {
      this.$refs[modifyPlaceClassifyList].validate((valid) => {
        if (valid) {
          let paramList = {
            phone: this.modifyPlaceClassifyList.Phone,
            PhoneCode: this.modifyPlaceClassifyList.PhoneCode,
            Password: this.modifyPlaceClassifyList.Password,
          };
          console.log(paramList);
          var _this = this;
          this.axios.post("/api/UserInfo/ChangePhone", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              _this.$message({
                message: '更改成功',
                type: 'success'
              });
              _this.getUser();
              _this.modifyPlaceClassifyName = false;
              _this.$refs[modifyPlaceClassifyList].resetFields();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改密码获取手机验证码
    ModifyGetPhoneCode: function() {
      let paramList = {
        phone: this.ModifyInformationList.BindingPhone
      };
      var _this = this;
      this.axios.get("/api/UserInfo/GetPhoneCode", paramList).then(res => {
        if (res.statusText == 'OK') {
          _this.ModifygetCode();
        } else {
          _this.$message.error(res.data.Message);
        }
      });
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
    PasswordSubmit: function(BodifyInformationList) {
      this.$refs[BodifyInformationList].validate((valid) => {
        if (valid) {
          let paramList = {
            phone: this.ModifyInformationList.BindingPhone,
            PhoneCode: this.BodifyInformationList.PhoneCode,
            Password: this.BodifyInformationList.Password,
          };
          console.log(paramList);
          var _this = this;
          this.axios.post("/api/UserInfo/SetPassword", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              _this.$message({
                message: '设置成功',
                type: 'success'
              });
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
