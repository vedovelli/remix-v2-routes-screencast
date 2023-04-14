import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import type {
  LinksFunction,
  MetaFunction,
  V2_MetaFunction,
} from "@remix-run/node";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: V2_MetaFunction = () => [
  { title: "My app" },
  {
    name: "description",
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

// ({
//   title: "My app",
//   description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
// });

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
