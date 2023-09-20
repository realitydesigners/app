import QuoteCard from './QuoteCard.jsx'

const QuoteRefWrapper = ({ value }) => {
  const { quote } = value

  if (!quote) {
    return null
  }

  return <QuoteCard quote={quote.quote} media={quote.mediaRef} />
}

export default QuoteRefWrapper
