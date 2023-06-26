import request from '@/utils/http'

// 获取详情借口
export const getCheckInfoAPI = ()=>{
    return request({
        url:'/member/ouder/pre'
    })
}