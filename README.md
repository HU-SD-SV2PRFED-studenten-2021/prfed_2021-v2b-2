# Billy HBO-I Boekenkast — V2B-2
Welcome to the Billy project.
## Setup
First you need to set up the database user, the spring configuration expects to login with the following user:
```sql
CREATE USER "groep2" WITH CREATEDB PASSWORD 'groep2-password';
```
Next the database needs to be created, for that you can use this script:
```sql
CREATE DATABASE "v2b2-prfed" OWNER "groep2";
```

## Git strategy
For this project we used three branches:
### Main
This is the main branch, every release gets merged into this branch.
### Development
Every feature branch eventually gets merged into this branch and every pull happens from this branch.
### Feature
These are branches made for specific features, they are based on the development branch and when the feature is fully implemented this branch gets merged with development and deleted.

## Update log:
## v3.0
### User stories
This iteration we worked on three user stories:
#### As a system administrator, I want the wiki to have version control, so I can see who edited what.
This was divided into a few issues:
- Adding a user to an article
- Displaying the user on the article
#### As a system administrator, I want the ability to rollback to previous versions, so no information is lost.
This was divided into a few issues:
- Adding a table on every article's history tab
- Getting the history of an article and filling the table
- Adding a button that changes the article back to that state
#### As a user, I want to be able to search the wiki, so I can quickly find the information I need.
This was divided into a few issues:
- Creating a request that gets you all article titles
- Creating a search suggestion bar
### Other issues
There was another issue we worked on for this iteration. It was related to adding information to the database:
- Adding a button that shows a popup for creating an article
## v2.0
### User stories
This iteration we worked on four user stories:
#### As a user, I want the wiki to be divided into the matrix of categories, so the information I am looking for is findable.
This was divided into a few issues:
- Saving articles into the backend database
- Adding matrix categories to the wiki
#### As a user, I want to be able to edit the wiki, so I can update and add information.
This was divided into a few issues:
- Wireframe Edit modal
- HTML Edit modal
- CSS Edit modal
- JS Edit modal
#### As a system administrator, I want that only registered users are able to edit the wiki, so there are no unwanted edits.
This was divided into a few issues:
- Add a check before the editing process to see if the user is allowed to edit
#### As a user, I want to be able to turn on accessibility mode, so I can still get information with a disability.
This was divided into a few issues:
- Add three buttons for changing the font size
- Adding functionality to those buttons
- Add dark mode
### Other issues
There were some other issues we worked on for this iteration. They were related to the creation and accessibility of information:
- Setup of Heroku
- Dummydata for the database

## v1.0
### User stories
This iteration we worked on two user stories:
#### As guest, I want to be able to see the wiki, so I can read the information that is in it.
This was divided into a few issues:
- Wireframe Indexpage
- HTML Indexpage
- CSS Indexpage
- JS Indexpage
#### As user, I want to be able to log in, so I can add my knowledge to the wiki.
This was divided into a few issues:
- Wireframe Loginpage
- HTML Loginpage
- CSS Loginpage
- JS Loginpage
### Other issues
There were some other issues we worked on for this iteration. They were related to the startup of the project:
- Creation of the database
- Spring backend setup