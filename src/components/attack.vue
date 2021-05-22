<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="6">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search" ></el-button>
                </el-input>
                </el-col>
            </el-row>
            <el-table :data="tableData" stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="position" label="被攻击地址" >
                </el-table-column>
                <el-table-column prop="ip" label="IP地址">
                </el-table-column>
                <el-table-column prop="date" label="日期">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
            </el-table>
            <div class="page">
            <el-pagination
  background
  layout="prev, pager, next"
  :total="20">
</el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'attack',
    components: {
  
    },
    data() {
      return {
        tableData: [{
            position:'/login',
            ip:'113.54.248.95',
            date: '2021-05-18',
            status:'拦截'
        }, {
            position:'/login',
            ip:'192.241.214.42',
            date: '2021-05-19',
            status:'拦截'
        }, {
           position:'/login',
            ip:'106.14.195.175 ',
            date: '2021-05-17',
            status:'未拦截'
        }, {
            position:'/login',
            ip:'128.14.209.162 ',
            date: '2021-05-15',
            status:'拦截'
        },{
            position:'/login',
            ip:'220.181.51.87',
            date: '2021-05-16',
            status:'拦截'
        },
        {
            position:'/login',
            ip:'220.181.51.87',
            date: '2021-05-16',
            status:'拦截'
        },{
            position:'/login',
            ip:'220.181.51.87',
            date: '2021-05-16',
            status:'拦截'
        },
        {
            position:'/login',
            ip:'220.181.51.87',
            date: '2021-05-16',
            status:'拦截'
        },{
            position:'/login',
            ip:'220.181.51.87',
            date: '2021-05-16',
            status:'拦截'
        },
        {
            position:'/login',
            ip:'220.181.51.87',
            date: '2021-05-16',
            status:'拦截'
        }
        ]
      }
    }
}
</script>

<style  scoped>
.el-table{
    margin-top: 15px;
}
.page{
    margin: 0 auto;
    text-align: center;
}
</style>
