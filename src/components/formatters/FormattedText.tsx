import * as React from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Spoiler from '../blocks/Spoiler'
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'
import LazyLoadImage from '../blocks/LazyLoadImage'
import Details from '../blocks/Details'

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '100%',
    width: '100%',
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
    '& p': { margin: 0, marginTop: theme.spacing(3) },
    '& em': { color: theme.palette.text.hint },
    '& code': {
      background: theme.palette.background.default,
      padding: theme.spacing(0.25),
      borderRadius: theme.shape.borderRadius,
      wordBreak: 'break-word',
    },
    '& table': {
      overflow: 'auto',
      display: 'block',
      width: '100%',
      borderCollapse: 'collapse',
    },
    '& table td': {
      padding: '6px 12px 9px',
      border: '1px solid ' + theme.palette.text.hint,
      verticalAlign: 'top',
      lineHeight: '1.5',
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
      marginTop: theme.spacing(4)
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
}))

const FormattedText = ({ children, className = '', ...props }) => {
  const classes = useStyles()
  const options: HTMLReactParserOptions = {
    replace: ({ name, children, attribs }): void | React.ReactElement => {
      if (name === 'pre') {
        const firstChild = children[0]
        const language = firstChild.attribs?.class || null
        const data = firstChild.children ? firstChild.children[0].data : firstChild?.data
        
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
        return (
          <LazyLoadImage
            placeholder={
              <img
                src={attribs.src}
                alt={attribs.alt || 'Image'}
                className={classes.img}
              />
            }
            src={attribs['data-src']}
            alt={attribs.alt || 'Image'}
            className={classes.img}
          />
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
        const title: string = children.find(
          (e) => e.name === 'summary'
        ).children[0].data
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler__content'
        ).children

        return <Details title={title}>{domToReact(data)}</Details>
      }
    }
  }

  return (
    <div {...props} className={classes.text + ' ' + className}>
      {parse(children, options)}
    </div>
  )
}

export default FormattedText
