<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "GobyRenderer",
  props: ['formData'],
  data() {
    return {
      formRender: null
    }
  },
  watch: {
    formData: function (newValue){
      // eslint-disable-next-line no-undef
      $(this.$el).formRender({formData: newValue})
    }
  },
  mounted() {
    this.$nextTick(function () {
      if(!this.formRender){
        // eslint-disable-next-line no-undef
        this.formRender = $(this.$el).formRender({formData: this.formData});
      }
    });
  }
}
</script>

<style scoped>

</style>