<template>
<div class="ActivityStatistics">
  <div class="ActivityStatistics_body animated fadeInDown">
    <div class="title_h3"> 活动统计 </div>
    </br>
    <el-card shadow="always">
      <el-form :inline="true" class="demo-form-inline" style="padding: 0 5px">
        <el-form-item label="条件筛选：" style="margin-bottom: 5px">
          <el-date-picker v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="activityName" auto-complete="off" placeholder="请输入活动名称" clearable @clear="onSubmit" @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item class="pull-right">
          <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" ref="dtuVoTable" tooltip-effect="dark" :header-cell-style="{background:'#f3f3f4'}">
        <el-table-column property="Name" label="活动名称"></el-table-column>
        <el-table-column property="PrizeList" label="活动奖品名称" :formatter="formatPrizeList"></el-table-column>
        <el-table-column property="PartakeCount" label="参与人数"></el-table-column>
        <el-table-column property="ExchangeMoney" label="累计已兑换奖品金额（元）"></el-table-column>
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
  name: 'ActivityStatistics', //活动统计
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      activityName: '',
      startTime: '',
      endTime: '',
      Datevalue: {},
      tableData: []
    }
  },
  computed: {
    ...mapGetters(["NetbarId"])
  },
  created() {
    this.getData();
  },
  mounted() {},
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
      let paramList = {
        netbarId: this.NetbarId,
        activityName: this.activityName,
        startTime: this.startTime,
        endTime: this.endTime,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      this.axios.get("/api/Activity/GetActivityStatistics", paramList).then(res => {
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
    formatPrizeList: function(row, column) {
      var surText = '';
      for (var i = 0; i < row.PrizeList.length; i++) {
        // console.log(row.PrizeList[i].Describe);
        if (i < row.PrizeList.length-1) {
          surText = surText + row.PrizeList[i].Describe + ' , ';
        }else {
          surText = surText + row.PrizeList[i].Describe;
        }

      }
      return surText;
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
