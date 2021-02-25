import React, { useState } from 'react'
import ProgressiveImage from 'react-lazy-progressive-image'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { CircularProgress, Fade, makeStyles } from '@material-ui/core'
import { MIN_WIDTH } from 'src/config/constants'
import { PhotoSwipe } from 'react-photoswipe'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2000,
    '& > div.react-transform-component': {
      overflow: 'auto',
      width: '100%',
      height: '100%',
    },
  },
  image: {
    height: 'auto',
    maxWidth: '100%',
    backgroundColor: theme.palette.action.hover,
  },
  imagePlaceholder: {
    backgroundColor: theme.palette.action.hover,
    height: '50vw',
    maxHeight: MIN_WIDTH / 2,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
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

const ImageUnmemoized = ({
  src,
  loading,
  style,
  alt,
  className,
  setOpen,
}: ImageProps) => {
  const classes = useStyles()
  if (loading && (!src || src === '/img/image-loader.svg'))
    return (
      <div className={classes.imagePlaceholder + ' ' + className} style={style}>
        <Fade in timeout={500} style={{ transitionDelay: '1s' }}>
          <div>
            <CircularProgress />
          </div>
        </Fade>
      </div>
    )

  return (
    <Fade in timeout={250}>
      <img
        onClick={() => setOpen(true)}
        className={classes.image + ' ' + className}
        width={style?.width || 'auto'}
        height={style?.height || 'auto'}
        style={style}
        src={src}
        alt={alt || 'Image'}
      />
    </Fade>
  )
}
const Image = React.memo(ImageUnmemoized)

const LazyLoadImage = (props) => {
  const [isOpen, setOpen] = useState(false)
  const { style, alt, className } = props
  const items = [
    {
      src: props.src,
      w: style?.width || 1200,
      h: style?.height || 900,
      title: alt,
    },
  ]

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
      <PhotoSwipe
        isOpen={isOpen}
        items={items}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default React.memo(LazyLoadImage)
