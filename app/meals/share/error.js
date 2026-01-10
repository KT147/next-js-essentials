"use client";

function Error(props) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
      <p>{props.error.message}</p>
    </main>
  );
}

export default Error;
