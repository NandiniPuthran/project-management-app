import frappe

@frappe.whitelist()
def get_tasks(user_id):
    tasks = frappe.get_all(
        "Project Task",
        filters={"assigned_to": user_id},
        fields=["name", "task_name", "status", "start_date", "end_date"]
    )
    return tasks