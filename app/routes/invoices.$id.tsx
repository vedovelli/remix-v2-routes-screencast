import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const { invoices } = await import("~/mocks/invoices.json");

  return json({ invoice: invoices.find(({ id }) => id === Number(params.id)) });
}

export default function () {
  const { invoice } = useLoaderData<typeof loader>();

  return (
    <div className="border-2 border-green-700 p-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl py-4">Invoice Details</h1>
        <p className="text-sm">
          <Link
            to="events"
            className="underline underline-offset-4 text-blue-500"
          >
            [view events]
          </Link>
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {Object.entries(invoice ?? {}).map(([label, value]) => (
          <li key={label} className="flex py-4">
            <div className="ml-3 flex gap-4">
              <p className="font-medium text-gray-900 w-24 uppercase text-xs">
                {label}
              </p>
              <p className="text-sm text-gray-500">{value}</p>
            </div>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
