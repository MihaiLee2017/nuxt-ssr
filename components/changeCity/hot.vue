<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in list" :key="item.id">{{item.name==="市辖区"?item.province:item.name}}</dd>
    </dl>
  </div>
</template>
<script>
import { getHotCity } from '@/utils/axios/api/geoAction'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this._getHotCity()
  },
  methods: {
    async _getHotCity() {
      await getHotCity().then(res => {
        let { data: { hots } } = res
        this.list = hots
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/changeCity/hot.scss';
</style>
