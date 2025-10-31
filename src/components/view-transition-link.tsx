"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export interface ViewTransitionLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "href"> {
  href: string;
  withTimelineClassName?: string;
  animate?: boolean;
}

export function ViewTransitionLink({
  href,
  children,
  replace,
  prefetch,
  onClick,
  withTimelineClassName = "page-transition",
  animate = true,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter();

  const handleNavigation = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();

      const go = () => {
        if (replace) {
          router.replace(href);
        } else {
          router.push(href);
        }
      };

      if (!animate || typeof document.startViewTransition !== "function") {
        go();
        if (animate) {
          document.documentElement.classList.remove(withTimelineClassName);
        }
        return;
      }

      document.documentElement.classList.add(withTimelineClassName);

      const transition = document.startViewTransition(() => {
        go();
      });

      transition.finished
        .catch(() => void 0)
        .finally(() => {
          document.documentElement.classList.remove(withTimelineClassName);
        });
    },
    [animate, href, onClick, replace, router, withTimelineClassName],
  );

  return (
    <Link
      href={href}
      onClick={handleNavigation}
      prefetch={prefetch}
      replace={replace}
      {...props}
    >
      {children}
    </Link>
  );
}
