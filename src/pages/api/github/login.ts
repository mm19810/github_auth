import axios from 'axios'

export default async function handler(req: any, res: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/github/startBasicAuthorization`
    console.log(url)
    const { data: { authorization_url: githubAuthUrl } } = await axios(url);
    console.log("test", githubAuthUrl)
    res.redirect(githubAuthUrl)
  } catch (error: any) {
    console.log(error)
    throw error
  }
}


