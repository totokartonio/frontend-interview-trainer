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
    colors: {
      // Кастомные цвета для streak/прогресса
      "badge-orange": [
        "#fff7e214",
        "#ffedcd14",
        "#fcd99e14",
        "#f9c46b14",
        "#f7b23f14",
        "#f6a72414",
        "#f59e0b14",
        "#da8c0414",
        "#c37c0014",
        "#a96a0014",
      ],
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
