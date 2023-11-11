const Breadcrumb = ({ navigation }) => {
  return (
    <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 transform font-mono text-xs uppercase text-white">
      {navigation.mainCategory && (
        <>
          <span>{navigation.mainCategory}</span>
        </>
      )}
      {navigation.subWorld && (
        <>
          <span className="mx-2"> &gt; </span>
          <span>{navigation.subWorld}</span>
        </>
      )}
    </div>
  )
}

export default Breadcrumb
