const listOfUsers = ["user1", "user2", "user3", "user4"];

function requestHandler(request, response) {
  const url = request.url;
  const method = request.method;
  let tableOfUsers = "";

  if (url === "/") {
    response.write(`
            <html> 
                <head>
                    <title>Greetings</title>
                </head>
                <body>
                <h1 style="text-align: center">Greetings on my exercise!</h1></br></br>
                <div style="text-align: center">
                <form action="/create-user" method="POST"><input type="text" name="new_user"><button type="submit">Send</button></form>
                </div>
                </body>
            </html>
            `);
    return response.end();
  }
  if (url === "/users") {
    for (let i in listOfUsers) {
      tableOfUsers = tableOfUsers + `<li>${listOfUsers[i]}</li>`;
      //   console.log(tableOfUsers);
    }
    response.write(`
            <html>
                <head>
                    <title>Users List</title>
                </head>
                <body>
                    <ul>
                    ${tableOfUsers}
                    </ul>
                </body>
            </html>
            `);
    return response.end();
  }
  if ((url === "/create-user") & (method === "POST")) {
    const dataBody = [];
    request.on("data", (chunk) => {
      dataBody.push(chunk);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(dataBody).toString();
      const newUser = parsedBody.split("=")[1];
      listOfUsers.push(newUser);
      response.statusCode = 302;
      response.setHeader("Location", "/users");
      return response.end();
    });
  }
}

module.exports = {
  handler: requestHandler,
};
