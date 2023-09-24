import { ImageIcon } from '@sanity/icons' // Replace 'ImageIcon' with the actual icon component you want to use
import { Card, Container, Stack, Text } from '@sanity/ui'

function CustomItem(props) {
  const { description, title, type, ...restProps } = props

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

  const iconMap = {
    headingBlock: () => (
      <ImageIcon
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          color: 'gray',
        }}
      />
    ),
    contentBlock: () => (
      <ImageIcon
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          color: 'blue',
        }}
      />
    ),
  }

  const iconComponent =
    iconMap[type] ||
    (() => (
      <ImageIcon
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          color: '#444',
        }}
      />
    ))

  const icon = iconComponent()

  return (
    <Container
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: 'auto',
        display: 'flex',
        height: '100%',
        paddingLeft: '0.3em',
        paddingRight: '0.3em',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          style={{
            width: '10%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5em',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e1e1e',
            borderRadius: '0.em',
          }}
        >
          {icon}
          <Text
            style={{
              color: '#777',
              fontSize: '0.5em',
              fontWeight: 'bold',
              marginBottom: '.5em',
            }}
          >
            {title?.toUpperCase()}
          </Text>
        </Stack>
        <div
          style={{
            width: '90%',
            height: '100%',
            color: 'gray',
          }}
        >
          {props.renderDefault(restProps)}
        </div>
      </Card>
    </Container>
  )
}

export default CustomItem
