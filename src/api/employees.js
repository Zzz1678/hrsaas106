import request from '@/utils/request'

/**
 *  获取员工的简单列表
 * **/
export function getEmployeeSimple() {
    return request({
        url: '/sys/user/simple'
    })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
    return request({
        url: '/sys/user',
        params
    })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}
/*
 *新增员工接口
 ************/
export function addEmployee(data) {
    return request({
        url: "/sys/user",
        method: "POST",
        data
    })
}

/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
    return request({
        url: '/sys/user/batch',
        method: 'post',
        data
    })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
        // 实现永慧明和密码的额修改，这里有一个缺陷，接口中我们都去到的用户名密码的密文
    })
}