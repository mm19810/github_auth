import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ReposPage() {
  const router = useRouter();
  const { token } = router.query;

  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchRepos = async () => {
      try {
        const response = await fetch(`/api/github/repos?token=${token}`);
        const data = await response.json();
        console.log(data)
        setRepos(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      }
    };

    fetchRepos();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(repos)
  return (
    <div>
      <ul>
        {
          repos?.filteredRepoData && Object.values(repos?.filteredRepoData).map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))
        }
      </ul>
      <>
      {
        repos?.message && <>
          {repos.message}
        </>
      }</>
    </div>
  );
}
