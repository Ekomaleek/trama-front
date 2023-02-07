import React, { useState, useEffect } from 'react'
import { ReactQuillProps } from 'react-quill'
import dynamic from 'next/dynamic'
import defaultTheme from '@chakra-ui/theme'

import { Button, Box } from '@chakra-ui/react'

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
})

type TextEditorProps = {
  theme?: string
  value: string
  onChange?: ReactQuillProps['onChange']
  placeholder?: string
  readOnly?: boolean
  fullscreenEnabled?: boolean
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link'],
    ['clean'],
  ],
}

const TextEditor = ({
  theme = 'snow',
  value,
  onChange = () => {},
  placeholder,
  readOnly = false,
  fullscreenEnabled = true,
}: TextEditorProps): JSX.Element => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const editorFullscreenStyles: ReactQuillProps['style'] = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: defaultTheme.zIndices.toast,
    backgroundColor: defaultTheme.colors.black,
  }

  const buttonFullscreenStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex: defaultTheme.zIndices.tooltip,
    transform: 'translateX(-50%)',
    bottom: '10px',
    left: '50%',
  }

  const handleFullscreen = (): void => {
    setIsFullscreen(isFullscreen => !isFullscreen)
  }

  // This is to prevent the editor from losing
  // focus when clicking on fullscreen button
  const preventDefault = (event: any): void => {
    event.preventDefault()
  }

  useEffect(() => {
    const keyUpHandler = (event: KeyboardEvent): void => {
      event.key === 'Escape' &&
      setIsFullscreen(false)
    }

    window.addEventListener('keyup', keyUpHandler)
    return () => window.removeEventListener('keyup', keyUpHandler)
  }, [])

  return (
    <>
      <ReactQuill
        theme={theme}
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        readOnly={readOnly}
        style={isFullscreen ? editorFullscreenStyles : {}}
      />

      {
        fullscreenEnabled &&
        <Box pt='2' textAlign='center'>
          <Button
            id='fullscreen'
            type='button'
            size='sm'
            onClick={handleFullscreen}
            onMouseDown={preventDefault}
            onTouchStart={preventDefault}
            transition='none'
            style={isFullscreen ? buttonFullscreenStyles : {}}
          >
            {isFullscreen ? 'Sair da tela cheia' : 'Editor em tela cheia'}
          </Button>
        </Box>
      }
    </>
  )
}

export default TextEditor
