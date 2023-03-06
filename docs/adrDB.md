# *WebApp ASD - Attendance Register ***Database*** Development*
- Status: proposed
- Deciders: Mirko Dall'aglio, Luca Galeno, Noel Lapedota, DanielePiani, AlessiaCaporaso, Eva Lateltin, Margherita Bonanno
- Date: 06/03/2023
  

## Context and Problem Statement
---
Create a webApp for the attendance register in the sports field.

There will be more trainers who will have a group of athletes and will have to register attendance at training sessions having access to a calendar and an admin who will assign athletes to trainers, insert them, delete them and modify anything. 

Below the customer requests to date:

___

**USERS:**
- Admin *(with full access)*
- Trainer *(with limited access)*


## ADMIN Requirements
- Ability to:
  - insert, delete, and edit **trainers**
  - insert, delete, and edit **athletes**
  - assign **athletes** to **one or more categories** (example category_A, category_B)
  - assign **trainer** to **one or more categories** (example category_A, category_B)
  - view the list of **athletes**, **categories** and **trainers**
  - view the **monthly hours** for **each trainer**, *with the option of generating a pdf file*
  - view a **monthly report "trainer : hours/monthly", **with the option of generating a pdf file**


## TRAINER Requirements
- Access to the **calendar**
- For each date, the trainer must be able to:
  - view the **list of own categories**
  - view the **list of athletes** assigned to the specific category
  - **flag** zero or more athletes as present for training
  - enter the number of **hours/minutes** of training (in increments of 30 minutes)
  - **confirm** what was entered
  - make **changes** to the entered data **up to 7 days** from the date
  - view the attendance list for each **month** and be able to **generate a PDF file**

___

## Decision Drivers
___
- Meet all requirements listed above
- Fit for our stack
- Feasible solution, which leads to the result within the established times
- Developer experience
- The earlier we decide on this, the better

## Considered Options
---
1. MySQL
2. MongoDB

## Decision Outcome
---
Chosen option: 1 or 2, because ....

### Positive Consequences
- {e.g., improvement of quality attribute satisfaction, follow-up decisions required, …}
- ...

### Negative Consequences
- {e.g., compromising quality attribute, follow-up decisions required, …}
- ...
  
## Pros and Cons of the Options
---
### option 1: MySql

- Good, Very popular and reliable software, as well as its flexibility and scalability;
- Good, It has high performance and availability, as well as extremely robust transactional support;
- Good, Provides stable code with lots of features.
- Good, It is available on almost all web space managers
- Bad, Unlike other apps, it lacks insight.
- Bad, Depending on usage, it requires large storage memory.

### option 2: MongoDB

- Good, It is highly adaptable and flexible to meet changing requirements and situations
- Good, It allows you to query and return fields within a document
- Good, It allows the storage of different types of files of different sizes without affecting your technology stack
- Good, Allows creation of indexes to improve search performance
- Bad, The ACID model is not strong compared to other database systems
- Bad, It consumes more memory and lacks joins or built-in parsing

## Links
---
- MySql => https://www.mysql.com/it/
- MongoDB => https://www.mongodb.com/