import React, { useState } from 'react'
import {
  LazyLoadImage as LazyLoadImageComponent,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Backdrop, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 2000,
    '& > div.react-transform-component': {
      overflow: 'auto',
      width: '100%',
      height: '100%',
    },
  },
}))

const LazyLoadImage = (props: LazyLoadImageProps) => {
  const [isOpen, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <>
      <LazyLoadImageComponent
        effect="opacity"
        wrapperProps={{
          style: {
            height: 'auto',
            alignItems: 'flex-start',
            width: '100%',
          },
        }}
        onClick={() => setOpen(true)}
        threshold={200}
        {...props}
      />
      {
        <Backdrop
          className={classes.backdrop}
          open={isOpen}
          onClick={() => setOpen(false)}
          unmountOnExit
          mountOnEnter
        >
          <TransformWrapper>
            <TransformComponent>
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
