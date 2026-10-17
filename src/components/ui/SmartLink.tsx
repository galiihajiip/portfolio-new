import Link from "next/link";
import type { ComponentProps } from "react";
import { isExternal } from "@/lib/utils";

/** Internal links use next/link; external ones open in a new tab safely. */
export function SmartLink({ href, children, ...rest }: ComponentProps<"a"> & { href: string }) {
  if (isExternal(href) || href.startsWith("mailto:")) {
    const external = isExternal(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
