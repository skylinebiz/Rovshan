frappe.ui.form.on("Sales Invoice", {
    customer(frm) {
        if (!frm.doc.customer || !frm.doc.company) {
            frm.set_value("custom_rov_ledger_balance", 0);
            return;
        }

        frappe.call({
            method: "rov.api.invoice.get_customer_ledger_balance",
            args: {
                customer: frm.doc.customer,
                company: frm.doc.company
            },
            callback(r) {
                // console.log("Customer Ledger Balance:", r.message);
                frm.set_value("custom_rov_ledger_balance", r.message);
            }
        });
    },
});