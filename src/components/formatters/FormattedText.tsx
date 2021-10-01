import * as React from 'react'
import {
  makeStyles,
  fade,
  darken,
  lighten,
  Theme,
  rgbToHex,
} from '@material-ui/core/styles'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai as monokaiStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Spoiler from '../blocks/Spoiler'
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'
import LazyLoadImage from '../blocks/LazyLoadImage'
import Details from '../blocks/Details'
import Iframe from 'react-iframe'
import { Node as MathJaxNode } from '@nteract/mathjax'
import getInvertedContrastPaperColor from 'src/utils/getInvertedContrastPaperColor'
import isDarkTheme from 'src/utils/isDarkTheme'
import { APP_BAR_HEIGHT, MIN_WIDTH } from 'src/config/constants'
import { useSelector } from 'src/hooks'
import { UserSettings } from 'src/interfaces'
import formatLink from 'src/utils/formatLink'
import { Link } from 'react-router-dom'
import blend from 'src/utils/blendColors'
import { Tooltip, Typography } from '@material-ui/core'
import getContrastPaperColor from 'src/utils/getContrastPaperColor'

interface IframeResizeData {
  type: string
  id: number
  height: number
}

const useStyles = makeStyles<
  Theme,
  {
    oldHabrFormat: boolean
    readerSettings: UserSettings['readerSettings']
    inverseColors: boolean
  }
>((theme) => ({
  img: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: 'auto',
    borderRadius: 4,
  },
  text: {
    fontSize: ({ readerSettings }) => readerSettings.fontSize,
    fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
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
      marginTop: ({ oldHabrFormat: d }) => (d ? 0 : theme.spacing(1.75)),
    },
    '& p': {
      margin: 0,
      fontSize: ({ readerSettings }) => readerSettings.fontSize,
      fontFamily: ({ readerSettings }) => readerSettings.fontFamily,
    },
    '& p+p, pre+p': {
      marginTop: ({ oldHabrFormat: d }) => (d ? 0 : theme.spacing(3)),
    },
    '& em': {
      color: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.text.primary),
        0.9
      ),
    },
    '& code': {
      background: ({ inverseColors }) =>
        inverseColors
          ? getContrastPaperColor(theme)
          : getInvertedContrastPaperColor(theme),
      padding: '3px 6px',
      borderRadius: theme.shape.borderRadius,
      wordBreak: 'break-word',
    },
    '& div.table, div.scrollable-table': {
      overflow: 'auto',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      wordBreak: 'normal',
    },
    '& sub, sup': {
      fontSize: '75%',
      lineHeight: 0,
      position: 'relative',
      verticalAlign: 'initial',
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
      margin: ({ oldHabrFormat: d }) => `${theme.spacing(d ? 1 : 4)}px 0 0 0`,
      fontFamily: 'Google Sans',
      fontWeight: 800,
    },
    '& blockquote': {
      margin: '12px 0',
      padding: '0 12px',
      display: 'block',
      borderLeft: '4px solid ' + theme.palette.primary.light,
      color: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.text.primary),
        0.9
      ),
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
      textAlign: 'center',
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
      color: blend(
        rgbToHex(theme.palette.primary.light),
        rgbToHex(theme.palette.text.primary),
        0.9
      ),
      top: '-.5em',
    },
    // MathJaxNode overflow fix
    '& span.mjx-chtml': {
      whiteSpace: 'normal',
    },
  },
  syntaxHighlighter: {
    margin: 0,
    marginTop: theme.spacing(3),
    display: 'block',
    tabSize: 4,
    overflow: 'auto',
    border: '1px solid ' + theme.palette.divider,
    borderRadius: 4,
    padding: theme.spacing(2) + 'px !important',
    color: theme.palette.text.primary + ' !important',
    boxSizing: 'border-box',
    '-moz-tab-size': 4,
    whiteSpace: 'pre',
    wordBreak: 'normal',
    wordSpacing: 'normal',
    wordWrap: 'normal',
    [theme.breakpoints.up(MIN_WIDTH)]: {
      backgroundColor: getContrastPaperColor(theme) + ' !important',
    },
    [theme.breakpoints.down(MIN_WIDTH)]: {
      backgroundColor: ({ inverseColors }) =>
        (inverseColors
          ? getContrastPaperColor(theme)
          : getInvertedContrastPaperColor(theme)) + ' !important',
    },
    '& code': {
      whiteSpace: 'pre',
      wordBreak: 'normal',
      wordSpacing: 'normal',
      wordWrap: 'normal',
      background: 'none !important',
      padding: 0,
      '-moz-tab-size': 4,
      tabSize: 4,
      fontSize: 14,
      fontFamily: 'Menlo,Monaco,Consolas,Courier New,Courier,monospace',
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
  abbr: {
    borderBottom: '1px dotted ' + fade(theme.palette.divider, 0.5),
    cursor: 'help',
    textDecoration: 'none',
  },
}))

const FormattedText: React.FC<{
  children: string
  oldHabrFormat?: boolean
  className?: string
  inverseColors?: boolean
  disableImageZoom?: boolean
}> = ({
  children: componentChildren,
  className = '',
  oldHabrFormat = false,
  inverseColors = false,
  disableImageZoom = false,
  ...props
}) => {
  const readerSettings = useSelector((store) => store.settings.readerSettings)
  const classes = useStyles({ oldHabrFormat, readerSettings, inverseColors })
  const [iframeHeights, setIframeHeights] = React.useState<
    Record<string, number>
  >({})
  const shouldChangeLinks = useSelector(
    (store) => store.settings.readerSettings.changeLinks
  )
  const options: HTMLReactParserOptions = {
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
            style={monokaiStyle}
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
          width: attribs['data-width'] || attribs.width,
          height: attribs['data-height'] || attribs.height,
        }

        return (
          <LazyLoadImage
            disableZoom={disableImageZoom}
            placeholderSrc={attribs.src}
            // First try to load src from 'data-src' attribute
            // If not found, then use default 'src' attribute
            src={attribs['data-src'] || attribs.src}
            alt={attribs.alt || 'Изображение не загружено'}
            align={attribs.align}
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

        return <Spoiler title={title}>{domToReact(data, options)}</Spoiler>
      }
      if (name === 'details' && attribs.class === 'spoiler') {
        const title: string = children.find((e) => e.name === 'summary')
          .children[0]?.data
        const data = children.find(
          (e) => e.attribs && e.attribs.class === 'spoiler__content'
        ).children

        return <Details title={title}>{domToReact(data, options)}</Details>
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
            (el?.getBoundingClientRect()?.top || 0) +
            window.pageYOffset +
            yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
        return (
          <a onClick={handleLinkClick} {...attribs}>
            {domToReact(children, options)}
          </a>
        )
      }
      if (name === 'a' && shouldChangeLinks) {
        const formattedLink = formatLink(attribs.href)
        if (formattedLink)
          return (
            <Link to={formattedLink as string}>
              {domToReact(children, options)}
            </Link>
          )
      }
      if (name === 'abbr') {
        return (
          <Tooltip
            title={attribs.title}
            placement="bottom"
            className={classes.abbr}
          >
            <span>{domToReact(children, options)}</span>
          </Tooltip>
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
      {parse(componentChildren, options)}
    </div>
  )
}

export default React.memo(FormattedText)
