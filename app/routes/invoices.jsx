import { NavLink } from "@remix-run/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../invoiceData";

export function ErrorBoundary() {
  return (
    <div className='grid place-content-center'>
      <p className='p-4 border-2 border-red-900 bg-red-500 h-[auto] w-[20ch]'>
        We are very sorry! There was a problem with your invoices!
      </p>
    </div>
  );
}

function index() {
  const invoices = getInvoices();
  return (
    <section className='p-4 bg-[#fdf0d5] h-full flex items-start'>
      <nav className='flex flex-col border-r border-black w-[20ch]'>
        {invoices.map((invoice) => (
          <NavLink
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
            className={({ isActive }) =>
              isActive ? "text-red-800" : "text-black"
            }
          >
            {invoice.name}
          </NavLink>
        ))}
      </nav>
      <Outlet></Outlet>
    </section>
  );
}

export default index;
