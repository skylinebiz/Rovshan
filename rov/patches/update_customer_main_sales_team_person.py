import frappe


def execute():
    customers = frappe.get_all("Customer", pluck="name")

    for customer in customers:
        doc = frappe.get_doc("Customer", customer)

        if not doc.sales_team:
            continue

        highest = max(
            doc.sales_team,
            key=lambda d: d.allocated_percentage or 0,
        )

        frappe.db.set_value(
            "Customer",
            customer,
            "custom_rov_main_sales_team_person",
            highest.sales_person,
            update_modified=False,
        )

    frappe.db.commit()