Leisurely ActivityFinder

Description:
Are you looking for the latest activities? This app might be for you. Use Leisurely Activity Finder to find events in your area. You can bookmark and register to receive an Email with all details you need.

AUTH

| Route         | HTTP Verb | Description                                                  | View                                     |
| ------------- | --------- | ------------------------------------------------------------ | ---------------------------------------- |
| auth/register | GET       | shows register form                                          | auth - register                          |
| auth/register | POST      | checks user input, creates user and sends confirmation email | redirect to login                        |
| auth/login    | GET       | shows login form                                             | auth - login                             |
| auth/login    | POST      | check user data                                              | if login successful, redirect to profile |
| auth/logout   | GET       | logout user                                                  | redirect to auth -login                  |

PROFILE

| Route                        | HTTP Verb | Description                  | View                     |
| ---------------------------- | --------- | ---------------------------- | ------------------------ |
| profile/                     | GET       | show profile                 | profil                   |
| profile/savedactivities      | GET       | show bookmarked activities   | profile/saved-activities |
| profile/going                | GET       | show registered activities   | profile/going            |
| profile/search-results       | GET       | show filtered search-results | profile/search-results   |
| profile/search-results       | POST      | finds name from req.body     | profile/serach-results   |
| profile/json-list            | GET       | get activities list in json  | profile/json-list        |
| profile/json-list-unregister | GET       | removes bookmark             | profile                  |

ACTIVITIES

| Route            | HTTP Verb | Descriptoin                                              | View                                          |
| ---------------- | --------- | -------------------------------------------------------- | --------------------------------------------- |
| a/create         | GET       | show create new activity form                            | activities/new-activity                       |
| a/create         | POST      | create new activity                                      | redirect to /profile after created activitity |
| a/:id/edit       | GET       | show edit on activity-details                            | activities/edit-activites                     |
| a/:id/edit       | POST      | save edited activity                                     | redirect to profile                           |
| a/:id/delete     | POST      | show delete activity in activity-details                 | redirect to profile                           |
| a/:id/save       | POST      | bookmarks activity                                       | redirect to profile/savedactivities           |
| a/:id/unsave     | POST      | remove bookmark on activity from saved list              | redirect to profile                           |
| a/:id/register   | POST      | register for activity and receive email confirmation     | redirect to profile/going                     |
| a/:id/unregister | POST      | remove register from saved-activities                    | redirect to profile/savedactivities           |
| a/:id            | GET       | get activity detail, user, bookmarks, register, comments | activities/activites-details                  |

SETTINGS

| Route                       | HTTP Verb          | Description                                                | View                          |
| --------------------------- | ------------------ | ---------------------------------------------------------- | ----------------------------- |
| settings/user-settings      | show user settings | show user settings                                         | settings/user-settings        |
| settings/user-settings-edit | GET                | being able to edit user settings                           | settings/user-settings-edit   |
| settings/user-settings-edit | POST               | upload profile picture cloudinary, update personal profile | render settings/user-settings |

COMMENTS

| Route                 | HTTP Verb | Description                                                      | View                |
| --------------------- | --------- | ---------------------------------------------------------------- | ------------------- |
| a/:id/comments        | GET       | show comment field in activity-details                           | activities/comments |
| a/:id/comments        | POST      | get comment from comments view, post comment in activity-details | redirect to a/:id   |
| a/:id/comments/delete | POST      | delete comment (fix required)                                    | redirect to a/:id   |
