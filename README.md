# Online-Judge
> #### An Online-judge system based on Node and React (MERN Stack). 
## Features
- [x] Authentication and Authorization
- [x] Submit your code
- [x] Test your code
- [x] Results shows Time (Sec) and Memory (MB)
- [x] Verdicts
    * Time Limit Exceeded (TLE)  ![](https://www.codechef.com/misc/clock_error.png)
    * Memory Limit Exceeded (MLE)  ![](https://www.codechef.com/misc/runtime-error.png)
    * Compilation Error (CE)  ![](https://s3.amazonaws.com/codechef_shared/misc/alert-icon.gif)
    * Runtime Error (RTE)  ![](https://www.codechef.com/misc/runtime-error.png)
    * Wrong Answer (WA)  ![](https://www.codechef.com/misc/cross-icon.gif)
    * Accepted (AC)  ![](https://www.codechef.com/misc/tick-icon.gif)
- [x] See your submissions
- [x] Filter problems based on tags
- [x] Search problems by name
- [x] Dashboard for Statistics
- [x] Create Coding Problems
- [ ] E-mail verification
- [ ] Forgot password
- [ ] Leaderboard

## Supported Languages
* C
* C++ 11/14/17 (GCC)
* Java 8
* Python 3

## Prerequisite
+ Docker Desktop
+ Node.js

## Env Variables

> #### In judge/config/config.js:

```
PORT = 5000
JWT_PRIVATE_KEY = <Your_JWT_Token>
BACK_SERVER_URL = <Spring_Server_URL>
```

## Setup Locally
### Make sure to install docker in your machine.

> #### Start Docker Desktop

```bash
git clone https://github.com/meetpatel0963/Online-judge.git
cd online-judge
```
### Client
> #### In client/src/config/config.js:
#### Change BACK_SERVER_URL="http://localhost:<spring_server_port>" 
#### Change JUDGE_URL="http://localhost:<judge_server_port>"

```bash
cd client
npm install
npm start
```

### Server
> #### Start Spring Boot Server
#### Change PATH_INIT={{Path to Server Directory}} in judge/judge.js
```bash
cd judge
mkdir submissions
npm install
cd docker
docker build -t <Image_Name> .
cd ..
npm start
```
### Make sure to start Docker Desktop before the command npm start. 

🎉 And that's it! You will now be able to visit <a href="http://localhost:3000/">http://localhost:3000/</a> URL and see your application up and running.

## Snapshots
### SignIn
![SignIn](./images/signin.png)
### SignUp
![SignUp](./images/signup.png)
### ProblemSet
![Problem](./images/problemset.png)
### Problem Page
![Problem](./images/problem1.png)
![Problem](./images/problem2.png)
### Code Editor
![Problem](./images/codeeditor.png)
### Results
![Results](./images/results.png)
### Add Problem Page
![AddProblem](./images/addproblem1.png)
![AddProblem](./images/addproblem2.png)
### User Submissions
![My Submission](./images/usersubmission.png)
### User Submission Modal
![Modal](./images/modal.png)
### Dashboard Charts
![Dashboard](./images/dashboard1.png)
### Dashboard Charts
![Dashboard](./images/dashboard2.png)


## Thanks
+ I'd appreciate a star if you find this helpful.


## License

[MIT](http://opensource.org/licenses/MIT)

