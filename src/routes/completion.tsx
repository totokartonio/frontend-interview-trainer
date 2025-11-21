import { createFileRoute } from "@tanstack/react-router";
import Completion from "../components/Completion";

export const Route = createFileRoute("/completion")({
  component: Completion,
});
