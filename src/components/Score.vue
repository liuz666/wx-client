<!-- 1、模板 html -->
<template>
    <div>
        <div  style="margin-bottom:10px;">
            <div class="line">
                <h4><i class="glyphicon glyphicon-star"></i> 成绩概览</h4>
            </div>
            <form id="searchForm" >
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label text-right">周期数</label>
                            <div class="col-sm-6">
                                <select  id="cyclesNum" class="form-control" name="cycles_num">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label text-right">部门</label>
                            <div class="col-sm-6">
                                <select  id="dep" class="form-control" name="dep_id">
                                        <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label text-right">姓名</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="name" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group row">
                            <label for="" class="col-sm-4 col-form-label text-right">考试日期</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" name="time" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <span class="btn btn-info btn-sm" id="search" @click="pageSearch()">立即搜索{{isSearch}}</span>
                </div>
            </form>
            <div class="row features">
                <div class="col-sm-8">
                    <span class="btn btn-danger btn-sm" id="handleExport">导出excel</span>
                    <span class="btn btn-primary btn-sm" id="clearSearch" v-show="isSearch">清除搜索</span>
                </div> 
                <div class="col-sm-4 text-right">
                    <span class="btn btn-info btn-sm" id="isSearh" title="搜索">
                        <i class="fa fa-search"></i>
                    </span>
                </div>
            </div>
        </div>
        <!--信息展示-->
        <table  class="footable table-striped" id="s-tab">
            <thead>
                <tr >
                    <th>
                        <input type="checkbox">
                    </th>
                    <th>ID</th>
                    <th>部门</th>
                    <th>姓名</th>
                    <th >正确个数</th>
                    <th>错误个数</th>
                    <th>期数</th>
                    <th>考试日期</th>
                      
                </tr>
            </thead>
            <tbody >  
                <tr v-for="item in content">    
                    <td>
                        <input type="checkbox">
                    </td>
                    <td>{{item.id}}</td>
                    <td>{{item.dep}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.right_num}}</td>
                    <td>{{item.err_num}}</td>
                    <td>{{item.cycles_num}}</td>
                    <td>{{item.time}}</td>
                </tr>
            </tbody>
        </table> 
        <!-- v-bind:total="total" 动态传值,父组件的值传递给pageVue子组件 -->
        <pagination v-bind:count="count" :current-page='current' :limit="limit" v-on:pagenum="pageNum" @pagelimit="pageLimit"></pagination> 
        <!-- 导出筛选 -->
        <div class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title active">导出excel</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        
                    </div>
                    <div class="modal-body">
                        <form  class="form-horizontal" id="exportForm">
                            <div class="form-group row">
                                <label  class="col-sm-3 control-label text-right">部门</label>
                                <div class="col-sm-8">
                                    <select name="dep_id" id="export_dep" class="form-control"></select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-3 control-label text-right">姓名</label>
                                <div class="col-sm-8">
                                    <input type="text"  class="form-control" name="name" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-3 control-label text-right">期数</label>
                                <div class="col-sm-8">
                                    <select name="cycles_num" id="export_cyclesNum" class="form-control"></select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label  class="col-sm-3 control-label text-right">考试日期</label>
                                <div class="col-sm-8">
                                    <input type="date"  class="form-control" name="time" >
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-blue btn-sm" id="export" v-on:click="exports()">导出</button>
                        <button type="button" class="btn btn-sm" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 2、行为 处理逻辑 -->
<script>
    import pagination from '@/components/page' //引用pageVue子组件
    export default{
        // data:function(){
        //     return{

        //     }
        // },
        data() { //es6写法 功能同上面写法是一样的
            return {
                message: 'Vue的生命周期',
                content:[],
                count: 1,    //总页数
                limit: 10,    // 每页显示条数
                current: 1,  // 当前的页数
                isSearch: false
            };
        },
        components: {
          'pagination': pagination,
        },
        methods:{
            pageNum:function(num){ //num参数就是通过子组件中setCurrent方法传过来的
                this.current = num;
                let url = 'http://wx-admin.git/index.php/Home/Score/show?page='+num+'&limit='+this.limit;
                this.getData(url);
            },
            pageLimit:function(limit){
                this.limit = limit;
                this.current = 1;
                let url = 'http://wx-admin.git/index.php/Home/Score/show?page='+this.current+'&limit='+limit;
                this.getData(url)
            },
            pageSearch:function(){
                this.isSearch = true;
                let params = $('#searchForm').serializeObject();
                params = JSON.stringify(params);
                params = base64encode(utf16to8(params)); //base64加密
                let url = 'http://wx-admin.git/index.php/Home/Score/show?page=1&limit='+this.limit+'&search='+params;
                this.getData(url) 
            },
            getData:function(url){
                this.$http.get(url).then((data)=>{
                    this.count= data.body[0].count;
                    this.content= data.body[1].content;
                })
            },
            exports:function(){
                let val = $('#exportForm').serializeObject();
                val = JSON.stringify(val);
                val = utf16to8(val);
                val = base64encode(val);
                location.href = "http://wx-admin.git/index.php/Home/Score/export?" + "search=" + val;
                $("#exportModal").modal("hide");
                
            }
        },
        computed:{

        },
        mounted: function(){
            this.$http.get('http://wx-admin.git/index.php/Home/Score/show').then((data)=>{
                this.count= data.body[0].count;
                this.content= data.body[1].content;
            })
            $('#handleExport').click(function(){
                $('#exportModal').modal('show')
            })
            $('#isSearh').click(function(){
                var status = $('#searchForm').css('display');
                if(status == 'block'){
                    $('#searchForm').fadeOut("slow");
                }else{
                    $('#searchForm').fadeIn("slow");
                }
            })
        }   
        /*,
        beforeCreate: function() {
          console.group('------beforeCreate创建前状态------');
          console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
          console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
          console.log("%c%s", "color:red","message: " + this.message) 
        },
        created: function() {
          console.group('------created创建完毕状态------');
          console.log("%c%s", "color:red","el     : " + this.$el); //undefined
          console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
          console.log("%c%s", "color:red","message: " + this.message); //已被初始化
        },
        beforeMount: function() {
          console.group('------beforeMount挂载前状态------');
          console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
          console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
          console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
        },
        mounted: function() {
          console.group('------mounted 挂载结束状态------');
          console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
          console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
          console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
        },
        beforeUpdate: function () {
          console.group('beforeUpdate 更新前状态===============》');
          console.log("%c%s", "color:red","el     : " + this.$el);
          console.log("%c%s", "color:red","data   : " + this.$data); 
          console.log("%c%s", "color:red","message: " + this.message); 
        },
        updated: function () {
          console.group('updated 更新完成状态===============》');
          console.log("%c%s", "color:red","el     : " + this.$el);
          console.log("%c%s", "color:red","data   : " + this.$data); 
          console.log("%c%s", "color:red","message: " + this.message); 
        },
        beforeDestroy: function () {
          console.group('beforeDestroy 销毁前状态===============》');
          console.log("%c%s", "color:red","el     : " + this.$el);
          console.log("%c%s", "color:red","data   : " + this.$data); 
          console.log("%c%s", "color:red","message: " + this.message); 
        },
        destroyed: function () {
          console.group('destroyed 销毁完成状态===============》');
          console.log("%c%s", "color:red","el     : " + this.$el);
          console.log("%c%s", "color:red","data   : " + this.$data); 
          console.log("%c%s", "color:red","message: " + this.message)
        }*/
    }
   
</script>
<!-- 3、css样式 -->
<style>
    
</style>