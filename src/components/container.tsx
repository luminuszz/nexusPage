import { ReactNode } from "react";

export interface ContainerProps {
  children: Readonly<ReactNode>;
}

export function Container({ children }: ContainerProps) {
  return (
    <main className="min-h-screen flex flex-col antialiased">{children}</main>
  );
}
