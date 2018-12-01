# cognito-node-api

aws-cognito authentication

<img src="./docs/img/logo_aws_cognito.jpg" width="30" height="30" style="float: right"/> <img src="./docs/img/logo_nodejs.png" width="30" height="30" style="float: right" />

### Prerequisites

```
Nodejs
```

### Installing

Open the terminal and execute the commands

- clone repository

```
git clone https://github.com/thiagosimaome/cognito-node-api.git
cd cognito-node-api
```

- install packages

```
npm install
```

## Config aws-cognito

When creating the userpool define several login options, and also set the email and phone fields as required, as shown below

![Image cognito attributes](./docs/img/model_aws_cognito.png)

## Config node-api

Get the user pool id and client application id registered in the userpool of the cognito

```
  cognito-node-api/config/conf.js

  one userpool

  Pools: {
    default: {
      Region: "USER_POLL_REGION",
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    }
  }

  multiples userpools

  Pools: {
    UserPool1: {
      Region: "USER_POLL_REGION",
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    },
    UserPool2: {
      Region: "USER_POLL_REGION",
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    },
    UserPool3: {
      Region: "USER_POLL_REGION",
      UserPoolId: "USER_POLL_ID_COGNITO",
      ClientId: "CLIENT_ID_COGNITO"
    }
  }

```

## Start

```
npm start
```

## Routes

![Image cognito attributes](./docs/img/complain.png) if you do not pass field type with parameter in the request, we will use the first configuration defined in the config file

#### POST : /user/create

_Create user_

```
Model : {
  "username": "teste@gmail.com",
  "password": "123456",
  "phone"   : "+5511912365478",
  "type"    : "UserPool2" -- optional
}

```

#### POST : /user/confirm

_Confirme user_

```
Model : {
  "username": "teste@gmail.com",
  "code    ": "123456",
  "type"    : "UserPool2" -- optional
}

```

#### POST : /user/resend

_Resend Code to User Email_

```
Model : {
  "username": "teste@gmail.com",
  "type"    : "UserPool2"
}

```

#### POST : /user/signin

_Signin for aws-cognito_

```
Model : {
  "username" : "teste@gmail.com",
  "password" : "123456",
  "type"     : "UserPool2"
}

```

#### POST : /user/signout

_Signout for aws-cognito_

```
Model : {
  "username" : "teste@gmail.com",
  "type"     : "UserPool2"
}

```

#### POST : /user/forgot-password

_Resend the code to retrieve the password_

```
Model : {
  "username" : "teste@gmail.com",
  "type"     : "UserPool2"
}
```

#### POST : /user/forgot-password-confirm

_Resend the code to retrieve the password_

```
Model : {
  "username"   : "teste@gmail.com",
  "code"       : "123456",
  "newPassword":"159357",
  "type"       : "UserPool2"
}
```

#### POST : /user/refresh-session

_Refreshes User Session_

```
Model : {
  "username"   		: "teste@gmail.com",
  "refreshToken"    : "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYW...",
  "type"       		: "UserPool2"
}
```

#### POST : /user/validate

_Validates User Session_

```
Model : {
  "accessToken"    : "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYW...",
  "type"       		: "UserPool2" -- optional
}
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [(aws cognito node api)](https://github.com/your/project/tags).

## Contributors

- **thiago-js** - [Git](https://github.com/thiago-js)
- **erick-martins** - [Git](https://github.com/erick-martins)

## Acknowledgments

- Inspiration
  - in some cases we need some fast authentication mechanism this project serves to meet this need
