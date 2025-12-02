import { createFileRoute, useSearch } from "@tanstack/react-router";
import NotFound from "../components/NotFound.tsx";

type SearchParams = {
  message?: string;
};

const ErrorPage = () => {
  const { message } = useSearch({ strict: false }) as SearchParams;

  return <NotFound message={message} />;
};

export const Route = createFileRoute("/error")({
  component: ErrorPage,
});
