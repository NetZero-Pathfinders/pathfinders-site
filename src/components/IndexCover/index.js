import * as React from "react"
import { Box, Container, SimpleGrid } from "@chakra-ui/react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Cloud } from "@react-three/drei"
import { motion } from "framer-motion"

import DotGrid from "@/components/DotGrid"

export default function IndexCover() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="black"
      overflow="hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5, bounce: 0, type: "spring" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundImage: "url(/images/cover.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <CloudVisual />
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <Container h="100%">
          <SimpleGrid px={5} columns={8} spacing={6} h="100%">
            <Box
              gridColumn="1 / span 2"
              display="flex"
              justifyContent="flex-end"
              alignSelf="start"
            >
              <DotGrid xTiles={3} yTiles={2} dotFill="#FFF" />
            </Box>
            <Box
              gridColumn="-3 / -1"
              display="flex"
              justifyContent="flex-start"
              alignSelf="end"
            >
              <DotGrid xTiles={3} yTiles={2} dotFill="#FFF" />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  )
}

function CloudVisual() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 1)
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        style={{
          opacity: visible ? 0.75 : 0,
          position: "relative",
          transition: "opacity 2s",
        }}
      >
        <ambientLight intensity={5} />
        <React.Suspense fallback={null}>
          <CloudOverlay />
        </React.Suspense>
      </Canvas>
    </div>
  )
}

function CloudOverlay() {
  const ref = React.useRef()
  const cloud0Ref = React.useRef()
  const cloud1Ref = React.useRef()
  const cloud2Ref = React.useRef()

  useFrame((state, delta) => {
    cloud0Ref.current.rotation.x = state.clock.elapsedTime / 6
    cloud1Ref.current.rotation.x = state.clock.elapsedTime / 7
    cloud2Ref.current.rotation.x = state.clock.elapsedTime / 8
  })

  return (
    <group ref={ref}>
      <Cloud
        ref={cloud0Ref}
        args={[3, 2]}
        bounds={[16, 1, 1]}
        color="#F3ECD9"
        opacity={0.2}
        position={[12, 2, 0]}
      />
      <Cloud
        ref={cloud1Ref}
        args={[3, 2]}
        bounds={[16, 1, 1]}
        color="#EBE5D7"
        opacity={0.3}
        position={[-12, -2, 0]}
      />
      <Cloud
        ref={cloud2Ref}
        args={[3, 2]}
        bounds={[16, 1, 1]}
        color="#FFFFFF"
        opacity={0.4}
        position={[-12, -2, 0]}
      />
    </group>
  )
}
