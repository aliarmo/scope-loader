<template>
<!-- scope 
      var __priceInfo="ex.stPayPriceInfo || {}" 
      var __coin="__priceInfo.uiRealVCoinSum||ex.uiVCoinSum"
      var __len="ex.vecGOrderInfo.length"
-->
<div class="item_label">
  <span class="desc">{{ex.strCTime}}</span>
  <span class="desc">ID：<em class="text">{{ex.strExpressOrderId}}</em></span>
</div>
<div class="item_detail" >
  <table>
    <tbody>
      <tr v-for="(info,index) in ex.vecGOrderInfo" :class="{'tr_hl':ex.uiRefundFlag}">
        <GoodsSkuInfo :info="info"></GoodsSkuInfo>
        <!-- scope -->
        <GoodsPostInfo  v-if="!index"
                        :postInfo="ex.stPostInfo" 
                        :rowspan="__len"></GoodsPostInfo>
        <GoodsNumInfo :info="info"></GoodsNumInfo>
        <!-- /scope -->

        <GoodsSkuInfo :info="info"></GoodsSkuInfo>
        <!-- scope
              var __postInfo="ex.data.stPostInfo" -->
        <GoodsPostInfo  v-if="!index"
                        :postInfo="__postInfo" 
                        :rowspan="__len"></GoodsPostInfo>
          <!-- scope var __vecName="data.person.vecName"
                var __lenMore="__len+1" -->
              <div v-if="__vecName">{{__vecName.join(';')}}</div>
              <div>{{__lenMore}}</div>
          <!-- /scope -->
        <GoodsNumInfo :info="info"></GoodsNumInfo>
        <!-- /scope -->

        <!-- <GoodsStatus :status="payTypeMap[info.stPriceInfo.iPayType]"></GoodsStatus> -->
        <GoodsDiscount :info="info.stPriceInfo"
                        :goodsNum="info.uiGoodsNum"></GoodsDiscount><!-- 商品折扣 -->
        <OrderCoupon v-if="!index"
                      :price="ex.stPayPriceInfo"
                      :rowspan="__len"
                      ></OrderCoupon><!-- 订单优惠 -->
        <GoodsFreight v-if="!index"
                      :rowspan="__len"
                      :freight='ex.uiTransPrice'></GoodsFreight>
        <GoodsTotalPriceInfo  v-if="!index"
                              :coin="__coin" 
                              :cash="priceInfo.uiRealCashSum||ex.uiCashPrice" 
                              :rowspan="__len"></GoodsTotalPriceInfo>
      </tr>
    </tbody>
  </table>
</div>
<!-- /scope -->
</template>

<script>
  
  export default {
    props:['ex']
  }
</script>