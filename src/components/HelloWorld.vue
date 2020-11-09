<template>
  <div class="hello" style="width: 70%; border: 2px solid black;margin: 20px auto;padding: 20px">
    <img height="100px" alt="Vue logo" src="../assets/index.png">
    <GobyForm :fields="fields" @onSave="saveForm" @onGenerate="generateCode"></GobyForm>
    <div class="generateCode" v-if="show">
      <label for="">Link</label>
      <input type="text" :value="link" style="width: 100%">
      <label for="">Script code</label>
      <textarea style="width:100%;height: 100px;margin: 20px 0" v-model="scriptCode"></textarea>

      <label for="">HTML code</label>
      <textarea style="width:100%;height: 100px; margin: 20px 0" v-model="htmlCode"></textarea>
    </div>
  </div>
</template>

<script>
import GobyForm from "@/components/GobyForm";
import template from './scriptTemplate'
import htmlTemplate from './htmlTemplate'

export default {
  name: 'HelloWorld',
  components: {
    GobyForm,
  },
  data: () => (
      {
        formData: null,
        formId: 0,
        show: false,
        link: '',
        scriptCode: '',
        htmlCode: '',
        fields: []
      }
  ),
  methods: {
    saveForm(formData) {
      let data = new FormData();
      let id = (new Date()).getTime();
      this.formId = id;
      this.formData = formData;
      data.append('form_id', id);
      data.append('form_data', formData);
      fetch('http://gxdangian.com/test.php', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        body: data
      }).then(response => response.json()).then(data => {
        console.log(data)
      })
    },
    generateCode() {
      this.show = true;
      this.link = 'http://gxdangian.com/#/view/' + this.formId;
      this.scriptCode = template(this.formId);
      // eslint-disable-next-line no-undef
      const markup = $("<div/>");
      markup.formRender({formData: this.formData});
      // eslint-disable-next-line no-undef
      let html = markup.formRender('html');
      console.log(this.formData)
      this.htmlCode = htmlTemplate(html);
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
    makeFormFields(serverFields) {
      let fields = [];
      for (let field of serverFields) {
        fields.push({
          subtype: field.type,
          label: field.name,
          className: 'form-control',
          name: field.content_tag,
          values: this.makeValues(field.additional_data),
          attrs:{
            type: 'text'
          }
        });
      }
      return fields;
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
