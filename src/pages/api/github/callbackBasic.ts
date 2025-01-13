import axios from 'axios';

export default async function handler(req: any, res: any) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code from GitHub' });
  }

  try {
    console.log('CODE', code)  

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/github/callbackBasic?code=${code}`
    console.log(url)

    const { data: { installation_url } } = await axios.get(
      url
    );
    console.log("installation_url", installation_url)
    res.redirect(`${installation_url}`)
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'GitHub callback failed' });
  }
}
