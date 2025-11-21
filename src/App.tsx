import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
  return (
    <MantineProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </MantineProvider>
  );
}

export default App;
