export default async function MessageFetcher(usersId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/conversations?id=${usersId}`
  );
  const body: MessagesResponse = await res.json();
  return body.data.docs;
}
