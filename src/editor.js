import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor, Text } from 'slate'
import { withHistory } from 'slate-history'
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
import Fade from './animations/fade'
import Ready from './animations/ready'
import Shake from './animations/shake'
import Gradient from './animations/gradient'
import { get, isEmpty } from 'lodash'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const AnimatedTextEditor = () => {
  const [value, setValue] = useState(initialValue)
  const [buttonState, setButtonState] = useState({})
  // const [animationState, setAnimationState] = useState({})
  const [selectedString, setSelectedString] = useState({})

  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
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
        <MarkButton format='shake'>
          <Shake>Shake</Shake>
        </MarkButton>
        <MarkButton format='fade'>
          <Fade>Fade</Fade>
        </MarkButton>
        <MarkButton
          format='gradient'
          onMouseEnter={() => {
            setButtonState({ gradient: 'visible' })
          }}
          onMouseLeave={() => {
            setButtonState({ gradient: 'hidden' })
          }}
        >
          <Gradient vairant={get(buttonState, 'gradient', 'hidden')}>
            Gradient
          </Gradient>
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

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, {})
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

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.ready) {
    children = <Ready {...leaf.ready}>{children}</Ready>
  }

  if (leaf.shake) {
    children = <Shake {...leaf.shake}>{children}</Shake>
  }

  if (leaf.fade) {
    children = <Fade {...leaf.fade}>{children}</Fade>
  }

  if (leaf.gradient) {
    children = <Gradient {...leaf.gradient}>{leaf.text}</Gradient>
  }

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

const MarkButton = ({ format, children, onMouseEnter, onMouseLeave }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{children}</Icon>
    </Button>
  )
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: `So are you happy now?
Finally happy now are you?
뭐 그대로야 난
다 잃어버린 것 같아
모든 게 맘대로 왔다가 인사도 없이`
      },
      { text: `떠나`, fade: true },
      {
        text: `
이대로는 무엇도 사랑하고 싶지 않아
다 해질 대로 해져버린
기억 속을 여행해
우리는 오렌지 태양 아래
그림자 없이 함께 춤을 춰
정해진 이별 따위는 없어
아름다웠던 그 기억에서 만나
Forever young
`
      },
      {
        text: `우우우 우우우우 우우우 우우우우
`,
        gradient: {}
      },
      {
        text: `Forever we young
`
      },
      {
        text: `우우우 우우우우
`,
        gradient: {}
      },
      {
        text: `
이런 악몽이라면 영영 깨지 않을게
섬 그래 여긴 섬 서로가 만든 작은 섬
예 음 forever young 영원이란 말은 모래성
작별은 마치 재난문자 같지
그리움과 같이 맞이하는 아침
서로가 이 영겁을 지나
꼭 이 섬에서 다시 만나
지나듯 날 위로하던 누구의 말대로 고작
한 뼘짜리 추억을 잊는 게 참 쉽지 않아
시간이 지나도 여전히
날 붙드는 그곳에
우리는 오렌지 태양 아래
그림자 없이 함께 춤을 춰
정해진 안녕 따위는 없어
아름다웠던 그 기억에서 만나
우리는 서로를 베고 누워
슬프지 않은 이야기를 나눠
우울한 결말 따위는 없어
난 영원히 널 이 기억에서 만나
Forever young
`
      },
      {
        text: `우우우 우우우우 우우우 우우우우
`,
        gradient: {}
      },
      {
        text: `Forever we young
`
      },
      {
        text: `우우우 우우우우 우우우 우우우우
`,
        gradient: {}
      },
      {
        text: `이런 악몽이라면 영영 깨지 않을게`
      }
    ]
  }
]

export default AnimatedTextEditor
