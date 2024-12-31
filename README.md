# Project Management App

## Overview

This is a custom Frappe app to manage project tasks, with the following features:
- Custom Doctype: Project Task with validations.
- Workflow: States for task management.
- API: Fetch tasks assigned to a user.

## Setup Instructions

1. Clone the `frappe_docker` repository. 
   ```cmd
   git clone https://github.com/frappe/frappe_docker
   ```
2. Create a Directory
   mkdir erpnext_docker

3. Create a Docker Compose File
   cp frappe_docker/pwd.yml erpnext_docker/pwd.yml

2. Place the `custom_app` folder in the Docker volume as defined in `pwd.yml`.

3. Start the services:
   ```bash
   docker-compose -f pwd.yml up -d
   ```
   
4. Log into your Frappe site and install the app.
   ```bash
      bench --site site1.local install-app project_management
   ```
   
5. Alternatively,we can log into frappe site and install custom app directly from UI

## Script Coverage

1. Custom Doctype Creation:
    ```cmd
    project_management/doctype/project_task/project_task.json
   ``` 
      This Doctype defines the custom fields (Task Name, Project, Start Date, End Date, Assigned To, and Status) and includes validation to ensure the End Date is not before the Start Date.

2. Custom Script Integration:
   ```cmd
    project_management/doctype/project_task/project_task.js
   ```
      This script automatically sets the Status field to "In Progress" when the Start Date is set and to "Completed" when the End Date is set.

3. Database Query using Frappe Query Builder:
   ``` cmd
   project_management/api.py
   ```
      This script uses the Frappe Query Builder to fetch all tasks from the Project Task Doctype where the Status is "In Progress" and the Assigned To field matches the current logged-in user.

4. Custom Workflow Creation:
   ``` cmd
   project_management/workflow/project_task_workflow.json
   ```
      Defines the custom workflow with states (Not Started, In Progress, Completed) and actions ensuring only the assignee can move the task to "Completed".

5. Frappe API Endpoint:
   ```cmd
   project_management/api.py
   ```
      This API endpoint allows external systems to fetch tasks assigned to a specific user by providing the user ID.

6. Customizing ListView:
   ```cmd
   project_management/public/css/custom.css
   ```
      This customization highlights overdue tasks (where the End Date is in the past) using CSS or view customization in the ListView.

7. UI Enhancement:
   ```cmd
   project_management/doctype/project_task/project_task.js
   ```
      Adds a button in the Project Task form that marks the task as completed and sends a notification to the assigned user.

8. UI Enhancement:
   ``` cmd
   project_management/doctype/project_task/project_task.js
   ```
      Adds a notification functionality to inform the assigned user when the task is marked as completed.
