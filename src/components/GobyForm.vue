<template>
  <div>
    <div id="fb-editor" ref="fb">

    </div>
    <button class="btn btn-danger" type="button" @click="generate">Generate Code</button>
    <b-modal id="modal-1" title="BootstrapVue">
      <GobyRender :kind="type" :data="formData"></GobyRender>
    </b-modal>
  </div>

</template>

<script>

import GobyRender from "@/components/GobyRender";

export default {
  name: "GobyForm",
  components: {GobyRender},

  data() {
    return {
      formData: null,
      type: 'render'
    }
  },
  methods: {
    stringToSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to = "aaaaaaeeeeiiiioooouuuunc------";

      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
          .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
          .replace(/\s+/g, "-") // collapse whitespace and replace by -
          .replace(/-+/g, "-"); // collapse dashes

      return str;
    },
    generate() {
      this.$emit('onGenerate');
    }
  },
  mounted() {
    this.$nextTick(function () {
      const vm = this;
      let options = {
        onSave: function (evt, formData) {
          vm.$emit('onSave', formData)
          vm.$emit('onGenerate');
        },
        onAddField: function (id, data) {
          data.name = vm.stringToSlug(data.label);
          return data;
        },
        actionButtons: [
          {
            id: 'preview',
            className: 'btn btn-success',
            label: 'Preview',
            type: 'button',
            events: {
              click: showPreview
            }
          },
          {
            id: 'preview_html',
            className: 'btn btn-warning',
            label: 'Preview HTML',
            type: 'button',
            events: {
              click: showPreviewHtml
            }
          }
        ]
      };
      // eslint-disable-next-line no-undef
      let formBuilder = $(this.$el).formBuilder(options);

      function showPreview() {
        vm.formData = formBuilder.actions.getData();
        vm.type = 'render'
        vm.$bvModal.show('modal-1')
      }

      function showPreviewHtml() {
        vm.formData = formBuilder.actions.getData();
        vm.type = 'html'
        vm.$bvModal.show('modal-1')
      }
    });
  }
}
</script>

<style scoped>

</style>