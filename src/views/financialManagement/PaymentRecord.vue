<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 网费支付记录</div>
    <div class="title_pop">
      <span>总支付金额（元）： <a>{{CensusMoneyList.rechargeMoney}}</a> </span>
      <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span>总奖品金额（元）：<a>{{CensusMoneyList.rechargeMoney}}</a> </span> -->
    </div>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="number" auto-complete="off" placeholder="请输入支付编号" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="state" placeholder="请选择兑换状态" clearable @change="onSubmit">
            <el-option v-for="item in PaymentStatusList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" :header-cell-style="{background:'#f3f3f4'}">
        <el-table-column property="Number" label="支付编号" width="130"></el-table-column>
        <el-table-column prop="CreateDate" label="支付时间" align='center' sortable width="210">
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 5px;color:#66ccff">{{ scope.row.CreateDate||'' }}</span>
          </template>
        </el-table-column>
        <el-table-column property="RechargeMoney" label="支付金额（元）"></el-table-column>
        <el-table-column property="GiveMoney" label="奖品金额（元）">
          <template slot-scope="scope">
            <span>{{ scope.row.GiveMoney + scope.row.RechargeMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column property="Ratio" label="网费比例（%）">
          <template slot-scope="scope">
            <span style="color:#f08e83 ">{{ scope.row.Ratio+'%' }}</span>
          </template>
        </el-table-column>
        <el-table-column property="Type" label="支付方式"></el-table-column>
        <el-table-column prop="payStatus" label="支付状态" align='center' width='120' :filters="tableData.payStatus" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.State == '0' ? 'warning' :scope.row.State == '1' ? 'success':scope.row.State == '2' ? 'danger':''" close-transition>
              {{scope.row.State == "0" ? "待支付":scope.row.State == "1" ? "已支付":scope.row.State == "2" ? "支付失败":''}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="Remarks" label="备注"></el-table-column>
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
  name: 'PaymentRecord', //网费支付记录
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      number: '',
      state: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      CensusMoneyList: {},
      tableData: [],
      PaymentStatusList: [{ //支付状态
          id: '0',
          name: '待支付'
        }, {
          id: '1',
          name: '已支付'
        },
        {
          id: '2',
          name: '支付失败'
        }
      ],
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
        number: this.number || null,
        state: this.state || null,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/NetFee/GetNetFeeList", paramList).then(res => {
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
        number: this.number || null,
      };
      var _this = this;
      this.axios.get("/api/NetFee/CensusMoney", paramList).then(res => {
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
