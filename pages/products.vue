<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword"></Crumbs>
      <Categroy :types="types" :areas="areas" />
      <List :list="list" />
    </el-col>
    <el-col :span="5"></el-col>
  </el-row>
</template>
<script>
import Crumbs from '@/components/products/crumbs'
import Categroy from '@/components/products/categroy'
import List from '@/components/products/list.vue'
import { getResultsByKeywords, getCrumbs } from '@/utils/axios/api/searchAction'
export default {
  components: {
    Crumbs,
    Categroy,
    List
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: []
    }
  },
  mounted() {
    console.log(this.list)
  },
  async asyncData(ctx) {
    let keyword = ctx.query.keyword
    let city = ctx.store.state.geo.position.city
    let params = {
      city: city.replace('市', ''),
      keyword
    }
    // let { data: { count, pois } } = await getResultsByKeywords(params)
    let { data } = await ctx.$axios.get('/api/search/resultsByKeywords', {params})
    let { data: { count, pois } } = data

    console.log('美的鹭湖半山温泉:', pois)
    let params2 = {
      city
    }
    // let { data: { areas, types } } = await getCrumbs(params2)
    let { data: data2 } = await ctx.$axios.get(
      '/api/categroy/getCrumbs',
      {params:params2}
    )
    let { data: { areas, types } } = data2
    // return {}
    return {
      list: pois.filter(item => item.photos.length).map(item => {
        return {
          type: item.type,
          img: item.photos[0].url,
          name: item.name,
          comment: Math.floor(Math.random() * 10000),
          rate: Number(item.biz_ext.rating),
          price: Number(item.biz_ext.cost),
          scene: item.tag,
          tel: item.tel,
          status: '可订明日',
          location: item.location,
          module: item.type.split(';')[0]
        }
      }),
      keyword,
      areas: areas.filter(item => item.type !== '').slice(0, 5),
      types: types.filter(item => item.type !== '').slice(0, 5),
      point: (pois.find(item => item.location).location || '').split(',')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/products/index.scss';
</style>
