frappe.ui.form.on("Sales Invoice", {
    setup(frm) {
        frm.set_query("customer", () => {
            if (!frm.doc.custom_rov_sales_person) {
                return {};
            }

            return {
                filters: {
                    custom_rov_main_sales_team_person: frm.doc.custom_rov_sales_person
                }
            };
        });
    },

    custom_rov_sales_person(frm) {
        frm.set_value("customer", "");

        frm.set_query("customer", () => {
            if (!frm.doc.custom_rov_sales_person) {
                return {};
            }

            return {
                filters: {
                    custom_rov_main_sales_team_person: frm.doc.custom_rov_sales_person
                }
            };
        });
    },

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