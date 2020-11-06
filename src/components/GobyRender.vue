<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "GobyRender",
  props: [
    'data'
  ],
  mounted() {

    let formData = this.data;
    this.$nextTick(function () {
      // eslint-disable-next-line no-undef
      // const wrap = $(this.$el);
      // const formRender = wrap.formRender();
      // eslint-disable-next-line no-undef
      $(this.$el).formRender({formData: formData});
      // formRender.actions.render(formData)
    });
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    data: function (newData, oldData) {
      // eslint-disable-next-line no-undef
      $(this.$el).formRender({formData: newData});
    }
  }
}
</script>

<style scoped>

</style>