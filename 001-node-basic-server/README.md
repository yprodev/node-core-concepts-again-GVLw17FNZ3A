### Steps to use basic node server

1. In the root directory run `node app.js` 
2. Use this command to run the request in terminal

```bash
curl --location --request GET 'localhost:8000'
```

3. You may also do the POST request, and you should get the same result

```bash
curl --location --request POST 'localhost:8000' \
--header 'Content-Type: text/plain' \
--data-raw '{
    "data": "nothing"
}'
```

