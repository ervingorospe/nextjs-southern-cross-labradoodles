import './globals.css'
// contants
import { defaultMetadata } from '@/lib/constants'
// layouts
import { HtmlHead } from '@/app/layouts'
// components
import { HeaderContainer, FooterContainer } from '@/components/layouts'

export const metadata = {
  ...defaultMetadata
}

export const dynamicParams = false

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <HtmlHead/>

      <body className="antialiased">
        <div>
          <HeaderContainer/>

          <main>
            {children}
          </main>

          <FooterContainer/>
        </div>
      </body>
    </html>
  )
}
