<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @input="input" @focus="focus" @blur="blur" placeholder="搜索商家或地点"></el-input>
          <button class="el-button el-button-primary">
            <i class="el-icon-search"></i>
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,index) in hotPlace" :key="index">{{item}}</dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item,index) in searchList" :key="index">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <!-- <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a> -->
          <a href="#" v-for="(item,index) in hotPlace" :key="index">{{item}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美图外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美图酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund">
              <p class="txt">随时退</p>
            </i>
          </li>
          <li>
            <i class="single">
              <p class="txt">不满意免单</p>
            </i>
          </li>
          <li>
            <i class="overdue">
              <p class="txt">过期退</p>
            </i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import _ from 'lodash'
import { getTopAction } from '../../../utils/axios/api/searchAction'
export default {
  data() {
    return {
      search: '',
      isFocus: false,
      // hotPlace: ['火锅', '火锅', '火锅', '火锅'],
      hotPlace: this.$store.state.home.hotPlace
        .map(item => {
          return item.name
        })
        .slice(0, 5),
      // searchList: ['故宫', '故宫', '故宫', '故宫']
      searchList: []
    }
  },
  computed: {
    isSearchList() {
      return this.isFocus && this.search.length > 0
    },
    isHotPlace() {
      return this.isFocus && this.search.length == 0
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      setTimeout(() => {
        this.isFocus = false
      }, 200)
    },
    input: _.debounce(async function() {
      // console.log()
      let self = this
      this.searchList = []
      if (this.search.length == 0) {
        return false
      }
      let params = {
        input: this.search,
        city: this.$store.state.geo.position.city.replace('市', '')
      }
      await getTopAction(params).then(res => {
        let { data } = res
        this.searchList = data.top.slice(0, 10).map(item => {
          return item.name
        })
      })
    }, 300)
  }
}
</script>
