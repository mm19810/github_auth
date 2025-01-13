import axios from 'axios';

export default async function handler(req: any, res: any) {
  console.log(req.url)
  try {

    const url = `${process.env.NEXT_PUBLIC_API_URL}${req.url}`
    console.log("url ===>", url)

    const { data } = await axios.get(
      url
    );
    const { access_token } = data
    console.log(data)
    res.redirect(`/repos?token=${access_token}`)
    // const fetchDataUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/github/fetchData?accessToken=${access_token}`
    // console.log('fetchDataUrl', fetchDataUrl)
    // const { data: repos } = await axios.post(
    //   fetchDataUrl,
    //   {
    //     accessToken: access_token
    //   }
    // );
    // console.log(repos)
    // res.send(repos)
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'GitHub callback failed' });
  }
}
