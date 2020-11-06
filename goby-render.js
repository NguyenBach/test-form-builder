$(document).ready(() => {
    let formData = []
    fetch('http://localhost/test-form-builder/test.php?form_id=' + $('#fb-render').data('formid'))
        .then(response => response.json())
        .then(data => {
            formData = data.data
            $('#fb-render').formRender({
                formData: formData
            });
        })

    $(`.rendered-form button[type='submit']`).click(e => {
        let data = $('.rendered-form :input').serializeArray();
        console.log(data)
    })
})
