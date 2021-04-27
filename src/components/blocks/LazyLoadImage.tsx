import React, { useState, useRef, useEffect } from 'react'
import ProgressiveImage from 'react-lazy-progressive-image'
import {
  CircularProgress,
  Fade,
  makeStyles,
  Theme,
  Portal,
} from '@material-ui/core'
import { PhotoSwipe } from 'react-photoswipe'

const VISIBILITY_THRESHOLD = -250

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
    filter: 'blur(5px)',
    clipPath: 'inset(0)',
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
}

const ImageUnmemoized = React.forwardRef<HTMLImageElement, ImageProps>(
  function ImageComponent(
    { src, loading, style, alt, className, setOpen },
    ref
  ) {
    const classes = useStyles({
      isLoading: loading,
    })

    if (!loading && (!src || src === '/img/image-loader.svg'))
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

    return (
      <Fade in timeout={250}>
        <img
          ref={ref}
          onClick={() => !loading && setOpen(true)}
          className={classes.image + ' ' + className}
          width={style?.width || 'auto'}
          height={style?.height || 'auto'}
          style={style}
          src={src}
          alt={alt || 'Изображение не загружено'}
        />
      </Fade>
    )
  }
)
const Image = React.memo(ImageUnmemoized)

const LazyLoadImage = (props) => {
  const [isOpen, setOpen] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const { style, alt, className } = props
  const items: PhotoSwipe.Item[] = React.useMemo(
    () => [
      {
        src: props.src,
        w: imageRef?.current?.naturalWidth || 1200,
        h: imageRef?.current?.naturalHeight || 900,
      },
    ],
    [imageRef.current]
  )
  const pswpOptions: PhotoSwipe.UIFramework = {
    showHideOpacity: true,
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
  }

  return (
    <>
      <ProgressiveImage
        placeholder={props.placeholderSrc}
        src={props.src}
        visibilitySensorProps={{
          partialVisibility: true,
          offset: {
            top: VISIBILITY_THRESHOLD,
            bottom: VISIBILITY_THRESHOLD,
          },
        }}
      >
        {(src: string, loading: boolean, isVisible: boolean) => (
          <Image
            ref={imageRef}
            src={src}
            setOpen={setOpen}
            loading={loading}
            isVisible={isVisible}
            style={style}
            alt={alt}
            className={className}
          />
        )}
      </ProgressiveImage>
      {isOpen && imageRef.current && (
        <Portal container={document.body}>
          <PhotoSwipe
            options={pswpOptions}
            isOpen={isOpen}
            items={items}
            onClose={() => setOpen(false)}
          />
        </Portal>
      )}
    </>
  )
}

export default React.memo(LazyLoadImage)
