import getNavigation from "@/utils/api/server/getNavigation"
import ChartBuilder from "@/components/ChartBuilder"

export default function ChartBuilderPage() {
  return <ChartBuilder />
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  return { props: { navigation } }
}
