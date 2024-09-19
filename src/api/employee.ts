import request from '@/utils/request'
/**
 *
 * 员工管理
 *
 **/
// 登录
export const login = (data: any) =>
  request({
    'url': '/employee/login',
    'method': 'post',
    data: data
  })

  // 分页查询
 export const getEmployeeList = (params: any) =>
 request({
   'url': `/employee/page`,
   'method': 'get',
   'params': params
 })

   // 启用禁用
   export const handleStartOrStop = (params: any) =>
    request({
      'url': `/employee/status/${params.status}`,
      'method': 'POST',
      'params': {id:params.id}
    })