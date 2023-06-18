<script setup>
// 以24小时热榜 获取数据渲染模板
// 1.封装接口
// 2.调用接口渲染模板
import {getHotGoodsAPI} from '@/apis/detail'
import {onMounted, ref} from 'vue'
import {computed} from 'vue'
// 获取路由方法
import {useRoute} from 'vue-router'

// 设计props参数 适配不同的title和数据
const props = defineProps({
    hotType:{
        type:Number
    }
})
// 适配title 1-24小时 2-周热榜
const TYPEMAP = {
    1:'24小时热榜',
    2:'周热榜'
}
const title = computed(()=>TYPEMAP[props.hotType])


// 定义一个响应式的对象数据 并且是一个空数组
const hotList = ref([])
// 调方法得到route实例
const route = useRoute()
// 编写一个单独的小方法
const getHotList = async ()=>{
    // 调用接口并传参 并且是一个对象的格式
    const res = await getHotGoodsAPI({
        // 当前的路由项  商品id
        id:route.params.id,
        type:props.hotType
    })
    // 数据拿到后交给、、
    hotList.value = res.result
}
    // 选择一个onMounted构造函数 将其执行起来
    onMounted(()=>getHotList())
    // 数据没问题后去template渲染一下模板
</script>


<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{item.name}}</p>
      <p class="desc ellipsis">{{item.desc}}</p>
      <p class="price">&yen;{{item.price}}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>