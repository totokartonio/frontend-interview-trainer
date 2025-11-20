import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      <div>
        <p>Hello World</p>
      </div>
    </MantineProvider>
  );
}

export default App;
