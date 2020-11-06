<template>
  <div>
      {{html}}
  </div>
</template>

<script>
export default {
  name: "GobyRender",
  props: [
    'data',
    'kind'
  ],
  data() {
    return {
      html: ''
    }
  },
  created() {
  },
  mounted() {
    let formData = this.data;
    this.$nextTick(function () {
      // eslint-disable-next-line no-undef
      if(this.kind === 'render'){
        // eslint-disable-next-line no-undef
        $(this.$el).formRender({formData: formData});
      }else{
        // eslint-disable-next-line no-undef
        const markup = $("<div/>");
        markup.formRender({ formData });

        // eslint-disable-next-line no-undef
        this.html = markup.formRender('html');
      }

    });
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    data: function (newData, oldData) {
      // eslint-disable-next-line no-undef
      if(this.kind === 'render'){
        // eslint-disable-next-line no-undef
        $(this.$el).formRender({formData: newData});
      }else{
        // eslint-disable-next-line no-undef
        const markup = $("<div/>");
        markup.formRender({ newData });

        // eslint-disable-next-line no-undef
        this.html = markup.formRender('html');
      }
    },

  }
}
</script>

<style scoped>

</style>