import getNavigation from "@/utils/api/server/getNavigation"

export default function ErrorPage500() {
  return <div>{"500"}</div>
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  return { props: { navigation } }
}
