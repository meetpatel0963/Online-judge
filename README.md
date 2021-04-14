# Online-Judge
> #### An onlinejudge system based on Node and React (MERN Stack).

## Features
- [x] Authentication and Authorization (includes Email verification)
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
- [x] Create Coding Problems
- [x] Dashboard for Statistics
- [ ] Forgot password
- [ ] Contest
- [ ] Leaderboard
- [ ] Download Submissions
- [ ] Two-factor authentication
- [ ] OAuth login with Google, Facebook, and Github
- [ ] Problem upvote and download
- [ ] Specific blog for post and tutorials.

## Supported Languages
* C
* C++ 11/14/17 (GCC)
* Java 8
* Python 3

## Prerequisite
> ### Docker Desktop
> ### Node.js


## Setup Locally
### Make sure to install docker in your machine.

> #### Start Docker Desktop

```bash
git clone https://github.com/jojozhuang/online-judge-mean.git
cd online-judge
```
### Client
```bash
cd client
npm install
npm start
```

### Server
```bash
cd server
npm install
cd docker
docker build -t <Your_Image_Name> .
cd ..
npm start
```
### Make sure to start Docker Desktop before the command npm start. 

🎉 And that's it! You will now be able to visit <a href="http://localhost:3000/">http://localhost:3000/</a> URL and see your application up and running.

## Snapshots
![]('./images/signin.png')
![SignUp]('./images/signup.png')
![Problem]('./images/problem.png')
![Results]('./images/results.png')
![My Submission]('./images/mysubmission.png')
![Modal]('./images/modal.png')
![Dashboard]('./images/dashboard1.png')
![Dashboard]('./images/dashboard2.png')
![Tags]('./images/tagfilter.png')


## Thanks
+ I'd appreciate a star if you find this helpful.


## License

[MIT](http://opensource.org/licenses/MIT)

