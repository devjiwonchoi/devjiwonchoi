import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Jiwon Choi'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          fontFamily: 'monospace',
          color: 'white',
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Jiwon Choi
      </div>
    ),
    {}
  )
}
