# *WebApp ASD - Attendance Register ***Back-End*** Development*
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
1. Node.JS
2. Python

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
### option 1: Node.JS

- Good, Speed – Non-blocking thread execution makes Node.js fast and efficient.
- Good, Maintainable – this is a fairly simple choice since both the frontend and backend can be managed solely with JavaScript.
- Good, Packages – There is a large set of open-source Node.js packages that can make your job easier. Today there are 1.3 million packages in the NPM ecosystem.
- Bad, because no developer on the team has ever used it

### option 2: Python

- Good, Python supports strong troubleshooting with clean and compact code. Additionally, Python’s lack of parallel processing ability makes debugging much easier.
- Good, developing an application in less code
- Bad, Python is an interpreted language, which means it doesn't convert directly to machine code. Instead, it compiles it to byte code first, thus lengthening the execution time
- Bad, Python is not compatible with mobile app development as it is not a preferred language for native app development.

## Links
---
- Node.JS => https://nodejs.org/en/
- Python => https://www.python.org/