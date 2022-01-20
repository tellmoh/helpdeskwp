( ( $ ) => {
	const helpdeskRegister = () => {
		const form = $( '.helpdeskwp-register-form' )

		form.on(
            'submit',
            (e) => {
                e.preventDefault()

                const firstName = $( '#help-first' ).val()
                const lastName  = $( '#help-last' ).val()
                const email     = $( '#help-email' ).val()
                const username  = $( '#help-username' ).val()
                const password  = $( '#help-password' ).val()
                const msg       = $( '#helpdesk-err-msg' )

                $.ajax(
					{
						method: 'POST',
						url: user_dashboard.ajaxurl,
						data: {
							'action': 'helpdesk_register',
                            'firstName': firstName,
                            'lastName': lastName,
                            'email': email,
                            'username': username,
                            'password': password,
							'nonce': user_dashboard.nonce
						},
						success: () => {
                            window.location.reload()
						},
						error: ( err ) => {
							if ( err.responseJSON ) {
                                msg.html(err.responseJSON)
                            }
                            console.log(err)
						}
					}
				)
			}
		)
	}

	$( window ).on( 'load', () => helpdeskRegister() )
} )( jQuery )
