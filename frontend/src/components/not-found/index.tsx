import { type NotFoundRouteProps } from "@tanstack/react-router";

export default function NotFound(props: NotFoundRouteProps) {
  console.error(props);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      {/* Optional: link back home */}
      <a href="/" className="underline">
        Go home
      </a>
    </div>
  );
}
