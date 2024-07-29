const requestedDocumentListTemplate = (
  requestedUser,
  requestedUserEmail,
  requestDocuments,
  approveLink,
  rejectLink
) => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      padding: 20px;
      margin: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #007bff;
      margin-top: 0;
    }

    p {
      font-size: 16px;
      margin: 10px 0;
    }

    ul {
      list-style-type: disc;
      margin: 10px 0;
      padding-left: 20px;
    }

    li {
      margin-bottom: 5px;
    }

    .button-container {
      margin-top: 20px;
    }

    .button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .button:hover {
      background-color: #0056b3;
    }

    .reject-button {
      background-color: #dc3545;
    }

    .reject-button:hover {
      background-color: #c82333;
    }
  </style>
</head>

<body>
  <div class="container">
    <h3>Document Request Received</h3>
    <p>${requestedUser}[${requestedUserEmail}] has requested access to the following documents:</p>
    <ul>
      ${requestDocuments.map((docId) => `<li>${docId.documentName}</li>`).join("")}
    </ul>
    <div class="button-container">
      <a href="${approveLink}" class="button">Approve</a>
      <a href="${rejectLink}" class="button reject-button">Reject</a>
    </div>
  </div>
</body>

</html>
  `;
};

module.exports = requestedDocumentListTemplate;
