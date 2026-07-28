import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mixeiro/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/mixeiro/"!</div>;
}
