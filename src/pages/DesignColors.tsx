import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react'

const swatches = [50,100,200,300,400,500,600,700,800,900]

function ColorRow({ name }: { name: string }) {
  return (
    <Stack>
      <Text fontWeight="bold">{name}</Text>
      <Grid templateColumns="repeat(10, minmax(64px, 1fr))" gap={3}>
        {swatches.map((s) => (
          <Box key={s} rounded="md" overflow="hidden" borderWidth="1px" borderColor="blackAlpha.200">
            <Box h="56px" bg={`${name}.${s}`} />
            <Box p={2} textAlign="center">
              <Text fontSize="xs">{s}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Stack>
  )
}

export default function DesignColorsPage() {
  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>Paleta de Cores</Heading>
      <Stack gap={8}>
        <ColorRow name="brand" />
        <ColorRow name="surface" />
        <Stack>
          <Text fontWeight="bold">Neutros (Chakra)</Text>
          <Grid templateColumns="repeat(10, minmax(64px, 1fr))" gap={3}>
            {swatches.map((s) => (
              <Box key={s} rounded="md" overflow="hidden" borderWidth="1px" borderColor="blackAlpha.200">
                <Box h="56px" bg={`gray.${s}`} />
                <Box p={2} textAlign="center">
                  <Text fontSize="xs">gray.{s}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Box>
  )
}


