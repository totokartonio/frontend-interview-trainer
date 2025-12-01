import { type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {}

export const renderWithRouter = (
  ui: ReactNode,
  options?: CustomRenderOptions
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MantineProvider>{children}</MantineProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export { screen } from "@testing-library/react";
