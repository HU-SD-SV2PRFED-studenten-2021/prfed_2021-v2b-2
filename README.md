# Billy HBO-I Boekenkast - V2B-2
Welcome to the Billy project.
## Setup
First you need to set up the database user, the spring configuration expects to login with the following user:
```postgresql
    CREATE USER "groep2" WITH CREATEDB PASSWORD 'groep2-password';
```
Next the database needs to be created, for that you can use this script:
```postgresql
    CREATE DATABASE "v2b2-prfed" OWNER "groep2";
```