<template>
  <section class="m-istyle">
    <dl @mousemove="over">
      <dt>有格调</dt>
      <dd v-for="(item,index) in ddList" :class="{active:kind ==item.kind}" :key="index" :kind="item.kind" :keyword="item.keyword">
        {{ item.label }}
      </dd>
    </dl>
    <ul class="ibod">
      <li v-for="item in cur" :key="item.title">
        <el-car :body-style="{padding:'0px'}" shadow="never">
          <img src="item.img" class="image" alt="">
          <ul class="cbaody">
            <li class="title">{{item.title}}</li>
            <li class="pos">
              <span>{{item.pos}}</span>
            </li>
            <li class="price">￥
              <em>{{item.title}}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-car>
      </li>
    </ul>
  </section>
</template>
<script>
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
  methods: {
    async over(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        // let keyword = dom.getAttribute('keyword')
        // let { status, data: { count, pois } } = await self.$axios.get(
        //   '/search/resultsByKeywords',
        //   {
        //     params: {
        //       keyword,
        //       city: self.$store.state.geo.position.city
        //     }
        //   }
        // )
        // if (status === 200 && count > 0) {
        //   let r = pois.filter(item => item.photos.length).map(item => {
        //     return {
        //       title: item.name,
        //       pos: item.type.split(';')[0],
        //       price: item.biz_ext.cost || '暂无',
        //       img: item.photos[0].url,
        //       url: '//abc.com'
        //     }
        //   })
        //   self.list[self.kind] = r.slice(0, 9)
      } else {
        // self.list[self.kind] = []
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index/artistic.scss';
</style>
