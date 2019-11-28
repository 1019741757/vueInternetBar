<template>
<div class="homepage">
  <div class="homepage_body animated fadeInDown">
    <div class="ibox ibox_baouer homepage_top clearfix">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-card shadow="always">
            <div class="base-title">
              <i class="el-icon-share"></i>
              网吧信息
            </div>
            <div class="base-info">
              <div class="base-info-li">
                <span>网吧名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {{NetbarUserDtoList.NetbarName}}
              </div>
              <div class="base-info-li">
                <span>网吧&nbsp;&nbsp;&nbsp;ID： &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {{NetbarUserDtoList.NetbarId}}
              </div>
              <div class="base-info-li">
                <span>登录账号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {{NetbarUserDtoList.AccountNumber}}
              </div>
              <div class="base-info-li">
                <span>绑定手机号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {{NetbarUserDtoList.BindingPhone}}
              </div>
            </div>
            <el-row :gutter="15">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="homepage_ul">
                  <div class="homepage_li homepage_backou1">
                    <span>
                      <count-to :startVal="0" :endVal="NetbarUserDtoList.StatisticsPartakeCount" :duration="2600" class="card-panel-num" /></span>
                    <p>累计参与人数（人）</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="homepage_ul">
                  <div class="homepage_li homepage_backou2">
                    <span>
                      <count-to :startVal="0" :endVal="NetbarUserDtoList.StatisticsExchangeCount" :duration="2600" class="card-panel-num" /></span>
                    <p>累计兑换次数（次）</p>
                  </div>
                </div>
              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="homepage_ul">
                  <div class="homepage_li homepage_backou3">
                    <span>
                      <count-to :startVal="0" :endVal="NetbarUserDtoList.StatisticsExchangeMoney" :duration="2600" class="card-panel-num" /></span>
                    <p>累计奖品兑换金额（元）</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-card shadow="always">
            <div class="homepage_images "> <img src="../../assets/images/banere.jpg" alt=""> </div>
            <div class="homepage_btn">
              <el-input v-model="cdk" auto-complete="off" clearable placeholder="请输入有效兑换码" @keyup.enter.native="PrizeExchange" class="PrizeExchange_input"></el-input>
              <button type="button" name="button" @click="PrizeExchange">领取奖品</button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-card shadow="always">
      <el-radio-group v-model="EchartTypevalue" @change="getEcharts">
        <el-radio-button label="0">按已兑换人次</el-radio-button> &nbsp;
        <el-radio-button label="1">按已兑换奖品金额</el-radio-button>
      </el-radio-group>
      <div id="myChart" :style="{width: '100%', height: '340px'}"></div>
    </el-card>
  </div>
  <el-dialog title="兑换成功" :visible.sync="centerDialogVisible" width="500px" center>
    <div class="PrizeExchange" style="  margin-bottom: 30px;"> <span> 兑换的奖品为： </span> {{name}}</div>
    <!-- <div class="PrizeExchange"> <span>&nbsp; &nbsp; &nbsp; &nbsp;奖品内容：</span> {{conten}}</div> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <!--更换手机号-->
  <el-dialog title="请绑定手机号" :visible.sync="modifyPlaceClassifyName" :showClose='false' :closeOnClickModal="false" center width="500px">
    <el-form :model="modifyPlaceClassifyList" :rules="rules" ref="modifyPlaceClassifyList" label-width="120px" class="demo-ruleForm">
      <el-form-item label="手机号码：" prop="Phone">
        <el-input v-model="modifyPlaceClassifyList.Phone" auto-complete="off" placeholder="请输入手机号码" @keyup.enter.native="modifySubmit('modifyPlaceClassifyList')"></el-input>
      </el-form-item>
      <el-form-item label="获取验证码：" prop="PhoneCode">
        <el-input v-model="modifyPlaceClassifyList.PhoneCode" auto-complete="off" style="width:60%" placeholder="请输入验证码"></el-input>
        <el-button type="primary" icon="el-icon-mobile-phone" v-show="show" @click="GetPhoneCode()" style="position: absolute;top: 0;left: 220px;">获取验证码</el-button>
        <el-button type="primary" icon="el-icon-mobile-phone" v-show="!show" style="position: absolute;top: 0;left:220px;">倒计时{{count}}s</el-button>
      </el-form-item>
      <el-form-item label="登录密码：" prop="Password">
        <el-input type="password" v-model="modifyPlaceClassifyList.Password" auto-complete="off" placeholder="请输入登录密码" @keyup.enter.native="modifySubmit('modifyPlaceClassifyList')"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="password_confirm">
        <el-input type="password" v-model="modifyPlaceClassifyList.password_confirm" auto-complete="off" placeholder="请再次输入登录密码" @keyup.enter.native="modifySubmit('modifyPlaceClassifyList')"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click.native="modifySubmit('modifyPlaceClassifyList')" @keyup.enter.native="modifySubmit('modifyPlaceClassifyList')">确 定 提 交</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  setAccount,
  setNetbarId
} from '@/utils/auth'
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import CountTo from 'vue-count-to'
export default {
  name: 'homepage',
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.modifyPlaceClassifyList.Password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      cdk: '',
      name: '',
      conten: '',
      centerDialogVisible: false,
      NetbarUserDtoList: {},
      //更换手机号
      modifyPlaceClassifyName: false,
      modifyPlaceClassifyList: {
        Phone: '',
        PhoneCode: '',
        Password: ''
      },
      show: true,
      count: '',
      timer: '',
      //判断用户是否实名认证
      RealnameAuthentication: true,
      //Echarts图表
      EchartTypevalue: 0,
      NetbarId: null,
      //表单验证
      rules: {
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
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
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
    this.getUser();
  },
  components: {
    CountTo
  },
  methods: {
    ...mapMutations(['SET_ACCOUNT', 'SET_NETBARID']),
    //获取用户资料
    getUser: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("/api/UserInfo/GetUserInfo", paramList).then(res => {
        console.log(res.data);
        if (res.statusText == 'OK') {
          _this.NetbarUserDtoList = res.data;
          _this.NetbarId = res.data.NetbarId;
          setNetbarId(res.data.NetbarId);
          _this.SET_NETBARID(res.data.NetbarId);
          if (res.data.Contacts != "" && res.data.Contacts != null) {
            setAccount(res.data.Contacts);
            _this.SET_ACCOUNT(res.data.Contacts);
          } else {
            setAccount(res.data.AccountNumber);
            _this.SET_ACCOUNT(res.data.AccountNumber);
          }
          _this.getEcharts();
          var BindingPhone = res.data.BindingPhone;
          if (!BindingPhone) {
            _this.modifyPlaceClassifyName = true;
          } else {
            _this.RealnameAuthenticationBox();
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.Message,
            type: 'error'
          });
        }
      });
    },
    //判断用户是否实名认证
    RealnameAuthenticationBox: function() {
      if (this.NetbarUserDtoList.Contacts == "" || this.NetbarUserDtoList.WeChat == "") {
        this.$confirm('该网吧暂未实名认证，微信实时转账将无法转账成功，请立即前往认证!', '提示', {
          confirmButtonText: '立即认证',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/ModifyInformation',
            query: {
              boxIndex: 1,
            }
          })
        }).catch(() => {});
      }
    },
    //获取曲线图
    getEcharts: function(NetbarId) {
      let paramList = {
        netbarId: this.NetbarId,
        type: this.EchartTypevalue
      };
      var _this = this;
      this.axios.get("/api/UserInfo/GetChartData", paramList).then(res => {
        console.log(res.data);
        if (res.statusText == 'OK') {
          var data = res.data;
          var ExchangeDateList = [];
          var ExchangevalueList = [];
          var ExchangeName = null;
          var name = null;
          for (var i = 0; i < data.length; i++) {
            ExchangeDateList.push(data[i].Date);
            if (this.EchartTypevalue == 0) {
              ExchangevalueList.push(data[i].ExchangeCount);
              ExchangeName = "网吧已兑换人次统计图"
              name = '人次(人)';
            } else {
              ExchangevalueList.push(data[i].ExchangeMoney);
              ExchangeName = "网吧已兑换奖品金额统计图"
              name = '金额(元)';
            }
          }
          // 基于准备好的dom，初始化echarts实例
          let myChart = _this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            color: ['#ff6d60'],
            title: {
              text: ExchangeName,
              x: 'center',
              textStyle: {
                color: '#999'
              },

            },
            tooltip: {},
            xAxis: {
              name: '日期（年/月/日）',
              data: ExchangeDateList
            },
            yAxis: {
              name: name,
            },
            series: [{
              type: 'bar',
              data: ExchangevalueList
            }]
          });

        } else {
          this.$message({
            showClose: true,
            message: res.data.Message,
            type: 'error'
          });
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
          this.axios.post("/api/UserInfo/BindingPhone", paramList).then(res => {
            console.log(res.data);
            if (res.statusText == 'OK') {
              _this.$message({
                message: '绑定成功',
                type: 'success'
              });
              _this.getUser();
              _this.modifyPlaceClassifyName = false;
              _this.$refs[modifyPlaceClassifyList].resetFields();
              // _this.RealnameAuthenticationBox();
            } else {
              _this.$message.error(res.data.Message);
            }
          });
        } else {
          return false;
        }
      });
    },
    //根据兑换码查询订单状态
    PrizeExchange: function() {
      if (this.cdk) {
        const loading = this.$loading({
          lock: true,
          text: '兑换中.....',
          spinner: 'el-icon-loading',
          customClass: 'color_loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let paramList = {
          NetbarId:this.NetbarId,
          cdk: this.cdk
        };
        var _this = this;
        this.axios.get("/api/PrizeSendingRecord/PrizeExchange", paramList).then(res => {
          console.log(res.data);
          if (res.statusText == 'OK') {
            loading.close();
            _this.name = res.data.Object.PrizeName;
            _this.conten = res.data.Object.PrizeContent;
            _this.centerDialogVisible = true;
          } else {
            loading.close();
            _this.$message({
              showClose: true,
              message: res.data.Message,
              type: 'error'
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: '兑换码不能为空',
          type: 'error'
        });
      }

    },
    //根据兑换码查询订单状态
    // PrizeExchange: function(name, conten) {
    //   const h = this.$createElement;
    //   this.$msgbox({
    //     title: '兑换提示',
    //     message: h('div', null, [
    //       h('p', {
    //         style: 'text-align: left;padding-left: 86px;margin-bottom: 18px;font-size: 16px;color:#51567c;'
    //       }, '兑换的奖品为： ' + name),
    //       h('p', {
    //         style: 'text-align: left;padding-left: 118px;margin-bottom: 18px;font-size: 16px;color:#51567c;'
    //       }, '奖品内容：' + conten),
    //     ]),
    //     center: true,
    //     showCancelButton: true,
    //     confirmButtonText: '确定',
    //     beforeClose: (action, instance, done) => {
    //       if (action === 'confirm') {
    //         instance.confirmButtonLoading = true;
    //         instance.confirmButtonText = '兑换中...';
    //         setTimeout(() => {
    //           done();
    //           setTimeout(() => {
    //             instance.confirmButtonLoading = false;
    //           }, 300);
    //         }, 3000);
    //       } else {
    //         done();
    //       }
    //     }
    //   }).then(action => {
    //     // this.$message({
    //     //   type: 'info',
    //     //   message: 'action: '
    //     // });
    //   }).catch(() => {});
    // }
  }
}
</script>
