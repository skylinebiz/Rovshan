import frappe


def execute():
    property_setter = "Customer-main-search_fields"

    try:
        if frappe.db.exists("Property Setter", property_setter):
            frappe.delete_doc(
                "Property Setter",
                property_setter,
                ignore_permissions=True,
                force=True,
            )
    except Exception:
        frappe.log_error(
            title="Failed to delete Customer search_fields Property Setter",
            message=frappe.get_traceback(),
        )