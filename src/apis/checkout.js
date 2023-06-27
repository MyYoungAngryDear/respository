import request from '@/utils/http'

// 获取详情借口
export const getCheckInfoAPI = ()=>{
    return request({
        url:'/member/ouder/pre'
    })
}

// 创建订单
export const createOrderAPI = (data)=>{
    return request({
        url:'/member/order',
        method:'POST',
        data
    })
}