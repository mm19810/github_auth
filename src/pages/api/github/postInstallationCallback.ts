import axios from 'axios';

export default async function handler(req: any, res: any) {
  console.log(req.url)
  try {

    const url = `${process.env.NEXT_PUBLIC_API_URL}${req.url}`
    console.log("url", url)
    // const githubAuthData = await axios(url);

    const { data } = await axios.get(
      url
    );
    const { next_step_authorization_url } = data
    console.log("installation_url", next_step_authorization_url)
    res.redirect(next_step_authorization_url)
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'GitHub callback failed' });
  }
}
