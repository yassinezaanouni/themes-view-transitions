'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

interface ViewTransitionLinkProps extends ComponentProps<typeof Link> {
  href: string;
}

export function ViewTransitionLink({
  href,
  children,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.remove('theme-transition');
      document.documentElement.classList.add('page-transition');

      (document as any).startViewTransition(() => {
        router.push(href);
        setTimeout(() => {
          document.documentElement.classList.remove('page-transition');
        }, 600);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

