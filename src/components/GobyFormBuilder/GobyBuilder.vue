/* eslint-disable */
<template>
  <div id="fb-editor" ref="fb">

  </div>
</template>

<script>
import layoutTemplates from './layoutTemplates'

export default {
  name: "GobyBuilder",
  components: {},
  props: ['fields'],
  data() {
    return {
      formBuilder: null
    }
  },
  methods: {
    stringToSlug(str) {
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      let from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      let to = "aaaaaaeeeeiiiioooouuuunc------";

      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str
          .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
          .replace(/\s+/g, "-") // collapse whitespace and replace by -
          .replace(/-+/g, "-"); // collapse dashes

      return str;
    },
    template() {
      return {
        button: (fieldData) => {
          return {
            field: '<span id="' + fieldData.name + '">',
            onRender: function () {
              console.log(1234124)
              fieldData.className += 'test'
              return fieldData
            }
          };
        }
      };
    },
    onSave(e, formData) {
      console.log(formData)
      // this.$emit('onSave', formData)
      // this.$emit('onGenerate');
    },
    onAddField(id, data) {
      data.name = this.stringToSlug(data.label);
      return data;
    },
    onChange() {
      let formData = this.formBuilder.actions.getData();
      this.$emit('onFormChange', formData)
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.$nextTick(function () {
      const vm = this;
      let options = {
        controlOrder: [
          'header',
          'paragraph',
          'button'
        ],
        disableFields: ["autocomplete", 'checkbox-group', 'date', 'file', 'hidden', 'number', 'radio-group',
          'select', 'text', 'textarea', 'starRating'],
        disabledAttrs: ['name', 'access'],
        subtypes: {
          text: ['email', 'tel']
        },
        fields: vm.fields,
        onSave: vm.onSave,
        onAddField: vm.onAddField,
        onCloseFieldEdit: vm.onChange,
        layoutTemplates: layoutTemplates(),
        controlPosition: 'left',
        typeUserAttrs: {
          text: {
            row: {
              label: "Row",
              value: 1
            }
          },
          header: {
            className: {
              label: 'ClassName',
              value: 'gb-header'
            },
            style: {
              label: 'Style',
              value: 'color:red'
            }
          }
        },
        actionButtons: [
          // {
          //   id: 'preview',
          //   className: 'btn btn-success',
          //   label: 'Preview',
          //   type: 'button',
          //   events: {
          //     click: showPreview
          //   }
          // },
          // {
          //   id: 'preview_html',
          //   className: 'btn btn-warning',
          //   label: 'Preview HTML',
          //   type: 'button',
          //   events: {
          //     click: showPreviewHtml
          //   }
          // },
          // {
          //   id: 'add_fields',
          //   className: 'btn btn-danger',
          //   label: 'New Field',
          //   type: 'button',
          //   events: {
          //     click: addFields
          //   }
          // }
        ]
      };
      // eslint-disable-next-line no-undef
      vm.formBuilder = $(this.$el).formBuilder(options);
      // eslint-disable-next-line no-undef
      document.addEventListener('fieldRemoved ', function () {
        // eslint-disable-next-line no-undef
        setTimeout(vm.onChange, 300)
      });
      document.addEventListener('fieldAdded', function () {
        // eslint-disable-next-line no-undef
        setTimeout(vm.onChange, 300)
      });

      // function showPreview() {
      //   vm.formData = formBuilder.actions.getData();
      //   console.log(vm.formData)
      //   // vm.type = 'render'
      //   // vm.$bvModal.show('modal-1')
      // }
      //
      // function showPreviewHtml() {
      //   vm.formData = formBuilder.actions.getData();
      //   vm.type = 'html'
      //   vm.$bvModal.show('modal-1')
      // }
      //
      // function addFields() {
      //   let data = formBuilder.actions.getData();
      //   let button = data.find(el => el.type === 'button');
      //   button.className += 'abcd';
      //   formBuilder.actions.setData(data);
      // }
    });
  }
}
</script>

<style scoped>

</style>