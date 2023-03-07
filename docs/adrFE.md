# *WebApp ASD - Attendance Register ***Front-End*** Development*
- Status: approved
- Deciders: Mirko Dall'aglio, Luca Galeno, Noel Lapedota, DanielePiani, AlessiaCaporaso, Eva Lateltin, Margherita Bonanno
- Date: 07/03/2023
  

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
1. React
2. Vue.Js
3. Javascript Vanilla

## Decision Outcome
---
Chosen option: ***Vue.JS*** 

The decision to use Vue.js as a technology was motivated by the team's desire to learn new skills and knowledge on a modern and widely used framework in the world of web development. Given the inexperience of the team with Vue.js, it was felt that the choice of this technology offered the opportunity to acquire new skills and to deepen the knowledge of an extremely useful and widespread component in the field of front-end development, improving thus their own value and what they can offer in the future.

### Positive Consequences
- Greater efficiency and speed of development
- Experience for team members

### Negative Consequences
- although Vue's learning curve is fast it still takes some time to learn
  
## Pros and Cons of the Options
---
### option 1: React

- Good, because can be integrated into the app even in individual parts
- Good, because it is performing, thanks to the virtualDom it updates only the part of the page that is modified
- Good, because it is easy to test
- Good, because it's easy to learn, not being a framework but just a library
- Bad, because no developer on the team has ever used it

### option 2: Vue.Js

- Good, because takes inspiration from Angular and React, taking the best points between the two
- Good, fast rendering
- Good, because everything is a component, therefore divisible into smaller parts without having monolithic blocks
- Good, because the components are written in js, html, css making the code very readable
- Bad, no developer on the team has ever used it
- Bad, it is too flexible, this can be an advantage but could complicate things in more complex apps

### option 3: Javascript Vanilla

- Good, because it is already known by the team members who will take care of the frontend
- Good, because it is a native browser language, there is no need to compile it
- Bad, because it doesn't offer the same performance as Vue or React
- Bad, it's easier to overbloat the page and write too large portions if not handled well

## Links
---
- React => https://it.reactjs.org/
- Vue.JS => https://vuejs.org/
- Javascript => https://www.javascript.com/