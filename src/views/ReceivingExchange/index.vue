<template>
<div class="ReceivingExchange">
  <div class="ReceivingExchange_body animated fadeInDown">
    <div class="title_h3"> 领取兑换管理 </div>
    </br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="phone" auto-complete="off" placeholder="请输入手机号码" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="cdk" auto-complete="off" placeholder="请输入兑换码" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="state" placeholder="请选择兑换状态" clearable @change="onSubmit">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="{background:'#f3f3f4'}">
        <el-table-column prop="orderTime" label="领取时间" align='center' sortable width="210">
          <template slot-scope="scope" v-if="scope.row.CreateTime!='无'">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 5px;color:#00d053">{{ scope.row.CreateTime||'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderTime" label="兑换时间" align='center' sortable width="210">
          <template slot-scope="scope" v-if="scope.row.ExchangeTime!='无'">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 5px;color:#66ccff">{{ scope.row.ExchangeTime||'' }}</span>
          </template>
        </el-table-column>
        <el-table-column property="Phone" label="兑换手机号"></el-table-column>
        <el-table-column property="CDK" label="兑换码"></el-table-column>
        <el-table-column property="PrizeName" label="奖品名称"></el-table-column>
        <!-- <el-table-column property="PrizeContent" label="奖品金额（元）"></el-table-column> -->
        <el-table-column prop="payStatus" label="兑换状态" align='center' width='120' :filters="tableData.payStatus" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.State == '1' ? 'danger' :scope.row.State == '2' ? 'success':scope.row.State == '3' ? 'info':''" close-transition>
              {{scope.row.State == "1" ? "未兑换":scope.row.State == "2" ? "已兑换":scope.row.State == "3" ? "已过期":''}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination @current-change="handleCurrentChange" @size-change="sizeCurrentChange" :page-sizes="[10, 15, 20]" :page-size="10" :current-page="pageNo" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </el-row>
    </el-card>
  </div>
</div>
</template>

<script>
import {
  mapGetters,
} from 'vuex'
export default {
  name: 'ReceivingExchange', //领取兑换管理
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      phone: null,
      cdk:null,
      state: null,
      startTime: '',
      endTime: '',
      Datevalue: {},
      tableData: [],
      statusList: [{ //设备状态
          id: '1',
          name: '未兑换'
        }, {
          id: '2',
          name: '已兑换'
        },
        {
          id: '3',
          name: '已过期'
        }
      ],
    }
  },

  created() {
    console.log(this.NetbarId);
    this.getData();
  },
  computed: {
    ...mapGetters(["NetbarId"])
  },
  methods: {
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.getData();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.getData();
    },
    onSubmit: function() {
      this.pageNo = 1;
      this.getData();
    },
    //活动时间
    DateChange: function() {
      if (this.Datevalue) {
        var date1 = this.Datevalue[0];
        var date2 = this.Datevalue[1];
        this.startTime = this.$moment(date1).format("YYYY-MM-DD");
        this.endTime = this.$moment(date2).format("YYYY-MM-DD");
        this.getData();
      } else {
        this.startTime = '';
        this.endTime = '';
        this.getData();
      }
    },
    //tabel数据获取
    getData: function() {
      console.log( this.state);
      let paramList = {
        netbarId: this.NetbarId,
        startTime: this.startTime,
        endTime: this.endTime,
        phone:this.phone,
        cdk:this.cdk,
        state: this.state||null,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/PrizeSendingRecord/GetPrizeSendList", paramList).then(res => {
        console.log(res);
        if (res.statusText == 'OK') {
          var data = res.data.Items;
          _this.tableData = data;
          _this.total = res.data.Total;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
    //表格状态过滤
    filterStatus: function(value, row) {
      const type = parseInt(item.payStatus);
      return this.format_type_list[value] == this.format_type_list[type];
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      // var Date = parseInt(date.substr(6, 13))
      return this.$moment(Date).format("YYYY-MM-DD HH:mm:ss");
    },
  }


}
</script>
