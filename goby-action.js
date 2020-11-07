$(document).ready(() => {
    $(`.rendered-form button[type='submit']`).click(e => {
        let data = $('.rendered-form :input').serializeArray();
        console.log(data)
    })
})
