const rejectRequestMailTemplate = (rejectReason) => {
  return `
    <div>
        <h1>Request Rejected</h1>
        <p>Your request has been rejected due to the following reason:</p>
        <p>${rejectReason}</p>
    </div>
    `;
};

module.exports = rejectRequestMailTemplate;
