import frappe 
from erpnext.accounts.utils import get_balance_on

@frappe.whitelist()
def get_customer_ledger_balance(customer, company):
    return get_balance_on(
        party_type="Customer",
        party=customer,
        company=company,
    )