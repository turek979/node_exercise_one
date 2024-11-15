const listOfUsers = ["user1", "user2", "user3", "user4"];

function requestHandler(request, response) {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.write(`
            <html> 
                <head>
                    <title>Greetings</title>
                </head>
                <body>
                <h1 style="text-align: center">Greetings on my exercise!</h1>
                </body>
            </html>
            `);
    return response.end();
  }
  if (url === "/users") {
    let tableOfUsers = "";
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
}

module.exports = {
  handler: requestHandler,
};
