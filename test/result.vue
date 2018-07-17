<template>

<div class="item_label">
  <span class="desc">{{ex.strCTime}}</span>
  <span class="desc">ID：<em class="text">{{ex.strExpressOrderId}}</em></span>
</div>
<div class="item_detail" >
  <table>
    <tbody>
      <tr v-for="(info,index) in ex.vecGOrderInfo" :class="{'tr_hl':ex.uiRefundFlag}">
        <GoodsSkuInfo :info="info"></GoodsSkuInfo>
        
        <GoodsPostInfo  v-if="!index"
                        :postInfo="ex.stPostInfo" 
                        :rowspan="(ex.vecGOrderInfo.length)"></GoodsPostInfo>
        <GoodsNumInfo :info="info"></GoodsNumInfo>
        

        <GoodsSkuInfo :info="info"></GoodsSkuInfo>
        
        <GoodsPostInfo  v-if="!index"
                        :postInfo="(ex.data.stPostInfo)" 
                        :rowspan="(ex.vecGOrderInfo.length)"></GoodsPostInfo>
          
              <div v-if="(data.person.vecName)">{{(data.person.vecName).join(';')}}</div>
              <div>{{((ex.vecGOrderInfo.length)+1)}}</div>
          
        <GoodsNumInfo :info="info"></GoodsNumInfo>
        

        <!-- <GoodsStatus :status="payTypeMap[info.stPriceInfo.iPayType]"></GoodsStatus> -->
        <GoodsDiscount :info="info.stPriceInfo"
                        :goodsNum="info.uiGoodsNum"></GoodsDiscount><!-- 商品折扣 -->
        <OrderCoupon v-if="!index"
                      :price="ex.stPayPriceInfo"
                      :rowspan="(ex.vecGOrderInfo.length)"
                      ></OrderCoupon><!-- 订单优惠 -->
        <GoodsFreight v-if="!index"
                      :rowspan="(ex.vecGOrderInfo.length)"
                      :freight='ex.uiTransPrice'></GoodsFreight>
        <GoodsTotalPriceInfo  v-if="!index"
                              :coin="((ex.stPayPriceInfo || {}).uiRealVCoinSum||ex.uiVCoinSum)" 
                              :cash="priceInfo.uiRealCashSum||ex.uiCashPrice" 
                              :rowspan="(ex.vecGOrderInfo.length)"></GoodsTotalPriceInfo>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script>
  
  export default {
    props:['ex']
  }
</script>