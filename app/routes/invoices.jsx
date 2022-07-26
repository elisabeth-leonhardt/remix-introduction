import { NavLink } from "@remix-run/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { getInvoices } from "../invoiceData";

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
