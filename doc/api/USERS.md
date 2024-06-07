# Users API

## Table of Contents

- [Users API](#users-api)
  - [Table of Contents](#table-of-contents)
  - [Info](#info)
    - [GET **/users**](#get-users)
    - [GET **/users/devices**](#get-usersdevices)
    - [POST **/users**](#post-users)
    - [POST **/users/device**](#post-usersdevice)
    - [POST **/users/lookupPhoneNumber**](#post-userslookupPhoneNumber)
    - [POST **/users/:id/verify/:verificationId**](#post-usersidverifyverificationid)
    - [PATCH **/users**](#patch-users)
    - [POST **/users/logout**](#post-userslogout)
    - [DELETE **/users/:id**](#delete-usersid)

## Info

---

### GET **/users**

Gets user information based on id.

| Parameter | In  | Required | Default | Type |
| --------- | --- | -------- | ------- | ---- |
| ✘         | ✘   | ✘        | ✘       | ✘    |

Request example:

```
GET <YOUR-HOST-HERE>/api/v1/users
```

Response:

```json
{
  "status": 200,
  "message": "OK",
  "data": {
    "id": 100,
    "firstName": "mock-firstName",
    "lastName": "mock-lastName",
    "phoneNumber": "mock-phoneNumber",
    "email": "mock@email.com",
    "paymentCardId": 100
  }
}
```

---
### GET **/users/devices**

Gets user information based on id.

| Parameter | In  | Required | Default | Type |
| --------- | --- | -------- | ------- | ---- |
| ✘         | ✘   | ✘        | ✘       | ✘    |

Request example:

```
GET <YOUR-HOST-HERE>/api/v1/users/devices
```

Response:

```json
{
    "status": 200,
    "message": "OK",
    "data": [
        {
            "id": 1,
            "deviceType": "ios",
            "deviceToken": "cxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudf",
            "userId": 8,
            "createdAt": "2022-09-27T16:39:59.386Z",
            "updatedAt": "2022-09-27T16:39:59.386Z"
        },
        {
            "id": 2,
            "deviceType": "android",
            "deviceToken": "cxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudf",
            "userId": 8,
            "createdAt": "2022-09-27T16:41:02.897Z",
            "updatedAt": "2022-09-27T16:41:02.897Z"
        }
    ]
}
```

---
### POST **/users**

Creates new user with given `phone number`, then sends SMS with dynamic link to verify.

| Parameter   | In   | Required | Default | Type     |
| ----------- | ---- | -------- | ------- | -------- |
| phoneNumber | body | ✔        | ✘       | `string` |
| isSendSMS   | body | ✘        | ✘       | `boolean`|
| app_version | body | ✘        | ✘       | `string` |
| device      | body | ✘        | ✘       | `string` |
| os          | body | ✘        | ✘       | `string` |
| os_version  | body | ✘        | ✘       | `string` |


Request example:

```
POST <YOUR-HOST-HERE>/api/v1/users

body {
  "phoneNumber": "+12025550100",
  "isSendSMS": false,
  "app_version": "1.0.3",
  "device": "Xiaomi 2109119DI",
  "os": "android",
  "os_version": "31"
}
```

Response:

```json
{
  "status": 201,
  "message": "Created",
  "data": {
    "id": 100, // mock value
    "isReturning": false
  }
}
```
---
### POST **/v2/users**

Creates new user with given `phone number`.

| Parameter   | In   | Required | Default     | Type     | Allowed Value                        |
| ----------- | ---- | -------- | -------     | -------- |   --------                           |
| phoneNumber | body | ✔        | ✘           | `string` |                                      |
| type        | body | ✘        | `Self Serve`| `string` |[Self Serve, Assisted Onboarding]     |
| app_version | body | ✘        | ✘           | `string` |                                      |
| device      | body | ✘        | ✘           | `string` |                                      |
| os          | body | ✘        | ✘           | `string` |                                      |
| os_version  | body | ✘        | ✘           | `string` |                                      |


Request example:

```
POST <YOUR-HOST-HERE>/api/v2/users

body {
  "phoneNumber": "+12025550100",
  "type": "Assisted Onboarding",
  "app_version": "1.0.3",
  "device": "Xiaomi 2109119DI",
  "os": "android",
  "os_version": "31"
}
```

Response:

```json
{
  "status": 201,
  "message": "Created",
  "data": {
    "id": 100, // mock value
    "isReturning": false,
    "verificationId": "51f5d580efc5bdeb4c18b7cd46916fd7931396f9455ff2243fabf44252035be81dc1de1621cdfd91bef6cd83f6ce3f2629e3db58c0389f400e23a093d4635b7931175a1ed9d1a51f1395a033ac09fa4b52116f8760a084da1721ab30f738dff8ad0c91990cf0a05ac6b90ee39b381a7b038f547a2e2a53eb4ee718d5726dabb6f1bbd89dc8aeb05870670af8dfbbfb11582a382c48d751732b0c76384ab166eb3c4131628faab1b4ea3c882290b938e3508ed25d6d8794718a46be77b526acca62b95cd21dea01f987ca1ac4055cbc7d68181d8c9d6e0e65af1d885400727101742bf7926d6bc6448c53da0a4cc1b2030c89195105820727d0fbee8199fafc5f9830c03d95aaa16cf21fa755e2512d1a87b6d450a7aa561716ca98f261581db34bf51176fb686ff4eca2c98f82585772b41edf2ca2bde972932ce256ef6291fedd92ccc9fd1a4615f02a3c6d797832b2b16cb35a78ab3c2defd2dea58e06a43164366efeea4bb7f684a3b42b2859d7b462f121bf81178e64418af27d8267f3f0a45dea4f7570aa0a1af6a03f8dd50668f775177ab08670914f284bce054100fd876ad4c560f57e9792440fc834aee53c74cde35754650f6dd437c96896ce0bcba06be713795b5ebe9100a98a8473806fd0b63c583f6ac06569f436c55e5006e239b33e02704b89a82f33b0aef65f2228d2161309fd016a52768413894e319d17"
  }
}
```
---

### POST **/v2/users/createGuestUser**

Creates new user with given `deviceId`.

| Parameter   | In   | Required | Default     | Type     | Allowed Value                        |
| ----------- | ---- | -------- | -------     | -------- |   --------                           |
| deviceId    | body | ✔        | ✘           | `string` |                                      |
| type        | body | ✘        | `Self Serve`| `string` |[Self Serve, Assisted Onboarding]     |
| app_version | body | ✘        | ✘           | `string` |                                      |
| device      | body | ✘        | ✘           | `string` |                                      |
| os          | body | ✘        | ✘           | `string` |                                      |
| os_version  | body | ✘        | ✘           | `string` |                                      |


Request example:

```
POST <YOUR-HOST-HERE>/api/v2/users/createGuestUser

body {
  "deviceId": "ABC123",
  "type": "Assisted Onboarding",
  "app_version": "1.0.3",
  "device": "Xiaomi 2109119DI",
  "os": "android",
  "os_version": "31"
}
```

Response:

```json
{
  "status": 201,
  "message": "Created",
  "data": {
    "id": 100, // mock value
    "isReturning": false,
    "verificationId": "51f5d580efc5bdeb4c18b7cd46916fd7931396f9455ff2243fabf44252035be81dc1de1621cdfd91bef6cd83f6ce3f2629e3db58c0389f400e23a093d4635b7931175a1ed9d1a51f1395a033ac09fa4b52116f8760a084da1721ab30f738dff8ad0c91990cf0a05ac6b90ee39b381a7b038f547a2e2a53eb4ee718d5726dabb6f1bbd89dc8aeb05870670af8dfbbfb11582a382c48d751732b0c76384ab166eb3c4131628faab1b4ea3c882290b938e3508ed25d6d8794718a46be77b526acca62b95cd21dea01f987ca1ac4055cbc7d68181d8c9d6e0e65af1d885400727101742bf7926d6bc6448c53da0a4cc1b2030c89195105820727d0fbee8199fafc5f9830c03d95aaa16cf21fa755e2512d1a87b6d450a7aa561716ca98f261581db34bf51176fb686ff4eca2c98f82585772b41edf2ca2bde972932ce256ef6291fedd92ccc9fd1a4615f02a3c6d797832b2b16cb35a78ab3c2defd2dea58e06a43164366efeea4bb7f684a3b42b2859d7b462f121bf81178e64418af27d8267f3f0a45dea4f7570aa0a1af6a03f8dd50668f775177ab08670914f284bce054100fd876ad4c560f57e9792440fc834aee53c74cde35754650f6dd437c96896ce0bcba06be713795b5ebe9100a98a8473806fd0b63c583f6ac06569f436c55e5006e239b33e02704b89a82f33b0aef65f2228d2161309fd016a52768413894e319d17"
  }
}
```
---

### POST **/users/device**

Creates new user with given `phone number`, then sends SMS with dynamic link to verify.

| Parameter    | In   | Required | Default | Type     |
| -----------  | ---- | -------- | ------- | -------- |
| device_type  | body | ✔        | ✘       | `string` |
| device_token | body | ✔        | ✘       | `string` |

Request example:

```
POST <YOUR-HOST-HERE>/api/v1/users/device

body {
    "device_type": "android",
    "device_token": "cxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudf"
}
```

Response:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "id": 2,
        "userId": 8,
        "deviceType": "android",
        "deviceToken": "cxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudfcxvvcvfsaddasdaddadasjfiyufnc78798kjxncudf",
        "createdAt": "2022-09-27T16:41:02.897Z",
        "updatedAt": "2022-09-27T16:41:02.897Z"
    }
}
```

---
### POST **/users/lookupPhoneNumber**

Verify given phonenumber.

| Parameter   | In   | Required | Default | Type     |
| ----------- | ---- | -------- | ------- | -------- |
| phoneNumber | body | ✔        | ✘       | `string` |

Request example:

```
POST <YOUR-HOST-HERE>/api/v1/users/lookupPhoneNumber

body {
  "phoneNumber": "+12025550100"
}
```

Response:

```json
{
    "status": 200,
    "message": "OK",
    "data": {
        "mobile_country_code": "404",
        "mobile_network_code": "98",
        "name": "Airtel",
        "type": "mobile",
        "error_code": null
    }
}
```

---
### POST **/users/:id/verify/:verificationId**

Verifies newly created user account. Verification is actual for `VERIFICATION_EXPIRE` (10 minutes).

| Parameter      | In     | Required | Default | Type     |
| -------------- | ------ | -------- | ------- | -------- |
| id             | params | ✔        | ✘       | `number` |
| verificationId | params | ✔        | ✘       | `number` |

Request example:

```
POST <YOUR-HOST-HERE>/api/v1/users/100/verify/<VERIFICATION-ID-HERE>
```

Response:

```json
{
  "status": 204,
  "message": "No Content"
}
```

---

### PATCH **/users**

Updates already existing user data with it's id.
At least one `body` param should present.

| Parameter | In   | Required | Default | Type     |
| --------- | ---- | -------- | ------- | -------- |
| firstName | body | ✘        | ✘       | `string` |
| lastName  | body | ✘        | ✘       | `string` |
| email     | body | ✘        | ✘       | `string` |

Request example:

```
PATCH <YOUR-HOST-HERE>/api/v1/users

body {
  "email": "mock-email",
  "firstName": "mock-firstName",
  "lastName": "mock-lastName"
}
```

Response example:

```json
{
  "status": 204,
  "message": "No Content"
}
```

---

### PATCH **/users**

Updates already existing user data with it's id.
At least one `body` param should present.

| Parameter   | In   | Required | Default | Type     |
| ---------   | ---- | -------- | ------- | -------- |
| firstName   | body | ✘        | ✘       | `string` |
| lastName    | body | ✘        | ✘       | `string` |
| email       | body | ✘        | ✘       | `string` |
| phoneNumber | body | ✘        | ✘       | `string` |

Request example:

```
PATCH <YOUR-HOST-HERE>/api/v2/users

body {
  "email": "mock-email",
  "firstName": "mock-firstName",
  "lastName": "mock-lastName",
  "phoneNumber": "mock-phoneNumber"
}
```

Response example:

```json
{
  "status": 204,
  "message": "No Content"
}
```

---

### POST **/users/logout**

Logs out already existing user.

| Parameter | In  | Required | Default | Type |
| --------- | --- | -------- | ------- | ---- |
| ✘         | ✘   | ✘        | ✘       | ✘    |

Request example:

```
POST <YOUR-HOST-HERE>/api/v1/users/logout
```

Response example:

```json
{
  "status": 204,
  "message": "No Content"
}
```

---

### DELETE **/users/:id**

Deletes user with it's id.

| Parameter | In  | Required | Default | Type |
| --------- | --- | -------- | ------- | ---- |
| ✘         | ✘   | ✘        | ✘       | ✘    |

Request example:

```
DELETE <YOUR-HOST-HERE>/api/v1/users
```

Response:

```json
{
  "status": 204,
  "message": "No Content"
}
```

---

**[⬆ back to the top](#table-of-contents)**

*[⬅️ back to the root](/README.md#go-squire-backend)*
