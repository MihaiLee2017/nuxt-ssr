<template>
  <section class="m-istyle">
    <dl @mousemove="over">
      <dt>有格调</dt>
      <dd v-for="(item,index) in ddList" :class="{active:kind ==item.kind}" :key="index" :kind="item.kind" :keyword="item.keyword">
        {{ item.label }}
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">￥
              <em>{{ item.price }}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import { getResultsByKeywords } from '../../utils/axios/api/searchAction'
export default {
  data() {
    return {
      kind: 'all',
      ddList: [
        {
          kind: 'all',
          keyword: '景点',
          label: '全部'
        },
        {
          kind: 'part',
          keyword: '美食',
          label: '约会聚餐'
        },
        {
          kind: 'spa',
          keyword: '丽人',
          label: '丽人SPA'
        },
        {
          kind: 'movie',
          keyword: '电影',
          label: '电影演出'
        },
        {
          kind: 'travel',
          keyword: '旅游',
          label: '品质出游'
        }
      ],
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur() {
      return this.list[this.kind]
    }
  },
  mounted() {
    this.getResult('景点', 'all')
  },
  methods: {
    async over(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        let kind = this.kind
        let keyword = dom.getAttribute('keyword')
        if (this.list[this.kind].length > 0) {
          return false
        }
        await this.getResult(keyword, kind)
      }
    },
    async getResult(keyword, kind) {
      let params = {
        keyword,
        city: this.$store.state.geo.position.city
      }
      await getResultsByKeywords(params).then(res => {
        let { pois } = res.data
        let r = pois
          .filter(item => {
            return item.photos.length > 0
          })
          .map(item => {
            return {
              title: item.name,
              pos: item.type.split(';')[0],
              price: item.biz_ext.cost || '暂无',
              img: item.photos[0].url,
              url: '//abc.com'
            }
          })
        this.list[kind] = []
        this.list[kind] = r.splice(0, 9)
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
