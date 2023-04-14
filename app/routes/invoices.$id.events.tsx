import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const { events } = await import("~/mocks/invoices.json");

  // throw new Response("No events found", { status: 404 });
  // throw new Error("Something went wrong");

  return json({
    events: events.filter(({ invoice_id }) => invoice_id === Number(params.id)),
  });
}

export default function () {
  const { events } = useLoaderData<typeof loader>();

  return (
    <div className="border-2 border-violet-600 p-4">
      <h5>Events</h5>
      <ul className="divide-y divide-gray-200">
        {events.map(({ name, date, notes }) => (
          <li key={name} className="flex py-4">
            <div className="ml-3 flex gap-4">
              <p className="text-sm text-gray-500">
                {date} <strong>[{name}]</strong> {notes}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <div className="border-2 border-violet-600 p-4">
        <h5>Events</h5>
        <p>
          <span className="text-6xl">🤷‍♂️</span> {error.data}
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-violet-600 p-4 bg-red-200">
      <h5>Events</h5>
      <p>
        <span className="text-6xl">💥</span> Error retrieving events
      </p>
    </div>
  );
}

// export function CatchBoundary() {
//   return (
//     <div className="border-2 border-violet-600 p-4">
//       <h5>Events</h5>
//       <p>
//         <span className="text-6xl">🤷‍♂️</span> No events found
//       </p>
//     </div>
//   );
// }
