"use client";

import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
  style,
}: Props) {
  return (
    <Link href={href} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  );
}
