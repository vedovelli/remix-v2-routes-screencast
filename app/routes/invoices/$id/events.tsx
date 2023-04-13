import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const { events } = await import("~/mocks/invoices.json");

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
