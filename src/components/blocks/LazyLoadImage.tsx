import React from 'react'
import {
  LazyLoadImage as LazyLoadImageComponent,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component'

const LazyLoadImage = (props: LazyLoadImageProps) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <LazyLoadImageComponent
        effect="opacity"
        wrapperProps={{
          style: {
            display: 'flex',
            height: 'auto',
            alignItems: 'flex-start',
            width: '100%',
          },
        }}
        {...props}
      />
    </div>
  )
}

export default LazyLoadImage
