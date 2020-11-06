<template>
  <div class="hello">
    <GobyForm @onSave="saveForm"></GobyForm>
    <GobyRender :data="this.formData"/>
  </div>
</template>

<script>
import GobyForm from "@/components/GobyForm";
import GobyRender from "@/components/GobyRender";

export default {
  name: 'HelloWorld',
  components: {
    GobyRender,
    GobyForm,
  },
  data: () => (
      {
        formData: null
      }
  ),
  methods: {
    saveForm(formData) {
      this.formData = JSON.parse(formData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
