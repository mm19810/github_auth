import axios from 'axios';

export default async function handler(req: any, res: any) {
  const { token } = req.query;

  console.log("token ===>", token)
  if (!token) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const fetchDataUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/github/fetchData?accessToken=${token}`
    console.log('fetchDataUrl', fetchDataUrl)
    const { data: repos } = await axios.post(
      fetchDataUrl,
      {
        accessToken: token
      }
    );
    console.log(repos)
    res.send(repos)
   } catch (error: any) {
    console.error('Error fetching repositories:', error?.response?.data || error?.message);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
}