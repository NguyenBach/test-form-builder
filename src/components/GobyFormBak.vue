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

import GobyRender from "@/components/GobyRenderBak";

export default {
  name: "GobyForm",
  components: {GobyRender},
  props: ['fields'],

  data() {
    return {
      formData: null,
      type: 'render'
    }
  },
  methods: {
    generate() {
      this.$emit('onGenerate');
    }
  },
  mounted() {
    this.$nextTick(function () {
      const vm = this;
      const jQuery = global.jQuery;
      let templates = {
        button: function (fieldData) {
          return {
            onRender: function () {
              fieldData.className += 'test'
              return fieldData
            }
          };
        }
      };
      let layoutTemplate = {
        label: function (label, data) {
          return jQuery('<label class="bright" style="margin-top:15px;" />')
              .attr('for', data.id)
              .append(label);
        }
      };
      let options = {
        disableFields: [
          "autocomplete",
          'checkbox-group',
          'date',
          'file',
          'hidden',
          'number',
          'radio-group',
          'select',
          'text',
          'textarea',
          'starRating'
        ],
        disabledAttrs: ['name'],
        subtypes: {
          text: ['email', 'tel']
        },
        fields: this.fields,
        templates: templates,
        onSave: function (evt, formData) {
          vm.$emit('onSave', formData)
          vm.$emit('onGenerate');
        },
        onAddField: function (id, data) {
          data.name = vm.stringToSlug(data.label);
          return data;
        },
        layoutTemplates: layoutTemplate,
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
          },
          {
            id: 'add_fields',
            className: 'btn btn-danger',
            label: 'New Field',
            type: 'button',
            events: {
              click: addFields
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

      function addFields() {
        let data = formBuilder.actions.getData();
        let button = data.find(el => el.type === 'button');
        button.className += 'abcd';
        formBuilder.actions.setData(data);
      }
    });
  }
}
</script>

<style scoped>

</style>