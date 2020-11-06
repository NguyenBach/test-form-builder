<template>
  <div>
    <GobyRender kind="render" :data="data"></GobyRender>
  </div>
</template>

<script>
import GobyRender from "@/components/GobyRender";

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
    fetch('http://localhost/test-form-builder/test.php?form_id=' + id)
        .then(response => response.json())
        .then(data => {
          this.data = data.data
        })
  }
}
</script>

<style scoped>

</style>