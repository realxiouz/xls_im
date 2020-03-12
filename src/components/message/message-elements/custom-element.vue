<template>
<message-bubble :isMine=isMine>
  <div class="custom-element-wrapper">
    <div class="survey"  v-if="this.payload.data === 'survey'">
      <div class="title">对IM DEMO的评分和建议</div>
      <el-rate
          v-model="rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}">
      </el-rate>
      <div class="suggestion">{{this.payload.extension}}</div>
    </div>
    <template v-else>
      <div class="cus" @click="toGoods(payloadData.goodsId)">
        <img :src="payloadData.goodsImage" style="width:100%;height:100%;" />
        <div style="margin-top:10px">{{payloadData.text}}</div>
        <el-tag style="position:absolute;right:4px;top:4px;">商品ID:{{payloadData.goodsId}}</el-tag>
      </div>
    </template>
  </div>
</message-bubble>
</template>

<script>
import MessageBubble from '../message-bubble'
import { Rate } from 'element-ui'
export default {
  name: 'CustomElement',
  props: {
    payload: {
      type: Object,
      required: true
    },
    isMine: {
      type: Boolean
    }
  },
  components: {
    MessageBubble,
    ElRate: Rate
  },
  computed: {
    text() {
      return this.translateCustomMessage(this.payload)
    },
    rate() {
      return parseInt(this.payload.description)
    },
    payloadData() {
      return JSON.parse(this.payload.data)
    }
  },
  methods: {
    translateCustomMessage(payload) {
      if (payload.data === 'group_create') {
        return `${payload.extension}`
      }
      return '[自定义消息]'
    },
    toGoods(id) {
      window.open(`https://v10.sirme.tv/mobile/goods?id=${id}`,'', 'width=375,height=812,right=100,top=100')
    }
  }
}
</script>

<style lang="stylus" scoped>
.text
  font-weight bold
.title
  font-size 16px
  font-weight 600
  padding-bottom 10px
.survey
  background-color white
  color black
  padding 20px
  display flex
  flex-direction column
.suggestion
  padding-top 10px
  font-size 14px
.cus
  max-width:300px
  position: relative;
  cursor: pointer;
</style>
