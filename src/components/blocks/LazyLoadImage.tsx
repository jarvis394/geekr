import React, { useState, useRef, useEffect } from 'react'
import ProgressiveImage from 'react-lazy-progressive-image'
import { CircularProgress, Fade, makeStyles } from '@material-ui/core'
import { PhotoSwipe } from 'react-photoswipe'

const useStyles = makeStyles((theme) => ({
  image: {
    height: 'auto',
    maxWidth: '100%',
    cursor: 'pointer',
    backgroundColor: theme.palette.action.hover,
    filter: (loading) => (loading ? 'blur(5px)' : ''),
    clipPath: (loading) => (loading ? 'inset(0)' : ''),
  },
  imagePlaceholder: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurred: {
    filter: 'blur(5px)',
    clipPath: 'inset(0)',
    background: theme.palette.action.hover,
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
    const classes = useStyles(loading)
    if (loading && (!src || src === '/img/image-loader.svg'))
      return (
        <div
          className={classes.imagePlaceholder + ' ' + className}
          style={style}
        >
          <Fade in timeout={500} style={{ transitionDelay: '1s' }}>
            <div>
              <CircularProgress size="1.5rem" thickness={4.5} />
            </div>
          </Fade>
        </div>
      )
    console.log(loading, src)

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
  const items: PhotoSwipe.Item[] = [
    {
      src: props.src,
      w: style && style?.width !== 'auto' ? style.width : 1200,
      h: style && style?.height !== 'auto' ? style.height : 900,
    },
  ]
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
  }

  // Set image dimensions after it is done loading
  // PhotoSwipe requires image dimensions to be set before it is opened,
  // so we set them as soon as the image (in FormattedText, probably) is loaded.
  // User cannot open PhotoSwipe before image loads.
  useEffect(() => {
    if (imageRef.current !== null) {
      const imageWidth = imageRef.current.naturalWidth
      const imageHeight = imageRef.current.naturalHeight
      items[0].w = imageWidth
      items[0].h = imageHeight
    }
    // needs isOpen to update on every close, somewhy resets after close-open
  }, [imageRef.current, isOpen])

  return (
    <>
      <ProgressiveImage
        placeholder={props.placeholderSrc}
        src={props.src}
        visibilitySensorProps={{
          partialVisibility: true,
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
        <PhotoSwipe
          options={pswpOptions}
          isOpen={isOpen}
          items={items}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default React.memo(LazyLoadImage)
