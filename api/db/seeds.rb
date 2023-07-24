# # seed database
puts "start seeding..."
# code here
USERS = [
    {
          email: "demo@email.com",
          password: "password123",
          password_confirmation: "password123",
          name: "Demo User",
          image: Faker::LoremFlickr.image
        },
        {
          email: "test@email.com",
          password: "password123",
          password_confirmation: "password123",
          name: "Test User",
          image: Faker::LoremFlickr.image
        },
        {
          email: "engineering@email.com",
          password: "password123",
          password_confirmation: "password123",
          name: "Engineering User",
          image: Faker::LoremFlickr.image
        },
        {
          email: "marketing@email.com",
          password: "password123",
          password_confirmation: "password123",
          name: "Marketing User",
          image: Faker::LoremFlickr.image
        },
        {
          email: "sales@email.com",
          password: "password123",
          password_confirmation: "password123",
          name: "Sales User",
          image: Faker::LoremFlickr.image
        },
]
USERS.each do |user|
  User.create! user
end

# teams
TEAMS = [
  {
          name: "Engineering",
          description: "This is the engineering team",
        },
        {
          name: "Marketing",
          description: "This is the marketing team",
        },
        {
          name: "Sales",
          description: "This is the marketing team",
        },
]
TEAMS.each do |team|
  Team.create! team
end

# userTeams
USERTEAMS = [
  {
    user_id: 1,
    team_id: 1,
  },
  {
    user_id: 2,
    team_id: 1,
  },
  {
    user_id: 3,
    team_id: 1,
  },
  {
    user_id: 1,
    team_id: 2,
  },
  {
    user_id: 1,
    team_id: 3,
  },
  {
    user_id: 4,
    team_id: 2,
  },
  {
    user_id: 5,
    team_id: 3,
  },
]
USERTEAMS.each do |userteam|
  UserTeam.create! userteam
end

# projects
PROJECTS = [
{
  name: "Database Project",
  team_id: 1,
},
{
  name: "Mobile Application",
  team_id: 1,
},

{
  name: "Web Application",
  team_id: 1,
},
{
  name: "UI/UX Project",
  team_id: 1,
},

{
  name: "SEO Campaign",
  team_id: 2,
},
{
  name: "Online Marketing",
  team_id: 2,
},

{
  name: "Catalina Wine Mixer",
  team_id: 3,
},
{
  name: "International Sales",
  team_id: 3,
},
]
PROJECTS.each do |project|
  Project.create! project
end

USERPROJECTS = [
  {
    user_id: 1,
    project_id: 1,
  },
  {
    user_id: 1,
    project_id: 2,
  },
  {
    user_id: 1,
    project_id: 3,
  },
  {
    user_id: 1,
    project_id: 4,
  },
  {
    user_id: 1,
    project_id: 5,
  },
  {
    user_id: 1,
    project_id: 6,
  },
  {
    user_id: 1,
    project_id: 7,
  },
  {
    user_id: 1,
    project_id: 8,
  },
  {
    user_id: 2,
    project_id: 1,
  },
  {
    user_id: 3,
    project_id: 1,
  },
  {
    user_id: 3,
    project_id: 2,
  },
  {
    user_id: 3,
    project_id: 3,
  },
  {
    user_id: 3,
    project_id: 4,
  },
  {
    user_id: 4,
    project_id: 5,
  },
  {
    user_id: 4,
    project_id: 6,
  },
  {
    user_id: 5,
    project_id: 7,
  },
  {
    user_id: 5,
    project_id: 8,
  },
]
USERPROJECTS.each do |userproject|
  UserProject.create! userproject
end

# tasklists
TASKLISTS = [
  {
    name: "To Do",
    project_id: 1,
    user_id: 1,
  },
  {
    name: "In Progress",
    project_id: 1,
    user_id: 1,
  },
  {
    name: "Completed",
    project_id: 1,
    user_id: 1,
  },
  {
    name: "To Do",
    project_id: 6,
    user_id: 1,
  },
  {
    name: "In Progress",
    project_id: 6,
    user_id: 1,
  },
  {
    name: "Completed",
    project_id: 6,
    user_id: 1,
  },
  {
    name: "To Do",
    project_id: 8,
    user_id: 1,
  },
  {
    name: "In Progress",
    project_id: 8,
    user_id: 1,
  },
  {
    name: "Completed",
    project_id: 8,
    user_id: 1,
  },
  {
    name: "To Do",
    project_id: 7,
    user_id: 1,
  },
  {
    name: "In Progress",
    project_id: 7,
    user_id: 1,
  },
  {
    name: "Completed",
    project_id: 7,
    user_id: 1,
  },
]
TASKLISTS.each do |tasklist|
  Tasklist.create! tasklist
end

# tasks
TASKS = [
{
  name: "Create schema",
  tasklist_id: 1,
  project_id: 1,
  user_id: 1,
  description: "create initial database schema",
  due_date: "2021-08-13",
  completed: false,
},
{
  name: "Create Models",
  tasklist_id: 1,
  project_id: 1,
  user_id: 1,
  description: "create models",
  due_date: "2021-08-13",
  completed: false,
},
{
  name: "Update new product feature",
  tasklist_id: 1,
  project_id: 1,
  user_id: 3,
  description: "Update client's request",
  due_date: "2021-08-13",
  completed: false,
},
{
  name: "Test Functionality",
  tasklist_id: 2,
  project_id: 1,
  user_id: 1,
  description: "Test functionality of feature",
  due_date: "2021-08-13",
  completed: false,
},
{
  name: "Product Feature XY",
  tasklist_id: 3,
  project_id: 1,
  user_id: 1,
  description: "Test functionality of feature",
  due_date: "2021-08-13",
  completed: true,
},

{
  name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  tasklist_id: 3,
  project_id: 1,
  user_id: 1,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  due_date: "2021-08-13",
  completed: true,
},
{
  name: "Create Pamphlet",
  tasklist_id: 4,
  project_id: 6,
  user_id: 1,
  description: "create marketing pamphlets",
  due_date: "2020-12-30",
  completed: false,
},
{
  name: "Discuss marketing strategy",
  tasklist_id: 4,
  project_id: 6,
  user_id: 1,
  description: "discuss marketing strategy",
  due_date: "2021-08-13",
  completed: true,
},
{
  name: "Meet with client",
  tasklist_id: 10,
  project_id: 7,
  user_id: 1,
  description: "Meet with client",
  due_date: "2020-12-13",
  completed: false,
},
{
  name: "Discuss business requirements with client",
  tasklist_id: 11,
  project_id: 7,
  user_id: 1,
  description: "Business requirements",
  due_date: "2021-12-13",
  completed: false,
},
{
  name: "Meet with stakeholders",
  tasklist_id: 11,
  project_id: 7,
  user_id: 1,
  description: "Stakeholder meeting at location Y",
  due_date: "2021-12-13",
  completed: false,
},
]
TASKS.each do |task|
  Task.create! task
end

# comments
COMMENTS = [
  {
          text: "I'll work on this soon",
          task_id: 1,
          user_id: 1,
        },
        {
          text: "I've heard that before",
          task_id: 1,
          user_id: 2,
        },
]
COMMENTS.each do |comment|
  Comment.create! comment
end
puts "Done seeding"