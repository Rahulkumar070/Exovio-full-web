'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTransition } from './TransitionProvider';

type TransitionLinkProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  href: string;
};

const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, children, ...rest }, ref) {
    const { navigate } = usePageTransition();

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
        onClick?.(e);
        return;
      }
      e.preventDefault();
      onClick?.(e);
      navigate(href);
    };

    return (
      <Link href={href} ref={ref} onClick={handleClick} {...rest}>
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = 'TransitionLink';
export default TransitionLink;
