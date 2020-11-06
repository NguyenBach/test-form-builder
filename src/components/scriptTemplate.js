module.exports = (formId) => {
    return `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
          <div id="fb-render" data-formId="${formId}"></div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
          <script src="https://formbuilder.online/assets/js/form-render.min.js"></script>
          <script src="goby-render.js"></script>`
}