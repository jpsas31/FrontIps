import React, { useEffect } from 'react'
import { useQuill } from 'react-quilljs'
import BlotFormatter from 'quill-blot-formatter'
import 'quill/dist/quill.snow.css'
import './style.css'
import CustomImage from './Image'

const Editor = ({ titulo, texto, setTexto }) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image'],
    [{ color: [] }, { background: [] }],

    ['clean']
  ]
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
      toolbar: toolbarOptions
    },
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

      quill.on('text-change', (delta, oldContents) => {
        const currrentContents = quill.getContents()

        setTexto(quill.root.innerHTML) // o si se hace con el delta seria setTexto(currentContents)
      })
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
