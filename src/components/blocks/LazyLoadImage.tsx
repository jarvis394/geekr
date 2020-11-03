import React from 'react'
import {
  LazyLoadImage as LazyLoadImageComponent,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component'

const LazyLoadImage = (props: LazyLoadImageProps) => {
  return (
    <LazyLoadImageComponent
      style={{ transform: 'translate3d(0, 0, 0)' }}
      effect="blur"
      wrapperProps={{ style: { width: '100%' } }}
      {...props}
    />
  )
}

export default LazyLoadImage
