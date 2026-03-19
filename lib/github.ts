export async function getStarCount() {
  const res = await fetch(
    "https://api.github.com/repos/jsy1023/AtomDesignToken",
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 }, // 1시간마다 캐싱 갱신
    }
  );

  if (!res.ok) {
    return 0; // 에러 시 기본값 0
  }

  const data = await res.json();
  return data.stargazers_count;
}
