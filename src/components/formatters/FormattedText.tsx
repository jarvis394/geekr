import * as React from 'react'
import { makeStyles, fade, useTheme } from '@material-ui/core/styles'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Spoiler from '../blocks/Spoiler'
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'
import LazyLoadImage from '../blocks/LazyLoadImage'
import Details from '../blocks/Details'
import Iframe from 'react-iframe'
import { Node as MathJaxNode } from '@nteract/mathjax'

type FloatType = 'left' | 'right'
interface IframeResizeData {
  type: string
  id: number
  height: number
}

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: 'auto',
  },
  text: {
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
    '& a:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
    '& p': { margin: 0, marginTop: (d) => (d ? 0 : theme.spacing(3)) },
    '& em': { color: theme.palette.text.hint },
    '& code': {
      background: theme.palette.background.default,
      padding: theme.spacing(0.25),
      borderRadius: theme.shape.borderRadius,
      wordBreak: 'break-word',
    },
    '& div.scrollable-table': {
      overflow: 'auto',
    },
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
    },
    '& table td': {
      padding: '6px 12px 9px',
      border: '1px solid ' + theme.palette.text.hint,
      verticalAlign: 'top',
      lineHeight: '1.5',
      minWidth: 100,
    },
    '& h1, h2, h3, h4, h5, h6': {
      margin: theme.spacing(2) + 'px 0 0 0',
    },
    '& blockquote': {
      margin: '12px 0',
      padding: '0 12px',
      display: 'block',
      borderLeft: '2px solid ' + theme.palette.primary.light,
      color: fade(theme.palette.text.primary, 0.9),
      fontStyle: 'italic',
    },
    '& hr': {
      border: 'none',
      borderBottom: '1px solid ' + theme.palette.divider,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      maxWidth: 256,
    },
    '& figure': {
      margin: 0,
      marginTop: theme.spacing(4),
      '& figcaption': {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.body2.fontSize,
        textAlign: 'center',
        marginTop: theme.spacing(1),
        lineHeight: '18px',
      },
    },
    // MathJaxNode overflow fix
    '& span.mjx-chtml': {
      whiteSpace: 'normal',
    },
  },
  syntaxHighlighter: {
    margin: 0,
    display: 'block',
    tabSize: 4,
    overflow: 'auto',
    border: '1px solid ' + theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2) + 'px !important',
    background: theme.palette.background.default + ' !important',
    color: theme.palette.text.primary + ' !important',
  },
  iframe: {
    width: '100%',
    minWidth: '100%',
  },
}))

const FormattedText = ({
  children,
  className = '',
  disableParagraphMargin = false,
  ...props
}) => {
  const classes = useStyles(disableParagraphMargin)
  const [iframeHeights, setIframeHeights] = React.useState<
    Record<string, number>
  >({})
  const theme = useTheme()
  const options: HTMLReactParserOptions = {
    replace: ({ name, children, attribs }): void | React.ReactElement => {
      if (name === 'pre') {
        const firstChild = children[0]
        const language = firstChild.attribs?.class || null
        const data = firstChild.children
          ? firstChild.children[0].data
          : firstChild?.data

        return (
          <SyntaxHighlighter
            style={style}
            language={language}
            className={classes.syntaxHighlighter}
          >
            {data}
          </SyntaxHighlighter>
        )
      }
      if (name === 'img') {
        if (attribs['data-tex']) {
          const formula = attribs['alt'].slice(1, attribs['alt'].length - 1)
          return (
            <MathJaxNode inline={attribs['data-tex'] === 'inline'}>
              {formula}
            </MathJaxNode>
          )
        }

        const imgStyles = {
          float: (attribs.align || 'none') as FloatType,
          marginRight: attribs.align === 'left' ? theme.spacing(2) : 0,
          marginLeft: attribs.align === 'right' ? theme.spacing(2) : 0,
          marginBottom: attribs.align ? theme.spacing(1) : 0,
          maxWidth: attribs.align ? '40%' : '100%',
          width: attribs['data-width'] || 'auto',
        }

        return (
          <LazyLoadImage
            placeholder={
              <img
                src={attribs.src}
                alt={attribs.alt || 'Image'}
                style={imgStyles}
                className={classes.img}
              />
            }
            // First try to load src from 'data-src' attribute
            // If not found, then use default 'src' attribute
            src={attribs['data-src'] || attribs.src}
            alt={attribs.alt || 'Image'}
            style={imgStyles}
            className={classes.img}
          />
        )
      }
      if (name === 'div' && attribs.class === 'tm-iframe_temp') {
        return (
          <Iframe
            frameBorder={0}
            allowFullScreen={true}
            className={classes.iframe}
            url={attribs['data-src']}
            height={iframeHeights[attribs.id]?.toString() || 'auto'}
            id={attribs.id}
          ></Iframe>
        )
      }
      if (name === 'div' && attribs.class === 'spoiler') {
        const title: string = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler_title'
        ).children[0].data
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler_text'
        ).children

        return <Spoiler title={title}>{domToReact(data)}</Spoiler>
      }
      if (name === 'details' && attribs.class === 'spoiler') {
        const title: string = children.find((e) => e.name === 'summary')
          .children[0].data
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler__content'
        ).children

        return <Details title={title}>{domToReact(data)}</Details>
      }
    },
  }

  React.useEffect(() => {
    const handler = (e: MessageEvent<IframeResizeData>) => {
      e.data.type === 'embed-size' &&
        setIframeHeights((prev) => ({
          ...prev,
          [e.data.id]: e.data.height || 'auto',
        }))
    }
    window.addEventListener('message', handler)
    return () => {
      // Remove listener on cleanup
      window.removeEventListener('message', handler)
    }
  }, [])

  return (
    <div {...props} className={classes.text + ' ' + className}>
      {parse(children, options)}
    </div>
  )
}

export default FormattedText
