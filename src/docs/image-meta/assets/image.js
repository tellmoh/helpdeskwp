(($) => {
    const Image = () => {
        const upload = $('#image_upload');
        const remove = $('#image_remove');

        upload.on('click', () => {
            wp.media.editor.send.attachment = (props, attachment) => {
                $('#cat_image_id').val(attachment.id);
                $('#cat-image').html('<img src="" />');
                $('#cat-image img').attr('src', attachment.url);
            }
            wp.media.editor.open(upload);
        });

        remove.on('click', () => {
            $('#cat_image_id').val('');
            $('#cat-image').html('');
        });
    }

    $(window).on('load', () => Image())
})(jQuery)
