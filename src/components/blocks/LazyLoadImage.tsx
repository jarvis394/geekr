import React, { useState, useRef, MutableRefObject } from 'react'
import ProgressiveImage from 'react-lazy-progressive-image'
import {
  CircularProgress,
  Fade,
  makeStyles,
  Portal,
  Theme,
} from '@material-ui/core'
import { PhotoSwipe } from 'react-photoswipe'
import { POST_ITEM_VISIBILITY_THRESHOLD } from 'src/config/constants'

interface StylesProps {
  isLoading: boolean
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  image: {
    height: 'auto',
    maxWidth: '100%',
    verticalAlign: 'middle',
    '-webkit-tap-highlight-color': 'transparent',
    cursor: 'pointer',
    filter: ({ isLoading }) => (isLoading ? 'blur(5px)' : ''),
    clipPath: ({ isLoading }) => (isLoading ? 'inset(0)' : ''),
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    fontSize: 12,
  },
  imagePlaceholder: {
    height: 'auto',
    maxWidth: '100%',
    verticalAlign: 'middle',
    display: 'inline-block',
  },
  blurred: {
    filter: 'blur(16px)',
    clipPath: 'inset(0)',
  },
  'imgAlign-left': {
    float: 'left',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '40% !important',
  },
  'imgAlign-right': {
    float: 'right',
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    maxWidth: '40% !important',
  },
}))

interface ImageProps {
  src: string
  loading: boolean
  isVisible: boolean
  style: Record<string, string | number>
  alt: string
  className: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  disableZoom?: boolean
  align?: 'left' | 'right' | null
  onClick: () => void
}

const ImageUnmemoized = React.forwardRef<HTMLImageElement, ImageProps>(
  function ImageComponent(
    {
      src,
      loading,
      style,
      alt,
      className,
      setOpen,
      disableZoom,
      align,
      onClick,
    },
    ref
  ) {
    const [hasError, setHasError] = React.useState(false)
    // If image loaded with error, the useStyles `isLoading` prop should be false,
    // so the image won't be blurred
    const classes = useStyles({
      isLoading: hasError ? false : loading,
    })
    const imgClasses = [classes.image, className]

    if (loading && (!src || src === '/img/image-loader.svg'))
      return (
        <span
          className={classes.imagePlaceholder + ' ' + className}
          style={style}
        >
          <Fade
            in
            timeout={1000}
            style={{
              transitionDelay: '1s',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>
              <CircularProgress size="1.25rem" thickness={5} />
            </span>
          </Fade>
        </span>
      )

    if (align) imgClasses.push(classes['imgAlign-' + align])

    return (
      <Fade in timeout={250} mountOnEnter>
        <img
          ref={ref}
          onClick={() => !loading && !hasError && onClick()}
          className={imgClasses.join(' ')}
          width={style?.width}
          height={style?.height}
          style={style}
          src={src}
          alt={alt || 'Изображение не загружено'}
          onError={() => setHasError(true)}
        />
      </Fade>
    )
  }
)
const Image = React.memo(ImageUnmemoized)

const LazyLoadImage = (props) => {
  const [isOpen, setOpen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const { style, alt, className, disableZoom, align, placeholderSrc } = props
  const showByDefault = !!placeholderSrc
  // Set image dimensions after it is done loading
  // PhotoSwipe requires image dimensions to be set before it is opened,
  // so we set them as soon as the image (in FormattedText, probably) is loaded.
  // User cannot open PhotoSwipe before image was loaded.
  const items: MutableRefObject<PhotoSwipe.Item[]> = React.useRef([
    {
      src: props.src,
      w: 1080,
      h: 1920,
    },
  ])
  const pswpOptions: PhotoSwipe.UIFramework = {
    showHideOpacity: false,
    bgOpacity: 0.8,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    counterEl: false,
    arrowEl: false,
    captionEl: false,
    tapToClose: true,
    pinchToClose: false,
    maxSpreadZoom: 4,
    history: false,
  }

  const onClick = () => {
    if (disableZoom || !imageRef?.current) return
    const windowWidth = window.innerWidth - 32
    const n = windowWidth / imageRef?.current?.clientWidth
    items.current = [
      {
        src: props.src,
        w: windowWidth,
        h: imageRef?.current?.clientHeight * n,
      },
    ]
    setOpen(true)
  }

  return (
    <>
      <ProgressiveImage
        placeholder={placeholderSrc}
        src={props.src}
        visibilitySensorProps={{
          partialVisibility: true,
          offset: {
            top: showByDefault ? -Infinity : POST_ITEM_VISIBILITY_THRESHOLD,
            bottom: showByDefault ? -Infinity : POST_ITEM_VISIBILITY_THRESHOLD,
          },
        }}
      >
        {(src: string, loading: boolean, isVisible: boolean) => (
          <Image
            ref={imageRef}
            src={src}
            setOpen={setOpen}
            onClick={onClick}
            loading={loading}
            isVisible={isVisible}
            style={style}
            alt={alt}
            align={align}
            className={className}
            disableZoom={disableZoom}
          />
        )}
      </ProgressiveImage>
      {isOpen && imageRef.current && (
        <Portal container={document.body}>
          <PhotoSwipe
            options={pswpOptions}
            isOpen={isOpen}
            items={items.current}
            onClose={() => setOpen(false)}
          />
        </Portal>
      )}
    </>
  )
}

export default React.memo(LazyLoadImage)
