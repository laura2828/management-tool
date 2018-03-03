document.addEventListener("DOMContentLoaded", onHtmlLoaded);

function onHtmlLoaded() {

    var user = new User();
    var projects = new Array();
    var sprints = new Array();
    var tasks = new Array();
    var issues = new Array();

    var statuses = ["New", "In progress", "Feedback", "Rework", "Resolved", "Ready for testing"];
    var issueTypes = ["Feature", "Bug", "Task"];

    function User(id, name) {
        this.id = id;
        this.name = name;
    }

    function Project(id, name, userId) {
        this.id = id;
        this.name = name;
        this.userId = userId;
    }

    function Sprint(id, name, projectId) {
        this.id = id;
        this.name = name;
        this.projectId = projectId;
    }

    function Issue(id, type, name, sprintId, userId, assignee, description, status, tasks, comments, updatedAt, createdAt) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.sprintId = sprintId;
        this.userId = userId;
        this.assignee = assignee;
        this.description = description;
        this.status = status;
        this.tasks = tasks;
        this.comments = comments;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    function Task(id, name, sprintId) {
        this.id = id;
        this.name = name;
        this.sprintId = sprintId;
    }

    document.getElementById("login-button").addEventListener("click", function () {
        loggedIn();
    });

    function loggedIn() {
        user.id = guid();

        if (user.name == null) {
            var username = document.getElementById("usernameId");
            user.name = username.value;
        }

        var container = document.getElementById("containerId");
        container.innerHTML = "";
        var containerText = document.createElement("p");
        containerText.innerHTML = "Welcome, <strong>" + user.name + "</strong>!";
        container.appendChild(containerText);

        var childContainer = document.createElement("div");
        childContainer.id = ("childContainerId");
        container.appendChild(childContainer);

        var projectText = document.createElement("p");
        projectText.innerHTML = "Project name: ";
        childContainer.appendChild(projectText);

        var projectInput = document.createElement("input");
        projectInput.id = ("projectNameId");
        childContainer.appendChild(projectInput);

        var addProjectBtn = document.createElement("button");
        addProjectBtn.innerHTML = "Add Project";
        childContainer.appendChild(addProjectBtn);

        addProjectBtn.addEventListener("click", function () {
            addProject();
        });

        var projectsTable = document.createElement("table");
        projectsTable.id = "projectsTableId";
        childContainer.appendChild(projectsTable);

        projects.forEach(project => {
            var tableElements = document.getElementById("projectsTableId");
            var tableRows = document.createElement("tr");
            var tableCells = document.createElement("td");
            tableCells.innerHTML = project.name;
            tableCells.id = '"' + project.id + '"';

            tableRows.appendChild(tableCells);
            tableElements.appendChild(tableRows);

            tableCells.addEventListener("click", function () {
                loadSprints(project.id);
            }, false);
        })

    }

    function loadSprints(projectId) {

        var childContainer = document.getElementById("childContainerId");
        childContainer.innerHTML = "";

        projects.forEach(project => {
            if (project.id == projectId) {
                var projectNameS = document.getElementById("childContainerId");
                var projectTextS = document.createElement("p")
                projectTextS.innerHTML = "Selected Project: <strong>" + project.name + "</strong>";
                projectNameS.appendChild(projectTextS);
            }
        });

        var sprintText = document.createElement("p");
        sprintText.innerHTML = "Add Sprint: ";
        childContainer.appendChild(sprintText);

        var sprintInput = document.createElement("input");
        sprintInput.id = ("sprintNameId");
        childContainer.appendChild(sprintInput);

        var addSprintBtn = document.createElement("button");
        addSprintBtn.innerHTML = "Add Sprint";
        childContainer.appendChild(addSprintBtn);

        addSprintBtn.addEventListener("click", function () {
            addSprint(projectId);
        }, false);

        var backButton = document.createElement("button");
        backButton.innerHTML = "Back";
        childContainer.appendChild(backButton);
        backButton.addEventListener("click", function () {
            backToProjects();
        })

        var sprintsTable = document.createElement("table");
        sprintsTable.id = "sprintsTableId";
        childContainer.appendChild(sprintsTable);

        sprints.forEach(sprint => {
            if (sprint.projectId == projectId) {
                var tableElements = document.getElementById("sprintsTableId");
                var tableRows = document.createElement("tr");
                var tableCells = document.createElement("td");
                tableCells.innerHTML = sprint.name;
                tableCells.id = '"' + sprint.id + '"';

                tableRows.appendChild(tableCells);
                tableElements.appendChild(tableRows);

                tableCells.addEventListener("click", function () {
                    sprintDetails(projectId, sprint.id);
                }, false);
            }
        });
    }

    function sprintDetails(projectId, sprintId) {
        var childContainer = document.getElementById("childContainerId");
        childContainer.innerHTML = "";

        var sprintDetailsContainer = document.createElement("div");
        sprintDetailsContainer.id = "sprintDetailsContainerId";
        sprintDetailsContainer.innerHTML = "Select type issue: <br>";
        var typeSelector = document.createElement("select");
        typeSelector.id = "issueTypesId";

        sprintDetailsContainer.appendChild(typeSelector);
        childContainer.appendChild(sprintDetailsContainer);

        issueTypes.forEach(issueType => {
            var optionSelector = document.createElement("option");
            optionSelector.innerHTML = issueType;
            typeSelector.appendChild(optionSelector);
        });

        var issueName = document.createElement("input");
        var nameText = document.createElement("span");
        nameText.innerHTML = "<br> <br> Name: ";
        issueName.id = "issueNameId";
        sprintDetailsContainer.appendChild(nameText);
        sprintDetailsContainer.appendChild(issueName);

        var issueDescription = document.createElement("textarea");
        var descriptionText = document.createElement("span");
        descriptionText.innerHTML = "<br> <br> Description: ";
        issueDescription.id = "descriptionId";
        sprintDetailsContainer.appendChild(descriptionText);
        sprintDetailsContainer.appendChild(issueDescription);

        var selectStatus = document.createElement("select");
        selectStatus.id = "statusId";
        var selectStatusText = document.createElement("span");
        selectStatusText.innerHTML = "<br> <br> Select status type: ";
        sprintDetailsContainer.appendChild(selectStatusText);
        sprintDetailsContainer.appendChild(selectStatus);

        statuses.forEach(status => {
            var statusSelector = document.createElement("option");
            statusSelector.innerHTML = status;
            selectStatus.appendChild(statusSelector);
        });

        var issueComments = document.createElement("textarea");
        var commentsText = document.createElement("span");
        commentsText.innerHTML = "<br> <br> Comments: ";
        issueComments.id = "commentsId";
        sprintDetailsContainer.appendChild(commentsText);
        sprintDetailsContainer.appendChild(issueComments);

        var issueAssignee = document.createElement("input");
        var asigneeText = document.createElement("span");
        asigneeText.innerHTML = "<br> <br> Assigned to: ";
        issueAssignee.id = "assigneeId";
        sprintDetailsContainer.appendChild(asigneeText);
        sprintDetailsContainer.appendChild(issueAssignee);

        var addIssueBtn = document.createElement("button");
        var breakp = document.createElement("br");
        var breakp2 = document.createElement("br");
        addIssueBtn.innerHTML = "Add Issue";
        addIssueBtn.addEventListener("click", function () {
            addIssue(projectId, sprintId);
        });
        sprintDetailsContainer.appendChild(breakp);
        sprintDetailsContainer.appendChild(breakp2);
        sprintDetailsContainer.appendChild(addIssueBtn);

        var backButton = document.createElement("button");
        backButton.innerHTML = "Back"
        backButton.addEventListener("click", function () {
            loadSprints(projectId);
        });
        sprintDetailsContainer.appendChild(backButton);

        var issuesTable = document.createElement("table");
        issuesTable.id = "issuesTableId";
        sprintDetailsContainer.appendChild(issuesTable);

        issues.forEach(issue => {
            if (issue.sprintId == sprintId) {
                var tableElements = document.getElementById("issuesTableId");
                var issuesRows = document.createElement("tr");
                var issuesCells = document.createElement("td");
                issuesCells.innerHTML = '<br><strong>' + issue.name + '</strong><i> ' + issue.status + ' </i><br> Type: ' + issue.type + '<br> Description: ' + issue.description + '<br> Comments: ' + issue.comments + '<br> Created by: ' + user.name + '<br> Assigned to: ' + issue.assignee + '<br> Created date: ' + issue.createdAt;
                issuesRows.appendChild(issuesCells);
                tableElements.appendChild(issuesRows);
            }
        });
    }

    function addProject() {
        var newProject = new Project();
        newProject.id = guid();
        var projectName = document.getElementById("projectNameId");
        newProject.name = projectName.value;
        newProject.userId = user.id;

        projects.push(newProject);
        loggedIn();
    }

    function addSprint(projectId) {
        var newSprint = new Sprint();
        newSprint.id = guid();
        var sprintName = document.getElementById("sprintNameId");
        newSprint.name = sprintName.value;
        newSprint.projectId = projectId;

        sprints.push(newSprint);
        loadSprints(projectId);
    }

    function addIssue(projectId, sprintId) {
        var newIssue = new Issue();
        newIssue.id = guid();
        newIssue.type = document.getElementById("issueTypesId").options[document.getElementById('issueTypesId').selectedIndex].text;
        newIssue.name = document.getElementById("issueNameId").value;
        newIssue.sprintId = sprintId;
        newIssue.userId = user.id;
        newIssue.assignee = document.getElementById("assigneeId").value;
        newIssue.description = document.getElementById("descriptionId").value;
        newIssue.status = document.getElementById("statusId").options[document.getElementById('statusId').selectedIndex].text;
        newIssue.comments = document.getElementById("commentsId").value;
        newIssue.createdAt = new Date();

        issues.push(newIssue);
        sprintDetails(projectId, sprintId);
    }

    function addTask(projectId, sprintId) {
        var newTask = new Task();

    }

    function backToProjects() {
        loggedIn();
    }

    function guid() { //creates globally-unique identifiers
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}