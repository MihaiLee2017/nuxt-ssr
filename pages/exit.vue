<template>
  <div></div>
</template>
<script>
import { exitAction } from '../utils/axios/api/userAction'
export default {
  layout: 'blank',
  middleware: async ctx => {
    exitAction().then(res => {
      window.location.href = '/'
    })
  }
}
</script>
