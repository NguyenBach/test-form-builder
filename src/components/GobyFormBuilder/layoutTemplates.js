module.exports = function () {
    return {
        label: function (label, data) {
            // eslint-disable-next-line no-undef
            return $('<label class="gb-label"/>')
                .attr('for', data.id)
                .append(label);
        }
    }
}