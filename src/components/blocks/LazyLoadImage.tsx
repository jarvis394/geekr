import React from 'react'
import {
  LazyLoadImage as LazyLoadImageComponent,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component'

const LazyLoadImage = (props: LazyLoadImageProps) => {
  return (
    <LazyLoadImageComponent
      effect="opacity"
      wrapperProps={{
        style: {
          height: 'auto',
          alignItems: 'flex-start',
          width: '100%',
        },
      }}
      {...props}
    />
  )
}

export default LazyLoadImage
