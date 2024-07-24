const approvedDocumentsListTemplate = (
  secureLinks,
  requestedDocuments,
  expiryTime
) => {
  return `

      <h3>Document Access Approved</h3>
      <p>You have been granted access to the following documents:</p>
      <ul>
        ${secureLinks.map((link) => `<li><a href="${link.url}"></a></li>`).join("")}
      </ul>
      <p>Please note that these links will expire in ${expiryTime}.</p>
  `;
};

module.exports = approvedDocumentsListTemplate;
