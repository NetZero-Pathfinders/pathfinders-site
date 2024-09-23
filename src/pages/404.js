import { Center } from "@chakra-ui/react"
import getNavigation from "@/utils/api/server/getNavigation"

export default function NotFoundPage() {
  return (
    <Center w="100vw" h="100vh" fontWeight={600} fontSize="lg">
      {"404 — Page not found"}
    </Center>
  )
}

export async function getStaticProps() {
  const navigation = await getNavigation()
  return { props: { navigation } }
}
