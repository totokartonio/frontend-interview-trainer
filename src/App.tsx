import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Home from "./Components/Home";

function App() {
  return (
    <MantineProvider>
      <div>
        <Home />
      </div>
    </MantineProvider>
  );
}

export default App;
