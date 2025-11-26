import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
  const theme = createTheme({
    primaryColor: "blue",
    defaultRadius: "md",
    fontFamily: "Inter, system-ui, sans-serif",
    headings: {
      fontFamily: "Inter, system-ui, sans-serif",
      fontWeight: "700",
    },
    components: {
      Button: {
        defaultProps: {
          size: "md",
        },
      },
      Card: {
        defaultProps: {
          shadow: "sm",
          radius: "md",
          withBorder: true,
        },
      },
    },
  });

  return (
    <MantineProvider theme={theme}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </MantineProvider>
  );
}

export default App;
