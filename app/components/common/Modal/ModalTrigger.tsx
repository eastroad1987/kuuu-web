"use client";

import Link from "next/link";

interface ModalTriggerProps {
  children: React.ReactNode;
  href: string;
}

export default function ModalTrigger({
  children,
  href = "/",
}: ModalTriggerProps) {
  return <Link href={href}>{children}</Link>;
}
