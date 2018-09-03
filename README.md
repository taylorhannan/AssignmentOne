# Assignment 1 3813ICT
### Developed by Taylor Hannan

## Git Layout
*Describe the layout of your git repository and the approach you took for version control.*

The approach taken for version control was done by using frequent commits of an *error free* state of the project. This is done by frequent testing of all added features & functions.

## Main Data Structures
*Describe the main data structures used in the program. For example, how the users and groups are represented.*

## Angular Architecture
*Describe your Angular architecture in terms of components, services, and models.*
### Components
#### Admin Component

#### Chat Component

#### Home Component

#### Nav Component

### Services
#### Socket Service

### Models

## REST API
*The Angular front end should communicate with the Node.js server using a REST API. Describe each route provided, parameters, return values, and what it does.*
### User Routes
#### /api/auth
The 'auth' route is used to authorise users upon sign-in. It does so by taking the parameters *username* & *email* from the login form on the homepage. It then checks for an existing match of username & email in the userdata.json file; if there is a match, it allows access - returning true. The returned data is the username, email, and role from the userdata.json file, as well as success equaling true. If there is no match found, the response to Angular is the success criteria being false.

#### /api/reg
This route is used to manage user registration. It does so by taking the following parameters entered on the user registration form on the AdminComponent: *username*,  *email*, and *role*. When these parameters are received, it checks to see if there is already a match for username or a match for email (no two users can share the same username or email). If no match is found, it then writes the new user with the parameters it was sent from Angular to the userdata.json file and returns the parameters entered with the success parameter equaling *true*.

#### /api/del
To delete a user, this route must be used. It takes the parameter of the user's name, before reading for the match of the user name in the database. It then deletes the associated *email* & *role*, as well as the username specified. If no match for username is found, it returns *succcess* as *false*. If the deletion was successful, it filters the empty *{}* from the JSON object before writing it to the userdata.json file and returning the *username* & *success* equaling true.

#### /api/users
This route is only used to get data from the User JSON database to display the list of current users in an options loop of the admin component. When data is sent to the route, it returns the variable *userData* which is the contents of *userdata.json*.
This route requires no special parameters, only a request to be sent to it for it to return the user data.

### Group Routes
#### /api/groupreg
This route is used to manage group registration. It does so by taking the parameter *groupname* entered on the registration form on the AdminComponent. When this parameter is received, it checks to see if there is already a match for groupname (no two groups can share the same groupname). If no match is found, it then writes the new group with the name it was sent from Angular to the groupdata.json file and returns the parameter entered with the success parameter equaling *true*.

#### /api/groupdel
To delete a group, this route must be used. It takes the parameter of the group's name, before reading for the match of the group name in the database. It then deletes the group name specified. If no match for groupname is found, it returns *succcess* as *false*. If the deletion was successful, it filters the empty *{}* from the JSON object before writing it to the groupdata.json file and returning the *groupname* & *success* equaling true.

#### /api/groups
This provided route is only used to get data from the Group JSON database to display the list of current groups in an options loop of the admin component. When data is sent to the route, it returns the variable *groupData* which is the contents of *groupdata.json*.
This route requires no special parameters, only a request to be sent to it for it to return the user data.
