import React from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

const LinkToOutsidePage = ({
  to,
  children,
  ...props
}: { to: string } & LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
  const location = useLocation()

  return (
    <Link
      to={{
        pathname: to,
        state: {
          from: location.pathname,
        },
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default React.memo(LinkToOutsidePage)
