package com.suke.czx.modules.daily.entity;


import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.io.Serializable;
import java.util.Date;


/**
 * 
 * 
 * @author czx
 * @email object_czx@163.com
 * @date 2020-05-21 11:39:10
 */
@Data
@TableName("tb_daily")
@EqualsAndHashCode(callSuper = true)
public class TbDaily extends Model<TbDaily> implements Serializable {
	private static final long serialVersionUID = 1L;

		//主键
		@TableId
		private Integer id;
		//
		private Integer userId;
		//追求简单，冗余设计
		private Integer dept;
		//工作成果
		private String workResult;
		//提交内容
		private String submitContent;
		//内容说明
		private String contentDescription;
		//计划开始时间
		private String planStartDate;
		//计划结束时间
		private String planEndDate;
		//工作进度
		private String workSchedule;
		//演示地址
		private String demoAddress;
		//标准和要求(1:合格0:不合格)
		private Integer claim;
		//未完成不就措施
		private String planB;
		//提交人
		private String submitter;
		//
		private Integer lookRole;
		//备注
		private String remarks;
		//
		private Date updateTime;
		//
		private Date createTime;
	
}
