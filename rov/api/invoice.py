import frappe 
from erpnext.accounts.utils import get_balance_on

@frappe.whitelist()
def get_customer_ledger_balance(customer, company):
    return get_balance_on(
        party_type="Customer",
        party=customer,
        company=company,
    )


@frappe.whitelist()
def get_party_ledger_balance(party_type, party, company):
    return get_balance_on(
        party_type=party_type,
        party=party,
        company=company,
    )