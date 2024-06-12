import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/campaigns')
      .then(response => setCampaigns(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Past Campaigns</h2>
      <ul>
        {campaigns.map(campaign => (
          <li key={campaign.id}>{campaign.message} - Sent: {campaign.sent} - Failed: {campaign.failed}</li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
