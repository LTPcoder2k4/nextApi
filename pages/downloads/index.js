function Downloads({fileName}) {
    return (
      <>
        {
            fileName.map((value, index) => {
                return (
                    <div key={index}>
                        {value}
                    </div>
                )
            })
        }
      </>
    )
}

Downloads.getInitialProps = () => {
    var fs = require('fs')
    var files = fs.readdirSync('./public/downloads')

    return {fileName: files}
}

export default Downloads