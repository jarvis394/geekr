import React, { useState } from 'react'
import ProgressiveImage from 'react-lazy-progressive-image'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Backdrop, CircularProgress, Fade, makeStyles } from '@material-ui/core'
import { MIN_WIDTH } from 'src/config/constants'

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
}

const LazyLoadImage = (props) => {
  const [isOpen, setOpen] = useState(false)
  const classes = useStyles()
  const { style, alt, className } = props

  const ImageUnmemoized = ({ src, loading }: ImageProps) => {
    if (loading && (!src || src === '/img/image-loader.svg'))
      return (
        <div
          className={classes.imagePlaceholder + ' ' + className}
          style={style}
        >
          <Fade in timeout={500} style={{ transitionDelay: '1s' }}>
            <div>
              <CircularProgress />
            </div>
          </Fade>
        </div>
      )

    return (
      <Fade in={!isOpen} timeout={250}>
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
          <Image src={src} loading={loading} isVisible={isVisible} />
        )}
      </ProgressiveImage>
      {
        <Backdrop
          className={classes.backdrop}
          open={isOpen}
          onClick={() => setOpen(false)}
          unmountOnExit
          mountOnEnter
        >
          <TransformWrapper>
            <TransformComponent key={props.src}>
              <img
                style={{ width: '100%', zIndex: 2001 }}
                src={props.src}
                alt={props.alt}
              />
            </TransformComponent>
          </TransformWrapper>
        </Backdrop>
      }
    </>
  )
}

export default React.memo(LazyLoadImage)
