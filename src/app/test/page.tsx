export default function TestPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 AdSyntho Dashboard is Working!</h1>
      <p>Deployment successful!</p>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>Database URL: {process.env.DATABASE_URL ? '✅ Connected' : '❌ Not connected'}</p>
      <p>NextAuth URL: {process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Not set'}</p>
    </div>
  )
}
