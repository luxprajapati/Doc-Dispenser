const approvedDocumentsListTemplate = ({ documentList }) => {
  return `
     <!DOCTYPE html>
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
      width: 100%;
      margin-top: 20px;
      font-size: 16px;
    }

    .content h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .document-links {
      margin-bottom: 20px;
    }

    .document-links ul {
      padding-left: 0;
      list-style: none;
    }

    .document-links ul li {
      margin-bottom: 10px;
    }

    .document-links ul li a {
      display: block;
      flex-direction: row;
      justify-items: flex-start;
      background-color: #0073e6;
      color: #fff;
      padding: 10px;
      border-radius: 5px;
      text-decoration: none;
      font-size: 14px;
      text-align: center;
      width: 75%;
      margin: auto;
      transform:translateX(-5px);
      cursor: pointer;
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
      <p>Your request for the following documents has been approved via <strong>DocDispenser</strong>. You can access the documents using the links below:</p>

      <div class="document-links">
        

        <ul>
        ${documentList.map((doc, index) => {
          return `<li><a href="${doc.link}">${doc.name}</a></li>`;
        })}.join("")
        </ul>
      </div>

      
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Thank you for using <strong>DocDispenser</strong>!</p>
      <p>If you have any questions, feel free to contact us at: <a href="mailto:prajapatilux1012@gmail.com">docdispenser@gmail.com</a></p>
      <p>Best regards,<br>The DocDispenser Team</p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = approvedDocumentsListTemplate;
