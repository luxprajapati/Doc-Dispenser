const requestedDocumentListTemplate = ({
  username,
  documentList,
  approveUrl,
  rejectUrl,
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
      color: #333;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      padding: 20px 0;
      background-color: #e4e8ec;
    }

    .header h1 {
      font-size: 24px;
      color: #333;
      margin: 0;
    }

    .content {
      margin-top: 20px;
      font-size: 16px;
    }

    .content h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .document-list {
      margin-bottom: 20px;
    }

    .document-list ul {
      list-style: decimal;
      padding-left: 20px;
    }

    .document-list ul li {
      margin-bottom: 5px;
    }

    .buttons {
      text-align: center;
      margin: 20px 0;
    }

    .buttons a {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10px;
      text-decoration: none;
      color: #fff;
      border-radius: 5px;
      font-size: 16px;
    }

    .approve-btn {
      background-color: #22c55e;
    }

    .reject-btn {
      background-color: #ef4444;
    }

    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #777;
    }

    .footer a {
      color: #0073e6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>docDispenser</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <p>Hey,</p>
      <p><strong>${username}</strong> has requested access to the following documents via <strong>DocDispenser</strong>:</p>
      <div class="document-list">
        <ul>
          ${documentList.map((doc) => `<li>${doc.name}</li>`).join("")}
        </ul>
      </div>

      <p>If you would like to share the requested documents, you can approve or reject the request by clicking one of the following options:</p>
      
      <!-- Approve/Reject buttons -->
      <div class="buttons">
        <a href="${approveUrl}" class="approve-btn">Approve</a>
        <a href="${rejectUrl}" class="reject-btn">Reject</a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Thank you for using <strong>DocDispenser</strong>!</p>
      <p>For any queries, feel free to contact us at: <a href="mailto:docdispenser@gmail.com">docdispenser@gmail.com</a></p>
      <p>Best regards,<br>The DocDispenser Team</p>
    </div>
  </div>
</body>
</html>
`;
};

module.exports = requestedDocumentListTemplate;
