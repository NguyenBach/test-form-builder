<template>
  <div style="width: 60%; border: 2px solid black">
    <GobyRender  kind="render" :data="data"></GobyRender>
  </div>
</template>

<script>
import GobyRender from "@/components/GobyRenderBak";

export default {
  name: "ViewForm",
  components: {GobyRender},
  data() {
    return {
      data: null
    }
  },
  created() {
    let id = this.$route.params.id;
    fetch('http://gxdangian.com/test.php?form_id=' + id)
        .then(response => response.json())
        .then(data => {
          this.data = data.data
        })
  }
}
</script>

<style scoped>

</style>