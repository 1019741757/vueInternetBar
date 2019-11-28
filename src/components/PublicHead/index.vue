<template>
<div id="wrapper">
  <!-- //头部公告导航 -->
  <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
    <div class="navbar-header">

      <a class="navbar-minimalize minimalize-styl-2" href="#">
        <img src="../../assets/images/logoin/logo.png" alt="">
      </a>
      <span class="navbar_pouts">580网吧特权网吧后台</span>
    </div>

    <div class="userinfo">
      <img src="../../assets/images/user.png" class='avatar' alt="">
      <div class='welcome'>
        <p class='name comename'>欢迎</p>
        <p class='name avatarname'>{{Account}}</p>
      </div>
      <span class='username'>
        <el-dropdown trigger="click" @command='setDialogInfo'>
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right" style="color:#fff"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command='ModifyInformation'>修改信息</el-dropdown-item>
            <el-dropdown-item command='ModifyInformation'>修改密码</el-dropdown-item> -->
            <el-dropdown-item command='LogOut'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>

    </div>
    <div class="userinfo" @mouseenter="show=true" @mouseleave="show=false">
      <div class='welcome'>
        <p class='name avatarname user_nameout'> <i class="el-icon-service"></i> 联系客户经理</p>
      </div>
      <div class="user_faoiubody username">
        <el-collapse-transition>
          <div v-show="show">
            <a class="user_faoiubody_pone"> 17343637001 </a>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=3003084805&site=qq&menu=yes" target="_blank" class="user_faoiubody_box">客户经理A</a>
            <a href="http://wpa.qq.com/msgrd?v=3&uin=3003001973&site=qq&menu=yes" target="_blank" class="user_faoiubody_box">客户经理B</a>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </nav>
  <!-- 主体导航内容 -->
  <div class="wrappbody clearfix" :style="{height:fullHeight}">
    <div class="wraueBox">
      <div id="GameComponents">
        <div class="navbar-default navbar-static-side" :style="{height:fullHeight}">
          <!-- <div class="GameComponents_wa">
            <p>{{NetbarUserDtoList.NetbarName}}</p>
            <p>ID:{{NetbarUserDtoList.NetbarId}}</p>
            <div class="">可兑换奖品余额￥{{NetbarUserDtoList.PrizeMoney}}</div>
          </div> -->
          <el-row class="tac">
            <el-col :span="24" style="text-align: left;">
              <el-menu default-active="2" :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#424564" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/homepage">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/ReceivingExchange">
                  <i class="el-icon-printer"></i>
                  <span slot="title">领取兑换管理</span>
                </el-menu-item>
                <el-menu-item index="/ActivityStatistics">
                  <i class="el-icon-goods"></i>
                  <span slot="title">活动统计</span>
                </el-menu-item>
                <el-menu-item index="/ModifyInformation">
                  <i class="el-icon-tickets"></i>
                  <span slot="title">个人中心</span>
                </el-menu-item>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-news"></i>
                    <span>网吧财务管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/PaymentRecord">网费支付记录</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group>
                    <el-menu-item index="/Exchangebill">每日兑换账单</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </div>
        <v-tags></v-tags>
        <div id="page-wrapper" class="gray-bg dashbard-1">
          <div class="GameComponents_body">
            <div class="GameComponents_misu">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  getToken,
  getName,
  setToken,
  removeToken,
  removeAccount,
  removeNetbarId
} from '@/utils/auth'
import {
  mapGetters
} from "vuex";
import vTags from '../Tags/index.vue'
export default {
  name: 'HelloWorld',
  data() {
    return {
      fullHeight: document.documentElement.clientHeight - 68 + 'px',
      ContactsName: '',
      show: false,
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vTags
  },
  computed: {
    ...mapGetters(["Account"])
  },
  created() {
    this.$on('collapse', msg => {
      this.collapse = msg;
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    this.$on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    LogOut() {
      removeToken();
      removeAccount();
      removeNetbarId();
      this.$router.push('/login');
    },
    showInfoList() {
      this.$router.push('/ModifyInformation');
    },
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case 'ModifyInformation':
          this.showInfoList();
          break;
        case 'ModifyInformation':
          this.showInfoList();
          break;
        case 'LogOut':
          this.LogOut();
          break;
      }
    },
  }
}
</script>
<style media="screen">
.userinfo {
  line-height: 60px;
  text-align: right;
  float: right;
  margin-right: 3%;
}

.userinfo .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.userinfo .welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}

.userinfo .welcome .comename {
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #fff;
  margin: 0;
}

.userinfo .welcome .avatarname {
  color: #f6ae3f;
  font-weight: bolder;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  margin: 0;
  cursor: pointer;
}
</style>
