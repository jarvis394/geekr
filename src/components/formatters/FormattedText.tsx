import * as React from 'react'
import {
  makeStyles,
  fade,
  useTheme,
  darken,
  lighten,
  Theme,
} from '@material-ui/core/styles'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Spoiler from '../blocks/Spoiler'
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'
import LazyLoadImage from '../blocks/LazyLoadImage'
import Details from '../blocks/Details'
import Iframe from 'react-iframe'
import { Node as MathJaxNode } from '@nteract/mathjax'
import getInvertedContrastPaperColor from 'src/utils/getInvertedContrastPaperColor'
import isDarkTheme from 'src/utils/isDarkTheme'
import { APP_BAR_HEIGHT } from 'src/config/constants'
import { useSelector } from 'src/hooks'
import { UserSettings } from 'src/interfaces'

type FloatType = 'left' | 'right'
interface IframeResizeData {
  type: string
  id: number
  height: number
}

const useStyles = makeStyles<Theme, {
  disableParagraphMargin: boolean
  readerSettings: UserSettings['readerSettings']
}>((theme) => ({
  img: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: 'auto',
    borderRadius: 4,
  },
  text: {
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '-webkit-tap-highlight-color': 'transparent !important',
    },
    '& a:hover': {
      color: fade(theme.palette.primary.main, 0.8),
      textDecoration: 'underline',
    },
    '& h1+p, h2+p, h3+p, h4+p': {
      marginTop: ({ disableParagraphMargin: d }) => (d ? 0 : theme.spacing(1.5)),
    },
    '& p': {
      margin: 0,
      fontSize: ({ readerSettings }) => readerSettings.fontSize,
      fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
    },
    '& p+p': { marginTop: ({ disableParagraphMargin: d }) => (d ? 0 : theme.spacing(3)) },
    '& em': { color: fade(theme.palette.text.primary, 0.75) },
    '& code': {
      background: getInvertedContrastPaperColor(theme),
      padding: theme.spacing(0.25),
      borderRadius: theme.shape.borderRadius,
      wordBreak: 'break-word',
    },
    '& div.table, div.scrollable-table': {
      overflow: 'auto',
      marginTop: theme.spacing(2),
      wordBreak: 'normal',
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
    '& table th': {
      padding: '6px 12px 9px',
      border: '1px solid ' + theme.palette.text.hint,
      verticalAlign: 'top',
      lineHeight: '1.5',
      minWidth: 100,
    },
    '& h1, h2, h3': {
      fontSize: 24,
      lineHeight: '30px',
    },
    '& h4, h5, h6': {
      fontSize: 20,
      lineHeight: '26px',
    },
    '& h1, h2, h3, h4, h5, h6': {
      margin: `${theme.spacing(4)}px 0 0 0`,
      fontFamily: 'Google Sans',
      fontWeight: 800,
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
      margin: theme.spacing(1, 2),
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
    '& figure.float': {
      float: 'left',
      maxWidth: '50%',
      marginRight: theme.spacing(4),
    },
    '& figure+p': {
      marginTop: theme.spacing(4),
    },
    '& figure.float+p:after': {
      content: '""',
      display: 'block',
      clear: 'both',
    },
    '& sup': {
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(1),
      fontSize: 14,
      display: 'block',
    },
    // MathJaxNode overflow fix
    '& span.mjx-chtml': {
      whiteSpace: 'normal',
    },
  },
  syntaxHighlighter: {
    margin: 0,
    marginTop: theme.spacing(2),
    display: 'block',
    tabSize: 4,
    overflow: 'auto',
    border: '1px solid ' + theme.palette.divider,
    borderRadius: 4,
    padding: theme.spacing(2) + 'px !important',
    background: getInvertedContrastPaperColor(theme) + ' !important',
    color: theme.palette.text.primary + ' !important',
    boxSizing: 'border-box',
    '-moz-tab-size': 4,
    whiteSpace: 'normal',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    '& code': {
      whiteSpace: 'normal !important',
      fontSize: 14,
    },
    '&::-webkit-scrollbar': {
      height: 12,
      background: theme.palette.background.default,
      borderRadius: 2,
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDarkTheme(theme)
        ? lighten(theme.palette.background.paper, 0.08)
        : darken(theme.palette.background.paper, 0.08),
      borderRadius: 2,
      transition: '0.1s',
      '&:hover': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.1)
          : darken(theme.palette.background.paper, 0.1),
      },
      '&:active': {
        background: isDarkTheme(theme)
          ? lighten(theme.palette.background.paper, 0.2)
          : darken(theme.palette.background.paper, 0.2),
      },
    },
  },
  iframe: {
    width: '100%',
    minWidth: '100%',
    marginTop: theme.spacing(4),
  },
}))

const FormattedText: React.FC<{
  children: string
  disableParagraphMargin?: boolean
  className?: string
}> = ({
  children,
  className = '',
  disableParagraphMargin = false,
  ...props
}) => {
  const readerSettings = useSelector(store => store.settings.readerSettings)
  const classes = useStyles({ disableParagraphMargin, readerSettings })
  const [iframeHeights, setIframeHeights] = React.useState<
    Record<string, number>
  >({})
  const theme = useTheme()
  const options: HTMLReactParserOptions = {
    trim: true,
    replace: ({ name, children, attribs }): void | React.ReactElement => {
      if (name === '&nbsp;') {
        return <> </>
      }
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
        const imgClasses = attribs.class ? attribs.class.split(' ') : []
        if (attribs['data-tex']) {
          const formula = attribs['alt'].slice(1, attribs['alt'].length - 1)
          return (
            <MathJaxNode inline={attribs['data-tex'] === 'inline'}>
              {formula}
            </MathJaxNode>
          )
        } else if (imgClasses.some((e) => e === 'formula')) {
          const formula = attribs.source
          return (
            <MathJaxNode inline={imgClasses.some((e) => e === 'inline')}>
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
          width: attribs['data-width'] || attribs.width || 'auto',
          height: attribs['data-height'] || attribs.height || 'auto',
        }

        return (
          <LazyLoadImage
            placeholderSrc={attribs.src}
            // First try to load src from 'data-src' attribute
            // If not found, then use default 'src' attribute
            src={attribs['data-src'] || attribs.src}
            alt={attribs.alt || 'Изображение не загружено'}
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
        ).children[0]?.data
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler_text'
        ).children

        return <Spoiler title={title}>{domToReact(data)}</Spoiler>
      }
      if (name === 'details' && attribs.class === 'spoiler') {
        const title: string = children.find((e) => e.name === 'summary')
          .children[0]?.data
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler__content'
        ).children

        return <Details title={title}>{domToReact(data)}</Details>
      }
      if (name === 'a' && attribs?.href?.startsWith('#')) {
        const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (
          e
        ) => {
          e.preventDefault()
          const el =
            document.getElementById(attribs.href.slice(1)) ||
            document.getElementsByName(attribs.href.slice(1))[0]
          const yOffset = -APP_BAR_HEIGHT
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
        return (
          <a onClick={handleLinkClick} {...attribs}>
            {domToReact(children)}
          </a>
        )
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

export default React.memo(FormattedText)
