export default async function MessageFetcher(usersId: string) {
  try {
    // console.log(usersId, "usersid");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/conversations?id=${usersId}`
    );
    const body: MessagesResponse = await res.json();
    // console.log("body", body);
    return body.data?.docs?.messages || [];
  } catch (e) {
    console.log(e);
    return [];
  }
}
