import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { get, isEmpty, keys, contains } from 'lodash'
import { useAnimation } from 'framer-motion'
import {
  Bold,
  Italic,
  Underline,
  Quote,
  ListNumber,
  ListBullet
} from '@styled-icons/foundation'
import { Heading } from '@styled-icons/boxicons-regular/Heading'
import { Button, Icon, Toolbar } from './components'
import {
  Fade,
  Ready,
  Shake,
  Gradient,
  Love,
  Shine,
  Kung,
  Chuck,
  Dung
} from './animations'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const AnimatedTextEditor = ({
  getMarkMeta,
  selectVariant,
  initialValue,
  onEditorReady
}) => {
  const [value, setValue] = useState(initialValue)
  const [buttonState, setButtonState] = useState({})
  // const [animationState, setAnimationState] = useState({})
  const [selectedString, setSelectedString] = useState({})

  // Animation Controller
  // const animationControl = useAnimation()
  // onEditorReady && onEditorReady(animationControl)

  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback(
    (props) => <Leaf {...props} selectVariant={selectVariant} />,
    [selectVariant]
  )
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar>
        <MarkButton format='bold'>
          <Bold size='48' />
        </MarkButton>
        <MarkButton format='italic'>
          <Italic size='48' />
        </MarkButton>
        <MarkButton format='underline'>
          <Underline size='48' />
        </MarkButton>
        <BlockButton format='heading-one'>
          <Heading size='48' />
        </BlockButton>
        <BlockButton format='heading-two'>
          <Heading size='38' />
        </BlockButton>
        <BlockButton format='block-quote'>
          <Quote size='48' />
        </BlockButton>
        <BlockButton format='numbered-list'>
          <ListNumber size='48' />
        </BlockButton>
        <BlockButton format='bulleted-list'>
          <ListBullet size='48' />
        </BlockButton>
        <MarkButton getMarkMeta={getMarkMeta} format='kung'>
          <Kung>Kung</Kung>
        </MarkButton>
        <MarkButton format='fade'>
          <Fade>Fade</Fade>
        </MarkButton>
        <ActiveMark
          selectedString={selectedString}
          setSelectedString={setSelectedString}
        />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder='Enter some rich text…'
        spellCheck
        // autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
        onSelectCapture={() => {
          setSelectedString({
            selection: editor.selection,
            marks: Editor.marks(editor)
          })
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format, meta) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, meta)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format
  })

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === {} : false
}

const ActiveMark = ({ selectedString }) => {
  const editor = useSlate()
  const { selection } = selectedString
  if (isEmpty(selection)) return null
  const [{ children }] = Editor.fragment(editor, selection)
  if (isEmpty(children)) return null

  const { text, ...marks } = children[0]

  console.log(marks)
  // TODO get schema from map
  return null
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf, selectVariant }) => {
  ;[Fade, Ready, Shake, Gradient, Love, Shine, Kung, Chuck, Dung].forEach(
    (Tag) => {
      if (keys(leaf).includes(Tag.displayName.toLowerCase())) {
        children = (
          <Tag
            selectVariant={selectVariant}
            meta={leaf[Tag.displayName.toLowerCase()]}
          >
            {children}
          </Tag>
        )
      }
    }
  )

  if (leaf.bold) {
    children = <b>{children}</b>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, children }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{children}</Icon>
    </Button>
  )
}

const MarkButton = ({
  format,
  children,
  onMouseEnter,
  onMouseLeave,
  getMarkMeta = () => ({})
}) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format, getMarkMeta())
      }}
    >
      <Icon>{children}</Icon>
    </Button>
  )
}

export default AnimatedTextEditor
