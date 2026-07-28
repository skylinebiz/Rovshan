frappe.ui.form.on("Payment Entry", {
    setup(frm) {
        set_party_query(frm);
    },

    refresh(frm) {
        set_party_query(frm);
    },

    party_type(frm) {
        frm.set_value("party", "");
        frm.set_value("party_name", "");
        set_party_query(frm);
    },

    custom_rov_sales_person(frm) {
        if (frm.doc.party_type === "Customer") {
            frm.set_value("party", "");
            frm.set_value("party_name", "");
        }
        set_party_query(frm);
    },

    party(frm) {
        if (!frm.doc.party || !frm.doc.party_type || !frm.doc.company) {
            frm.set_value("custom_rov_ledger_balance", 0);
            return;
        }

        frappe.call({
            method: "rov.api.invoice.get_party_ledger_balance",
            args: {
                party_type: frm.doc.party_type,
                party: frm.doc.party,
                company: frm.doc.company
            },
            callback(r) {
                frm.set_value("custom_rov_ledger_balance", r.message);
            }
        });
    }
});

function set_party_query(frm) {
    frm.set_query("party", function () {
        if (frm.doc.party_type !== "Customer") {
            return {};
        }

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