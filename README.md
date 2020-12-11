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

## V1.0
### Use cases
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