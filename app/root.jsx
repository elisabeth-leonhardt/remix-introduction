import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import tailwindStyles from "./styles/app.css";

export const meta = () => ({
  charset: "utf-8",
  title: "Elis Remix Playground",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: tailwindStyles }];
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Scripts></Scripts>
        <Links />
      </head>

      <body>
        <header className='h-12 bg-[#669bbc]'>
          <Link to='/'>Home</Link>
        </header>
        <main className='min-h-[90vh]'>
          <Outlet />

          <ScrollRestoration />

          {/* <Scripts /> */}

          <LiveReload />
        </main>
        <footer className='h-12 bg-[#669bbc]'>Footer</footer>
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html lang='en'>
      <head>
        <Meta />

        <Links />
      </head>

      <body>
        <header className='h-12 bg-[#669bbc]'>
          <Link to='/'>Home</Link>
        </header>
        <main className='min-h-[90vh]'>
          <h1 className='text-lg text-red-800 text-center'>
            Ouch! There was an error: {caught.status}, {caught.statusText}
          </h1>
        </main>
        <footer className='h-12 bg-[#669bbc]'>Footer</footer>
      </body>
    </html>
  );
}
