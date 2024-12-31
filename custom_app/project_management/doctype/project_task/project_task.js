frappe.ui.form.on('Project Task', {
        validate: function(frm) {
            if (frm.doc.start_date && !frm.doc.end_date) {
                frm.set_value('status', 'In Progress');
            }
            if (frm.doc.end_date && frm.doc.start_date) {
                frm.set_value('status', 'Completed');
            }
        },
        on_submit: function(frm) {
            if (frm.doc.status === 'Completed') {
                frappe.msgprint(__('Task marked as completed.'));
                frappe.call({
                    method: 'frappe.core.doctype.user.user.get_user',
                    args: {
                        user: frm.doc.assigned_to
                    },
                    callback: function(r) {
                        if (r.message) {
                            frappe.notify({
                                message: `The task "${frm.doc.task_name}" has been marked as completed.`,
                                title: 'Task Completed',
                                indicator: 'green'
                            });
                        }
                    }
                });
            }
        }    
});