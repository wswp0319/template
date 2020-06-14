package com.suke.czx.modules.daily.controller;

import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import com.suke.czx.modules.daily.entity.TbDaily;
import com.suke.czx.modules.daily.service.TbDailyService;
import com.suke.czx.common.utils.R;
import lombok.AllArgsConstructor;
import com.suke.czx.common.annotation.SysLog;
import com.suke.czx.common.base.AbstractController;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.Arrays;



/**
 * 
 * 
 * @author czx
 * @email object_czx@163.com
 * @date 2020-05-21 11:39:10
 */
@RestController
@AllArgsConstructor
@RequestMapping("/daily/tbdaily")
public class TbDailyController  extends AbstractController {
    private final  TbDailyService tbDailyService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @PreAuthorize("hasRole('daily:tbdaily:list')")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        QueryWrapper<TbDaily> queryWrapper = new QueryWrapper<>();
        IPage<TbDaily> sysConfigList = tbDailyService.page(mpPageConvert.<TbDaily>pageParamConvert(params),queryWrapper);
        return R.ok().put("page", mpPageConvert.pageValueConvert(sysConfigList));
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @PreAuthorize("hasRole('daily:tbdaily:info')")
    public R info(@PathVariable("id") Integer id){
        return R.ok().put("tbDaily", tbDailyService.getById(id));
    }


    /**
     * 新增
     */
    @SysLog("新增数据")
    @RequestMapping("/save")
    @PreAuthorize("hasRole('daily:tbdaily:save')")
    public R save(@RequestBody TbDaily tbDaily){
        tbDailyService.save(tbDaily);
        return R.ok();
    }


    /**
     * 修改
     */
    @SysLog("修改数据")
    @RequestMapping("/update")
    @PreAuthorize("hasRole('daily:tbdaily:update')")
    public R update(@RequestBody TbDaily tbDaily){
		tbDailyService.updateById(tbDaily);
        return R.ok();
    }


    /**
     * 删除
     */
    @SysLog("删除数据")
    @RequestMapping("/delete")
    @PreAuthorize("hasRole('daily:tbdaily:delete')")
    public R delete(@RequestBody Integer[] ids){
		tbDailyService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }
	
}
