webpackJsonp([1],{WBHA:function(t,e,a){var i;i=function(){return function(t){function e(i){if(a[i])return a[i].exports;var s=a[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var a={};return e.m=t,e.c=a,e.i=function(t){return t},e.d=function(t,a,i){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,a){var i=a(4)(a(1),a(5),null,null);t.exports=i.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,a,i){return a*(1-Math.pow(2,-10*t/i))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,i.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,i.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,i.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,i.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,i.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var e=(t+="").split("."),a=e[0],i=e.length>1?this.decimal+e[1]:"",s=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;s.test(a);)a=a.replace(s,"$1"+this.separator+"$2");return this.prefix+a+i+this.suffix}},destroyed:function(){(0,i.cancelAnimationFrame)(this.rAF)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(a(0));e.default=i.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",i.default)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=0,s="webkit moz ms o".split(" "),n=void 0,o=void 0;if("undefined"==typeof window)e.requestAnimationFrame=n=function(){},e.cancelAnimationFrame=o=function(){};else{e.requestAnimationFrame=n=window.requestAnimationFrame,e.cancelAnimationFrame=o=window.cancelAnimationFrame;for(var r=void 0,l=0;l<s.length&&(!n||!o);l++)r=s[l],e.requestAnimationFrame=n=n||window[r+"RequestAnimationFrame"],e.cancelAnimationFrame=o=o||window[r+"CancelAnimationFrame"]||window[r+"CancelRequestAnimationFrame"];n&&o||(e.requestAnimationFrame=n=function(t){var e=(new Date).getTime(),a=Math.max(0,16-(e-i)),s=window.setTimeout(function(){t(e+a)},a);return i=e+a,s},e.cancelAnimationFrame=o=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=n,e.cancelAnimationFrame=o},function(t,e){t.exports=function(t,e,a,i){var s,n=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(s=t,n=t.default);var r="function"==typeof n?n.options:n;if(e&&(r.render=e.render,r.staticRenderFns=e.staticRenderFns),a&&(r._scopeId=a),i){var l=Object.create(r.computed||null);Object.keys(i).forEach(function(t){var e=i[t];l[t]=function(){return e}}),r.computed=l}return{esModule:s,exports:n,options:r}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},t.exports=i()},pgai:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),n=a("TIfe"),o=a("NYxO"),r=a("WBHA"),l={name:"homepage",data:function(){var t=this;return{cdk:"",name:"",conten:"",centerDialogVisible:!1,NetbarUserDtoList:{},modifyPlaceClassifyName:!1,modifyPlaceClassifyList:{Phone:"",PhoneCode:"",Password:""},show:!0,count:"",timer:"",RealnameAuthentication:!0,EchartTypevalue:0,NetbarId:null,rules:{Phone:[{required:!0,message:"请输入手机号码",trigger:"blur"},{pattern:/^1[2|3|4|5|6|7|8|9][0-9]\d{8}$/,message:"请输入正确的手机号码"}],PhoneCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 10 个字符",trigger:"blur"}],Password:[{required:!0,message:"请输入登录密码",trigger:"blur"},{min:6,max:20,message:"长度在 6 到 20 个字符",trigger:"blur"}],password_confirm:[{required:!0,validator:function(e,a,i){console.log(a),""===a?i(new Error("请再次输入密码")):a!==t.modifyPlaceClassifyList.Password?i(new Error("两次输入密码不一致!")):i()},trigger:"blur"}]}}},created:function(){this.getUser()},components:{CountTo:a.n(r).a},methods:s()({},Object(o.c)(["SET_ACCOUNT","SET_NETBARID"]),{getUser:function(){var t=this,e=this;this.axios.get("/api/UserInfo/GetUserInfo",{}).then(function(a){(console.log(a.data),"OK"==a.statusText)?(e.NetbarUserDtoList=a.data,e.NetbarId=a.data.NetbarId,Object(n.g)(a.data.NetbarId),e.SET_NETBARID(a.data.NetbarId),""!=a.data.Contacts&&null!=a.data.Contacts?(Object(n.f)(a.data.Contacts),e.SET_ACCOUNT(a.data.Contacts)):(Object(n.f)(a.data.AccountNumber),e.SET_ACCOUNT(a.data.AccountNumber)),e.getEcharts(),a.data.BindingPhone?e.RealnameAuthenticationBox():e.modifyPlaceClassifyName=!0):t.$message({showClose:!0,message:a.data.Message,type:"error"})})},RealnameAuthenticationBox:function(){var t=this;""!=this.NetbarUserDtoList.Contacts&&""!=this.NetbarUserDtoList.WeChat||this.$confirm("该网吧暂未实名认证，微信实时转账将无法转账成功，请立即前往认证!","提示",{confirmButtonText:"立即认证",cancelButtonText:"取消",type:"warning"}).then(function(){t.$router.push({path:"/ModifyInformation",query:{boxIndex:1}})}).catch(function(){})},getEcharts:function(t){var e=this,a={netbarId:this.NetbarId,type:this.EchartTypevalue},i=this;this.axios.get("/api/UserInfo/GetChartData",a).then(function(t){if(console.log(t.data),"OK"==t.statusText){for(var a=t.data,s=[],n=[],o=null,r=null,l=0;l<a.length;l++)s.push(a[l].Date),0==e.EchartTypevalue?(n.push(a[l].ExchangeCount),o="网吧已兑换人次统计图",r="人次(人)"):(n.push(a[l].ExchangeMoney),o="网吧已兑换奖品金额统计图",r="金额(元)");i.$echarts.init(document.getElementById("myChart")).setOption({color:["#ff6d60"],title:{text:o,x:"center",textStyle:{color:"#999"}},tooltip:{},xAxis:{name:"日期（年/月/日）",data:s},yAxis:{name:r},series:[{type:"bar",data:n}]})}else e.$message({showClose:!0,message:t.data.Message,type:"error"})})},modifymodelNamebox:function(){this.modifyPlaceClassifyName=!0},modifycloseDialog:function(){this.$refs.modifyPlaceClassifyList.resetFields(),clearInterval(this.timer),this.show=!0},GetPhoneCode:function(){if(this.modifyPlaceClassifyList.Phone){var t={phone:this.modifyPlaceClassifyList.Phone},e=this;this.axios.get("/api/UserInfo/GetPhoneCode",t).then(function(t){console.log(t.data),"OK"==t.statusText?e.getCode():e.$message.error(t.data.Message)})}else this.$message.error("请先输入手机号码")},getCode:function(){var t=this;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){t.count>0&&t.count<=60?t.count--:(t.show=!0,clearInterval(t.timer),t.timer=null)},1e3))},modifySubmit:function(t){var e=this;this.$refs[t].validate(function(a){if(!a)return!1;var i={phone:e.modifyPlaceClassifyList.Phone,PhoneCode:e.modifyPlaceClassifyList.PhoneCode,Password:e.modifyPlaceClassifyList.Password};console.log(i);var s=e;e.axios.post("/api/UserInfo/BindingPhone",i).then(function(e){console.log(e.data),"OK"==e.statusText?(s.$message({message:"绑定成功",type:"success"}),s.getUser(),s.modifyPlaceClassifyName=!1,s.$refs[t].resetFields()):s.$message.error(e.data.Message)})})},PrizeExchange:function(){if(this.cdk){var t=this.$loading({lock:!0,text:"兑换中.....",spinner:"el-icon-loading",customClass:"color_loading",background:"rgba(0, 0, 0, 0.7)"}),e={NetbarId:this.NetbarId,cdk:this.cdk},a=this;this.axios.get("/api/PrizeSendingRecord/PrizeExchange",e).then(function(e){console.log(e.data),"OK"==e.statusText?(t.close(),a.name=e.data.Object.PrizeName,a.conten=e.data.Object.PrizeContent,a.centerDialogVisible=!0):(t.close(),a.$message({showClose:!0,message:e.data.Message,type:"error"}))})}else this.$message({showClose:!0,message:"兑换码不能为空",type:"error"})}})},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"homepage"},[i("div",{staticClass:"homepage_body animated fadeInDown"},[i("div",{staticClass:"ibox ibox_baouer homepage_top clearfix"},[i("el-row",{attrs:{gutter:15}},[i("el-col",{attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[i("el-card",{attrs:{shadow:"always"}},[i("div",{staticClass:"base-title"},[i("i",{staticClass:"el-icon-share"}),t._v("\n              网吧信息\n            ")]),t._v(" "),i("div",{staticClass:"base-info"},[i("div",{staticClass:"base-info-li"},[i("span",[t._v("网吧名称：           ")]),t._v("\n                "+t._s(t.NetbarUserDtoList.NetbarName)+"\n              ")]),t._v(" "),i("div",{staticClass:"base-info-li"},[i("span",[t._v("网吧   ID：            ")]),t._v("\n                "+t._s(t.NetbarUserDtoList.NetbarId)+"\n              ")]),t._v(" "),i("div",{staticClass:"base-info-li"},[i("span",[t._v("登录账号：           ")]),t._v("\n                "+t._s(t.NetbarUserDtoList.AccountNumber)+"\n              ")]),t._v(" "),i("div",{staticClass:"base-info-li"},[i("span",[t._v("绑定手机号：       ")]),t._v("\n                "+t._s(t.NetbarUserDtoList.BindingPhone)+"\n              ")])]),t._v(" "),i("el-row",{attrs:{gutter:15}},[i("el-col",{attrs:{xs:8,sm:8,md:8,lg:8,xl:8}},[i("div",{staticClass:"homepage_ul"},[i("div",{staticClass:"homepage_li homepage_backou1"},[i("span",[i("count-to",{staticClass:"card-panel-num",attrs:{startVal:0,endVal:t.NetbarUserDtoList.StatisticsPartakeCount,duration:2600}})],1),t._v(" "),i("p",[t._v("累计参与人数（人）")])])])]),t._v(" "),i("el-col",{attrs:{xs:8,sm:8,md:8,lg:8,xl:8}},[i("div",{staticClass:"homepage_ul"},[i("div",{staticClass:"homepage_li homepage_backou2"},[i("span",[i("count-to",{staticClass:"card-panel-num",attrs:{startVal:0,endVal:t.NetbarUserDtoList.StatisticsExchangeCount,duration:2600}})],1),t._v(" "),i("p",[t._v("累计兑换次数（次）")])])])]),t._v(" "),i("el-col",{attrs:{xs:8,sm:8,md:8,lg:8,xl:8}},[i("div",{staticClass:"homepage_ul"},[i("div",{staticClass:"homepage_li homepage_backou3"},[i("span",[i("count-to",{staticClass:"card-panel-num",attrs:{startVal:0,endVal:t.NetbarUserDtoList.StatisticsExchangeMoney,duration:2600}})],1),t._v(" "),i("p",[t._v("累计奖品兑换金额（元）")])])])])],1)],1)],1),t._v(" "),i("el-col",{attrs:{xs:24,sm:24,md:24,lg:12,xl:12}},[i("el-card",{attrs:{shadow:"always"}},[i("div",{staticClass:"homepage_images "},[i("img",{attrs:{src:a("xKmB"),alt:""}})]),t._v(" "),i("div",{staticClass:"homepage_btn"},[i("el-input",{staticClass:"PrizeExchange_input",attrs:{"auto-complete":"off",clearable:"",placeholder:"请输入有效兑换码"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.PrizeExchange(e):null}},model:{value:t.cdk,callback:function(e){t.cdk=e},expression:"cdk"}}),t._v(" "),i("button",{attrs:{type:"button",name:"button"},on:{click:t.PrizeExchange}},[t._v("领取奖品")])],1)])],1)],1)],1),t._v(" "),i("el-card",{attrs:{shadow:"always"}},[i("el-radio-group",{on:{change:t.getEcharts},model:{value:t.EchartTypevalue,callback:function(e){t.EchartTypevalue=e},expression:"EchartTypevalue"}},[i("el-radio-button",{attrs:{label:"0"}},[t._v("按已兑换人次")]),t._v("  \n        "),i("el-radio-button",{attrs:{label:"1"}},[t._v("按已兑换奖品金额")])],1),t._v(" "),i("div",{style:{width:"100%",height:"340px"},attrs:{id:"myChart"}})],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"兑换成功",visible:t.centerDialogVisible,width:"500px",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[i("div",{staticClass:"PrizeExchange",staticStyle:{"margin-bottom":"30px"}},[i("span",[t._v(" 兑换的奖品为： ")]),t._v(" "+t._s(t.name))]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{title:"请绑定手机号",visible:t.modifyPlaceClassifyName,showClose:!1,closeOnClickModal:!1,center:"",width:"500px"},on:{"update:visible":function(e){t.modifyPlaceClassifyName=e}}},[i("el-form",{ref:"modifyPlaceClassifyList",staticClass:"demo-ruleForm",attrs:{model:t.modifyPlaceClassifyList,rules:t.rules,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"手机号码：",prop:"Phone"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入手机号码"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.modifySubmit("modifyPlaceClassifyList")}},model:{value:t.modifyPlaceClassifyList.Phone,callback:function(e){t.$set(t.modifyPlaceClassifyList,"Phone",e)},expression:"modifyPlaceClassifyList.Phone"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"获取验证码：",prop:"PhoneCode"}},[i("el-input",{staticStyle:{width:"60%"},attrs:{"auto-complete":"off",placeholder:"请输入验证码"},model:{value:t.modifyPlaceClassifyList.PhoneCode,callback:function(e){t.$set(t.modifyPlaceClassifyList,"PhoneCode",e)},expression:"modifyPlaceClassifyList.PhoneCode"}}),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticStyle:{position:"absolute",top:"0",left:"220px"},attrs:{type:"primary",icon:"el-icon-mobile-phone"},on:{click:function(e){t.GetPhoneCode()}}},[t._v("获取验证码")]),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticStyle:{position:"absolute",top:"0",left:"220px"},attrs:{type:"primary",icon:"el-icon-mobile-phone"}},[t._v("倒计时"+t._s(t.count)+"s")])],1),t._v(" "),i("el-form-item",{attrs:{label:"登录密码：",prop:"Password"}},[i("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"请输入登录密码"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.modifySubmit("modifyPlaceClassifyList")}},model:{value:t.modifyPlaceClassifyList.Password,callback:function(e){t.$set(t.modifyPlaceClassifyList,"Password",e)},expression:"modifyPlaceClassifyList.Password"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"确认密码：",prop:"password_confirm"}},[i("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"请再次输入登录密码"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.modifySubmit("modifyPlaceClassifyList")}},model:{value:t.modifyPlaceClassifyList.password_confirm,callback:function(e){t.$set(t.modifyPlaceClassifyList,"password_confirm",e)},expression:"modifyPlaceClassifyList.password_confirm"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(e){t.modifySubmit("modifyPlaceClassifyList")},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.modifySubmit("modifyPlaceClassifyList")}}},[t._v("确 定 提 交")])],1)],1)],1)},staticRenderFns:[]},u=a("VU/8")(l,c,!1,null,null,null);e.default=u.exports},xKmB:function(t,e,a){t.exports=a.p+"static/img/banere.7281e6e.jpg"}});
//# sourceMappingURL=1.ea5ab2efdca9be49ea26.js.map