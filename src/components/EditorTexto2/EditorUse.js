import React, { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'
import 'quill/dist/quill.snow.css'
import './style.css'
import CustomImage from './Image'

const Editor = ({ titulo, texto, setTexto }) => {
  const format = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'style',
    'class',
    'list',
    'indent',
    'size',
    'header',
    'link',
    'image',
    'color',
    'background',
    'clean',
    'width',
    'height'
  ]
  const { quill, quillRef, Quill } = useQuill({
    modules: {
      blotFormatter: {},
      toolbar: false
    },
    readOnly: true,
    formats: format
  })

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter)
    Quill.register('formats/image', CustomImage)
  }

  useEffect(() => {
    if (quill) {
      if (quill.getText().trim().length === 0) {
        console.log('hola')
        quill.setContents(texto)
        // o se se hace con html seria
        // quill.root.innerHTML = texto
      }
    }
  }, [quill, Quill])

  return (
    <div>
      <div ref={quillRef} />
    </div>
  )
}

export default Editor

// END allow image alignment styles
