import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader() {
  const { invoices } = await import("~/mocks/invoices.json");

  return json({ invoices });
}

export default function () {
  const { invoices } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="container mx-auto border-2 border-red-400 p-8 mt-8">
        <h1 className="font-semibold text-xl py-4">Invoices</h1>
        <div className="grid grid-cols-2">
          <ul>
            {invoices.map((invoice) => (
              <li key={invoice.id} className="mb-2 flex gap-2 items-center">
                <span className="text-sm">[id: {invoice.id}]</span>
                <Link
                  to={`${invoice.id}`}
                  className="underline underline-offset-4 text-blue-500"
                >
                  {invoice.description}
                </Link>
              </li>
            ))}
          </ul>
          <Outlet />
        </div>
      </div>
      <p className="text-center font-semibold text-xl mt-8">
        <Link
          to="/invoices"
          className="underline underline-offset-4 text-gray-400"
        >
          reset
        </Link>
      </p>
    </>
  );
}
