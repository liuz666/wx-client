<template>
    <div>
        <div  style="margin-bottom:10px;">
            <div class="line">
                <h4><i class="glyphicon glyphicon-pencil"></i> 题目列表</h4>
            </div>
            <div class="row features">
                <div class="col-sm-12">
                    <span class="btn btn-sm btn-success" data-toggle="modal" data-target="#addModal">添加题目</span>
                    <span class="btn btn-sm btn-info" data-toggle="modal" data-target="#importModal">批量导入</span>
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
                    <th >ID</th>
                    <th >题目</th>
                    <th>选项A</th>
                    <th>选项B</th>
                    <th>选项C</th>
                    <th>选项D</th>
                    <th>正确答案</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody >  
                <tr v-for="item in content">
                    <td>
                        <input type="checkbox">
                    </td>
                    <td>{{item.id}}</td>
                    <td>{{item.question}}</td>
                    <td>{{item.choiceA}}</td>
                    <td>{{item.choiceB}}</td>
                    <td>{{item.choiceC}}</td>
                    <td>{{item.choiceD}}</td>
                    <td>{{item.right_answer}}</td>
                    <td>
                       <span title="删除"><i class="fa fa-times" ></i></span> 
                       <span title="编辑"><i class="fa fa-pencil" ></i></span>
                    </td>
                </tr>
            </tbody>
        </table> 
        <pagination v-bind:count="count" :current-page='current' :limit="limit" v-on:pagenum="pageNum" @pagelimit="pageLimit"></pagination>         

        <!-- 修改模态框 -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title active">修改题目信息</h4>
                    </div>
                    <div class="modal-body">
                       <form action="" class="form-horizontal question">
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">题目</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="question" placeholder="请输入题目">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项A</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="choiceA" placeholder="请输入A选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项B</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="choiceB" placeholder="请输入B选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项C</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="choiceC" placeholder="请输入C选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项D</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="choiceD" placeholder="请输入D选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">答案</label>
                                <div class="col-sm-10">
                                    <select  class="form-control answer">
                                        <option value="-1">请设置正确答案</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-blue btn-sm" id="edit">修改</button>
                        <button type="button" class="btn btn-sm" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加题目模态框 -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title active">添加题目</h4>
                    </div>
                    <div class="modal-body">
                        <form action="" class="form-horizontal question">
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">题目</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="question" placeholder="请输入题目">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项A</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="choiceA" placeholder="请输入A选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项B</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="choiceB" placeholder="请输入B选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项C</label>
                                <div class="col-sm-10">
                                    <input type="text"  class="form-control" name="choiceC" placeholder="请输入C选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">选项D</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="choiceD" placeholder="请输入D选项内容">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">答案</label>
                                <div class="col-sm-10">
                                    <select  class="form-control answer">
                                        <option value="-1">请设置正确答案</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-blue btn-sm" id="add-question">添加</button>
                        <button type="button" class="btn btn-sm" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 批量导入题目 -->
        <div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title active">批量导入题目</h4>
                    </div>
                    <div class="modal-body">
                       <form  class="form-horizontal import" enctype="multipart/form-data" method="post">
                            <div class="form-group">
                                <label for="firstname" class="col-sm-2 control-label">导入题目</label>
                                <div class="col-sm-10">
                                    <input type="file"  class="form-control" name="import" >
                                </div>
                            </div>

                        </form>
                        <div class="row text-center" >
                            <a class="btn btn-info " href="/index.php/Home/Admin/export_template" target='_self'>下载导入模板</a>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-blue btn-sm" id="import">导入</button>
                        <button type="button" class="btn btn-sm" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
   import pagination from '@/components/page' //引用pageVue子组件
   export default{
        data(){
            return{
                content:[],
                count: 1,    //总页数
                limit: 10,    // 每页显示条数
                current: 1  // 当前的页数
            }
        },
        components: {
          'pagination': pagination,
        },
        methods:{
            pageNum:function(num){ //num参数就是通过pageVue子组件中setCurrent方法传过来的
                this.current = num;
                var url = 'http://wx-admin.git/index.php/Home/Admin/show_question?page='+num+'&limit='+this.limit;
                this.getData(url);
            },
            pageLimit:function(limit){
                this.limit = limit;
                this.current = 1;
                var url = 'http://wx-admin.git/index.php/Home/Admin/show_question?page='+this.current+'&limit='+limit;
                this.getData(url)
            },
            getData:function(url){
                this.$http.get(url).then((data)=>{
                    this.count= data.body[0].count;
                    this.content= data.body[1].content;
                })
            }
        },
        mounted: function(){
            this.$http.get('http://wx-admin.git/index.php/Home/Admin/show_question').then((data)=>{
                this.count= data.body[0].count;
                this.content= data.body[1].content;
            })
            $('#isSearh').click(function(){
                console.log(2)
            })
        }   
   }
    
</script>