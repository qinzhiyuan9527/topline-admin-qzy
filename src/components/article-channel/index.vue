<template>
  <div>
    <el-select clearable :value="value" @change="handleChange" placeholder="请选择频道">
      <el-option v-for="item in channelsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'articleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channelsData: [] // 频道列表数据
    }
  },
  created () {
    this.articleChannels()
  },
  methods: {
    handleChange (value) {
      this.$emit('input', value)
    },
    // 获取频道列表数据
    articleChannels () {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        // console.log(data.channels)
        this.channelsData = data.channels
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
