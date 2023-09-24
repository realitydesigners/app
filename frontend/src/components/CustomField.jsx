import { Card, Stack, Text } from '@sanity/ui'

export function CustomField(props) {
  const { description, title, ...restProps } = props
  return (
    <Card border padding={4}>
      <Stack space={3} marginBottom={3}>
        <Text size={1} weight="bold">
          {title?.toUpperCase()}
        </Text>
        {description && (
          <Text size={1} style={{ color: 'green' }}>
            {description}
          </Text>
        )}
      </Stack>
      {props.renderDefault(restProps)}
    </Card>
  )
}

export default CustomField
