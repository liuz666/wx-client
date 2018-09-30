<template>
    <div>
        <div class="d-flex justify-content-between"  id="page">
            <div class="btn-group limit">
                <button type="button" class="btn btn-default" v-on:click="pageLimit(5)">5</button>
                <button type="button" class="btn btn-default" @click="pageLimit(10)">10</button>
                <button type="button" class="btn btn-default" @click="pageLimit(20)">20</button>
            </div>
            <ul class="pagination pagination-custom">
                <li class="page-item" >
                    <a class="page-link" :class="{'disabled': current == 1}" @click="pageNum(current-1)">上一页</a>
                </li>
                <li class="page-item" v-for="p in grouplist" :class="{'active': current == p.val}">
                    <a class="page-link" @click="pageNum(p.val)"> {{ p.text }} </a>
                </li>
                <li class="page-item">
                    <a class="page-link" @click="pageNum(current+1)">下一页</a>
                </li>
            </ul>
            <div class="total ">
                <span>共 <b class="total-page" >{{count}}</b> 页</span>
                <span>,  到第</span> 
                <input id="input-jmppage" min="1" v-model.number="anyPage">
                <span>页</span>
                <button class="btn btn-sm btn-info" @click="pageNum(anyPage)">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                current: this.currentPage, //返回当前页
                anyPage:1
            }
        },
        props: { //通过props接收到父组件的传值
            count:{ //总页数
                type:Number,
                default:1
            },
            limit: { // 每页显示条数
                type: Number,
                default: 10
            },
            currentPage: { // 当前页码
                type: Number,
                default: 1
            },
            pagegroup: { // 分页条数
                type: Number,
                default: 5,
                coerce: function (v) {
                    v = v > 0 ? v : 5;
                    return v % 2 === 1 ? v : v + 1;
                }
            }
        },
        computed: {
            grouplist: function () { // 计算分页页码,返回一个数组对象
                var len = this.count, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
                if (len <= this.pagegroup) {
                  while (len--) {
                    temp.push({text: this.count - len, val: this.count - len});
                  };
                  return temp;
                }
                while (len--) {
                  temp.push(this.count - len);
                };
                var idx = temp.indexOf(center); //当前页在分页数组中的下标
                (idx < count) && ( center = center + count - idx);
                (this.current > this.count - count) && ( center = this.count - count);
                temp = temp.splice(center - count - 1, this.pagegroup);
                do {
                  var t = temp.shift();
                  list.push({
                    text: t,
                    val: t
                  });
                } while (temp.length);
                if (this.count > this.pagegroup) {
                  (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
                  (this.current < this.count - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
                }
                return list;
            }
        },
        methods: {
            pageNum: function (idx) { //子组件中通过定义一个点击事件 向 父组件传值
                if (this.current != idx && idx > 0 && idx < this.count + 1) {
                    this.current = idx;
                    this.$emit('pagenum', this.current);
                }
            },
            pageLimit: function(limit){
                this.current=1;
                this.$emit('pagelimit',limit);
            }
        }
    }
</script>
<style>
#page{
  min-height:60px;
  background:#f1f1f1;
  padding:15px 0;
  border-radius:0px 0px 5px 5px;
  margin-top:20px;
}

#page .pagination-custom{
  margin:0px;
  height:34px;
}
#input-jmppage{
  width:30px;
  height:32px;
  border-radius:4px;
  border:1px solid #ccc;
  text-align:center;
  font-size:14px;
}
</style>