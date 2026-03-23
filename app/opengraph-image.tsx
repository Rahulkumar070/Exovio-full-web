import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Exovio — Beyond Digital Vision';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F0EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(26,26,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Top-right label */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '80px',
            color: '#8B8680',
            fontSize: '13px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          exovio.agency
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 300,
            color: '#1A1A1A',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Beyond</span>
          <span style={{ color: '#C17F59' }}>Digital Vision</span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            color: '#8B8680',
            lineHeight: 1.5,
            maxWidth: '600px',
            display: 'flex',
          }}
        >
          Award-winning web design &amp; development agency
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#C17F59',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
