export async function fetchBusinesses(zip = '97086', search = '') {
  const params = new URLSearchParams();
  params.set('zip', zip);
  params.set('search', search);
  const resp = await fetch(`/.netlify/functions/fetch-yelp?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  const data = await resp.json();
  return data;
}
