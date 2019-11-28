<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 每日兑换账单 </div>
    <div class="title_pop">
      <span>累计兑换奖品金额（元）：<a>{{CensusMoneyList}}</a> </span>
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" :header-cell-style="{background:'#f3f3f4'}">
        <el-table-column type="index" width="60" label="排序"></el-table-column>
        <el-table-column prop="ExchangeTime" label="日期" align='center' sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 5px;color:#66ccff">{{ scope.row.ExchangeTime||'' }}</span>
          </template>
        </el-table-column>
        <el-table-column property="ExchangeMoney" label="已兑换奖品金额（元）"></el-table-column>
        <el-table-column property="Accepted" label="已收款金额（元）"></el-table-column>
        <el-table-column property="Uncollected" label="待收款金额（元）"></el-table-column>
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
  name: 'Exchangebill', //每日兑换账单
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      startTime: '',
      endTime: '',
      Datevalue: {},
      CensusMoneyList:{},
      tableData: []
    }
  },
  computed: {
    ...mapGetters(["NetbarId"])
  },
  created() {
    this.getData();
    this.getDataMoney();
  },
  mounted() {},
  methods: {
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.getData();
      this.getDataMoney();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.getData();
      this.getDataMoney();
    },
    onSubmit: function() {
      this.pageNo = 1;
      this.getData();
      this.getDataMoney();
    },
    //活动时间
    DateChange: function() {
      if (this.Datevalue) {
        var date1 = this.Datevalue[0];
        var date2 = this.Datevalue[1];
        this.startTime = this.$moment(date1).format("YYYY-MM-DD");
        this.endTime = this.$moment(date2).format("YYYY-MM-DD");
        this.getData();
        this.getDataMoney();
      } else {
        this.startTime = '';
        this.endTime = '';
        this.getData();
        this.getDataMoney();
      }
    },
    //tabel数据获取
    getData: function() {
      let paramList = {
        netbarId: this.NetbarId,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/PrizeSendingRecord/GetExchangeList", paramList).then(res => {
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
    getDataMoney: function() {
      let paramList = {
        netbarId: this.NetbarId,
        startTime: this.startTime,
        endTime: this.endTime,
      };
      var _this = this;
      this.axios.get("/api/PrizeSendingRecord/CensusMoney", paramList).then(res => {
        console.log(res);
        if (res.statusText == 'OK') {
          var data = res.data.Object;
          _this.CensusMoneyList = data;
        } else {
          _this.$message.error(res.data.Message);
        }
      });
    },
  }


}
</script>
