<template>
  <div id="fb-editor" ref="fb">

  </div>
</template>

<script>

export default {
  name: "GobyForm",
  components: {},

  data() {
    return {}
  },
  mounted() {
    this.$nextTick(function () {
      // window.$(this.$el).daterangepicker();
      const vm = this;
      let options = {
        onSave: function (evt, formData) {
          vm.$emit('onSave', formData)
        },
      };
      // eslint-disable-next-line no-undef
      $(this.$el).formBuilder(options);

    });
  }
}
</script>

<style scoped>

</style>