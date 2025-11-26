export default function Page() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Absolute Assistant</h1>
      <p>Welcome to the official website.</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
        <a href="/reputation">Reputation</a>
        <a href="/local-app">Why Local App</a>
        <a href="/download">Download</a>
        <a href="/trust">Trust</a>
      </div>
    </main>
  );
}
