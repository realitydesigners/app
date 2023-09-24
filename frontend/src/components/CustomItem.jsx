import { ImageIcon } from '@sanity/icons' // Replace 'ImageIcon' with the actual icon component you want to use
import { Card, Container, Stack, Text } from '@sanity/ui'

function CustomItem(props) {
  const { description, title, ...restProps } = props

  const handleDragStart = (e) => {
    e.dataTransfer.setData('item', JSON.stringify(props.value))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation() // Stop propagation to prevent the "Can't Upload File Here" error
  }

  return (
    <Container
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Card
        border
        padding={4}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Stack
          space={1}
          direction="row"
          alignItems="center"
          padding={2}
          flex={0.25}
        >
          <ImageIcon />
          <Text size={1} weight="bold">
            {title?.toUpperCase()}
          </Text>
        </Stack>
        <div style={{ flex: 2 }}>{props.renderDefault(restProps)}</div>
      </Card>
    </Container>
  )
}

export default CustomItem
