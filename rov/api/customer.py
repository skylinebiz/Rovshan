import frappe 
from frappe.model.document import Document

def before_save(doc: Document, method=None):
    doc.custom_rov_main_sales_team_person = None

    if not doc.sales_team:
        return

    highest = max(
        doc.sales_team,
        key=lambda d: d.allocated_percentage or 0
    )

    doc.custom_rov_main_sales_team_person = highest.sales_person