frappe.ui.form.on("Sales Invoice", {
    setup(frm) {
        set_party_query(frm);
    },

    custom_rov_sales_person(frm) {
        frm.set_value("customer", "");

        set_party_query(frm);
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

function set_party_query(frm) {
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
}