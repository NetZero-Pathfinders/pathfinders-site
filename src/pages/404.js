import getNavigation from "@/utils/api/server/getNavigation"

export default function NotFoundPage() {
  return <div>{"404"}</div>
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  return { props: { navigation } }
}
