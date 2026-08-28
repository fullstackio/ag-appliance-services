"use client";

import { type ComponentProps, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { useBookingDialogStore } from "@/store/useBookingDialogStore";

type ButtonProps = ComponentProps<typeof Button>;

interface SiteButtonProps extends Omit<ButtonProps, "render"> {
  href: string;
}

/**
 * shadcn Button rendered as a link. `#book` opens the booking dialog instead of navigating.
 */
export function SiteButton({ href, children, onClick, ...rest }: SiteButtonProps) {
  const openDialog = useBookingDialogStore((s) => s.openDialog);
  const isBook = href === "#book";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isBook) {
      e.preventDefault();
      openDialog();
    }
    onClick?.(e as never);
  };

  return (
    <Button
      size="site"
      nativeButton={false}
      render={<a href={href} onClick={handleClick} />}
      {...rest}
    >
      {children}
    </Button>
  );
}
