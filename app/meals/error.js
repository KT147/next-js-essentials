"use client"

// message'i näitamisega tuleb olla ettevaatlik,
// et mitte eksponeerida midagi salajast back-endist.

function Error(props) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{props.error.message}</p>
    </main>
  )
}

export default Error;