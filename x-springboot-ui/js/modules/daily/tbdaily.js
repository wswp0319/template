$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'daily/tbdaily/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '', name: 'userId', index: 'user_id', width: 80 }, 			
			{ label: '追求简单，冗余设计', name: 'dept', index: 'dept', width: 80 }, 			
			{ label: '工作成果', name: 'workResult', index: 'work_result', width: 80 }, 			
			{ label: '提交内容', name: 'submitContent', index: 'submit_content', width: 80 }, 			
			{ label: '内容说明', name: 'contentDescription', index: 'content_description', width: 80 }, 			
			{ label: '计划开始时间', name: 'planStartDate', index: 'plan_start_date', width: 80 }, 			
			{ label: '计划结束时间', name: 'planEndDate', index: 'plan_end_date', width: 80 }, 			
			{ label: '工作进度', name: 'workSchedule', index: 'work_schedule', width: 80 }, 			
			{ label: '演示地址', name: 'demoAddress', index: 'demo_address', width: 80 }, 			
			{ label: '标准和要求(1:合格0:不合格)', name: 'claim', index: 'claim', width: 80 }, 			
			{ label: '未完成不就措施', name: 'planB', index: 'plan_b', width: 80 }, 			
			{ label: '提交人', name: 'submitter', index: 'submitter', width: 80 }, 			
			{ label: '', name: 'lookRole', index: 'look_role', width: 80 }, 			
			{ label: '备注', name: 'remarks', index: 'remarks', width: 80 }, 			
			{ label: '', name: 'updateTime', index: 'update_time', width: 80 }, 			
			{ label: '', name: 'createTime', index: 'create_time', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#app',
	data:{
		showList: true,
		title: null,
		tbDaily: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.tbDaily = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.tbDaily.id == null ? "daily/tbdaily/save" : "daily/tbdaily/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.tbDaily),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "daily/tbdaily/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "daily/tbdaily/info/"+id, function(r){
                vm.tbDaily = r.tbDaily;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});