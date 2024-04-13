<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-progress v-for="(progressValue, index) in progressValues" :key="index" type="circle" :percentage="progressValue" status="success" @click.native="progressHandler(index)"></el-progress>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      progressValues: [10, 20, 30, 10, 90]
    }
  },
  methods: {
    progressHandler(index) {
      console.log("enter!!")
      this.progressValues[index] += 10;
      if (this.progressValues[index] > 100) {
        this.progressValues[index] = 0;
      }
    }
  }
}
</script>
