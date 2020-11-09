<template>
  <div class="row">
    <div class="col-md-8">
      <b-tabs content-class="mt-3">
        <b-tab title="Form Builder" active>
          <GobyBuilder :fields="fields" :form-data="formData"
                       @onFormChange="formChange"></GobyBuilder>
        </b-tab>
        <b-tab title="Style">
          <GobyStyle></GobyStyle>
        </b-tab>
      </b-tabs>

    </div>
    <div class="col-md-4">
      <GobyRenderer :form-data="renderFormData"></GobyRenderer>
    </div>
  </div>
</template>

<script>
import GobyBuilder from "@/components/GobyFormBuilder/GobyBuilder";
import GobyRenderer from "@/components/GobyFormBuilder/GobyRenderer";
import GobyStyle from "@/components/GobyFormBuilder/GobyStyle";

export default {
  name: "Builder",
  components: {GobyStyle, GobyRenderer, GobyBuilder},
  data() {
    return {
      formData: null,
      renderFormData: null,
      fields: []
    }
  },
  methods: {
    formChange(data) {
      this.renderFormData = data;
    },
    makeFormFields(serverFields) {
      let fields = [];
      for (let field of serverFields) {
        fields.push({
          subtype: field.type,
          label: field.name,
          className: 'form-control ',
          name: field.content_tag,
          values: this.makeValues(field.additional_data),
          type: 'text',
          required: field.is_required == 1 ? 'required' : false
        });
      }
      return fields;
    },
    makeValues(fieldValues) {
      if (!fieldValues) {
        return [];
      }
      let value = [];
      for (let field of fieldValues) {
        value.push({
          label: field.value,
          value: field.key,
          selected: false
        })
      }
      return value;
    },
  },
  created() {
    let fields = [
      {
        "id": "1",
        "list_id": "1",
        "name": "Email",
        "content_tag": "email",
        "type": "email",
        "is_required": "1",
        "is_default": "1",
        "is_visible": "0",
        "default_value": null,
        "additional_data": null,
      },
      {
        "id": "2",
        "list_id": "1",
        "name": "Registration ID",
        "content_tag": "registration_id",
        "type": "text",
        "is_required": "0",
        "is_default": "1",
        "is_visible": "0",
        "default_value": null,
        "additional_data": null,
      },
      {
        "id": "3",
        "list_id": "1",
        "name": "Phone Number",
        "content_tag": "phone_number",
        "type": "phone",
        "is_required": "0",
        "is_default": "1",
        "is_visible": "0",
        "default_value": null,
        "additional_data": null,
      }
    ]
    this.fields = this.makeFormFields(fields)
  }
}
</script>

<style scoped>

</style>