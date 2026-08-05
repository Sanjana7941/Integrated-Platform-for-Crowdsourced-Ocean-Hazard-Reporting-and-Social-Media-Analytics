const API_BASE_URL = 'https://integrated-platform-for-crowdsourced.onrender.com/api';

export const fetchReports = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`);
    if (!response.ok) throw new Error('Failed to fetch reports');
    return await response.json();
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
};

export const submitReport = async (reportData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });
    if (!response.ok) throw new Error('Failed to submit report');
    return await response.json();
  } catch (error) {
    console.error('Error submitting report:', error);
    throw error;
  }
};
