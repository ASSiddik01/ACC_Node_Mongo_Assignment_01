<hr>

## **_Random User API_**

<hr>

Random user API is build by node and express js. Those API are capable to provide and save user info as a json fromat with with API status

> N.B: onle underscore word is editable by its user

### **Routes**

<ol><li>/user/random</li>
<br>

> This API provide a random user info.

<li>/user/all</li>
<br>

> This API provide all user info.

<li>/user/save</li>
<br>

> This API save a user info end of the data. Provide data with body. Format is below

```bash
[
  {
    "id":user_id,
    "gender": "your_data",
    "name": "your_data",
    "contact": "your_data",
    "address": "your_data",
    "photoUrl": "your_data"
  }
]
```

<li>/user/update</li>
<br>

> This API update a user info by the given id. Provide data with body and id accept from query not param. Format is below

```bash
[
  {
  "contact": "your_data",
  "name": "your_data"
  }
]
```

<li>/user/bulk-update</li>
<br>

> This API update multiple user info by the given id. Provide id data with body. Format is below

```bash
[
  {
  "id": user_id,
  "name": "your_data"
  },
  {
  "id": user_id,
  "name": "your_data"
  }
]
```

<li>/user/ delete</li>
<br>

> This API delete a user info by the given id. Accept id from query not param

</ol>
