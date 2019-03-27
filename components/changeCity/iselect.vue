<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.name" :value="item.id"></el-option>
    </el-select>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect"></el-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash'
import {
  getProvince,
  getProvinceID,
  getCity,
  getHotCity
} from '@/utils/axios/api/geoAction'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  mounted() {
    this._getProvince()
  },
  methods: {
    async _getProvince() {
      await getProvince({}).then(res => {
        let { data } = res
        this.province = data.province
      })
    },
    querySearchAsync: _.debounce(async function(query, cb) {
      if (query.length == 0) {
        return false
      }
      let self = this
      if (this.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        await getCity({}).then(res => {
          let { data } = res
          this.cities = data.city.map(item=>{
            return {
              value:item.name
            }
          })
          let ret = this.cities.filter(item => item.value.indexOf(query) > -1)
          cb(ret)
        })
      }
    }, 200),
    handleSelect() {}
  },
  watch: {
    async pvalue(val) {
      this.cvalue = ''
      this.city = []
      await getProvinceID(val).then(res => {
        let { data } = res
        this.city = data.city
      })
    }
  }
}
</script>

