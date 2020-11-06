<template>
  <div class="hello">
    <img height="100px" alt="Vue logo" src="../assets/index.png">
    <GobyForm @onSave="saveForm" @onGenerate="generateCode"></GobyForm>
    <div class="generateCode" v-if="show">
      <label for="">Link</label>
      <input type="text" :value="link" style="width: 100%">
      <label for="">Script code</label>
      <textarea style="width:100%;height: 100px;margin: 20px" v-model="scriptCode"></textarea>

      <label for="">HTML code</label>
      <textarea style="width:100%;height: 100px; margin: 20px" v-model="htmlCode"></textarea>
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
        htmlCode: ''
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
    }
  },
  created() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
