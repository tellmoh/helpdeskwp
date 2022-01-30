( ( $ ) => {
	const helpdeskDocs = () => {
		const input = $( '.helpdesk-search input[type="text"]' )
		const result = $( '.helpdesk-search-result' )

		input.on(
            'focus',
            (e) => {
                result.fadeIn( '200' )
			}
		)

		input.on(
            'focusout',
            (e) => {
				result.fadeOut( '400' )
			}
		)

		input.on(
            'keydown',
            (e) => {
                const key = e.target.value
				const url = `${ helpdesk_docs.url }wp/v2/search?search=${ key }&subtype=documentation&per_page=30`
				result.html( '' )

                $.ajax(
					{
						method: 'GET',
						url: url,
						success: ( res ) => {
							res && res.map((res) => {
								const link = $('<a href="' + res.url + '">' + res.title + '</a>')
								result.append(link)
							})
						},
						error: ( err ) => {
                            console.log(err)
						}
					}
				)
			}
		)
	}

	$( window ).on( 'load', () => helpdeskDocs() )
} )( jQuery )
