import React, { useState } from 'react';
import axios from 'axios';

const AudienceCreation = () => {
  const [rules, setRules] = useState([]);
  const [audienceSize, setAudienceSize] = useState(null);

  const addRule = (rule) => {
    setRules([...rules, rule]);
  };

  const checkAudienceSize = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/audience', { rules });
      setAudienceSize(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Audience</h2>
      <form onSubmit={(e) => { e.preventDefault(); checkAudienceSize(); }}>
        {/* Add form fields for rules */}
        <button type="button" onClick={() => addRule('Sample Rule')}>Add Rule</button>
        <button type="submit">Check Audience Size</button>
      </form>
      {audienceSize && <p>Audience Size: {audienceSize}</p>}
    </div>
  );
};

export default AudienceCreation;
