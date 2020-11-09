<template>
  <div>
    {{ html }}
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
    const jQuery = global.jQuery;
    let layoutTemplate = {
      label: function (label, data) {
        let a = jQuery('<label class="bright" style="margin-top:15px;" color="red"/>')
            .attr('for', data.id)
            .append(label);
        console.log(data);
        return a;
      },
      h1: function (label, data) {
        let a = jQuery('<h1 class="bright" style="margin-top:15px;color: red" />')
            .attr('for', data.id)
            .append(label);
        console.log(data);
        return a;
      },
    };
    this.$nextTick(function () {
      // eslint-disable-next-line no-undef
      if (this.kind === 'render') {
        // eslint-disable-next-line no-undef
        $(this.$el).formRender({formData: formData, layoutTemplates: layoutTemplate});
      } else {
        // eslint-disable-next-line no-undef
        const markup = $("<div/>");
        markup.formRender({formData: formData, layoutTemplates: layoutTemplate});

        // eslint-disable-next-line no-undef
        this.html = markup.formRender('html',{formData: formData, layoutTemplates: layoutTemplate});
      }

    });
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    data: function (newData, oldData) {
      const jQuery = global.jQuery;
      let layoutTemplate = {
        label: function (label, data) {
          return jQuery('<label class="bright" style="margin-top:15px;" color="red"/>')
              .attr('for', data.id)
              .append(label);
        },
        h1: function (label, data) {
          let a = jQuery('<label class="bright" style="margin-top:15px;color: red" />')
              .attr('for', data.id)
              .append(label);
          console.log(data);
          return a;
        },
      };
      // eslint-disable-next-line no-undef
      if (this.kind === 'render') {
        // eslint-disable-next-line no-undef
        $(this.$el).formRender({formData: newData, layoutTemplates: layoutTemplate});
      } else {
        // eslint-disable-next-line no-undef
        const markup = $("<div/>");
        markup.formRender({formData: newData,layoutTemplates:layoutTemplate});

        // eslint-disable-next-line no-undef
        this.html = markup.formRender('html');
      }
    },

  }
}
</script>

<style scoped>

</style>