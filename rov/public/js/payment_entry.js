frappe.ui.form.on("Payment Entry", {
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