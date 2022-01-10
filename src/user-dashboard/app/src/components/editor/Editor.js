import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import boldIcon from './SVG/bold-solid.svg';
import italicIcon from './SVG/italic-solid.svg';
import strikeIcon from './SVG/strikethrough-solid.svg';
import paragraphIcon from './SVG/paragraph-solid.svg';
import bulletListIcon from './SVG/list-ul-solid.svg';
import orderedListIcon from './SVG/list-ol-solid.svg';
import codeIcon from './SVG/code-solid.svg';

const MenuBar = ( { editor, onChange } ) => {
	if ( ! editor ) {
		return null;
	}

	let html = editor.getHTML();
	useEffect( () => {
		onChange( html );
	}, [ html ] );

	return (
		<>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleBold().run();
				} }
				className={ editor.isActive( 'bold' ) ? 'is-active' : '' }
			>
				<img src={ boldIcon } />
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleItalic().run();
				} }
				className={ editor.isActive( 'italic' ) ? 'is-active' : '' }
			>
				<img src={ italicIcon } />
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleStrike().run();
				} }
				className={ editor.isActive( 'strike' ) ? 'is-active' : '' }
			>
				<img src={ strikeIcon } />
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().setParagraph().run();
				} }
				className={ editor.isActive( 'paragraph' ) ? 'is-active' : '' }
			>
				<img src={ paragraphIcon } />
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleHeading( { level: 1 } ).run();
				} }
				className={
					editor.isActive( 'heading', { level: 1 } )
						? 'is-active'
						: ''
				}
			>
				H1
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleHeading( { level: 2 } ).run();
				} }
				className={
					editor.isActive( 'heading', { level: 2 } )
						? 'is-active'
						: ''
				}
			>
				H2
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleBulletList().run();
				} }
				className={ editor.isActive( 'bulletList' ) ? 'is-active' : '' }
			>
				<img src={ bulletListIcon } />
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleOrderedList().run();
				} }
				className={
					editor.isActive( 'orderedList' ) ? 'is-active' : ''
				}
			>
				<img src={ orderedListIcon } />
			</button>
			<button
				onClick={ ( e ) => {
					e.preventDefault();
					editor.chain().focus().toggleCodeBlock().run();
				} }
				className={ editor.isActive( 'codeBlock' ) ? 'is-active' : '' }
			>
				<img src={ codeIcon } />
			</button>
		</>
	);
};

export default ( { onChange } ) => {
	const editor = useEditor( {
		extensions: [ StarterKit ],
		content: ``,
	} );

	return (
		<div className="helpdesk-editor">
			<MenuBar editor={ editor } onChange={ onChange } />
			<EditorContent editor={ editor } />
		</div>
	);
};
