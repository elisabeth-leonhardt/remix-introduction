import { useParams } from "@remix-run/react";
import React from "react";
import { getInvoice } from "../../invoiceData";

function OneInvoice() {
  let params = useParams();
  let invoice = getInvoice(parseInt(params.invoiceId, 10));
  return (
    <main style={{ padding: "1rem", margin: "1rem", background: "#c1121f" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}

export default OneInvoice;
