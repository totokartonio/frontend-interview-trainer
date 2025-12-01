import { createFileRoute } from "@tanstack/react-router";
import NotFound from "../components/NotFound.tsx/index.ts";

const ErrorPage = () => {
  const { message } = Route.useSearch();

  return <NotFound message={message} />;
};

export const Route = createFileRoute("/error")({
  component: ErrorPage,
});
