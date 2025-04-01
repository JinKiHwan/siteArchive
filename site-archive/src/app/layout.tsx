import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactQueryProvider } from '@/lib/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '클라이언트 SNS 아카이브',
    description: '소중한 SNS 콘텐츠를 손쉽게 아카이브하고 관리하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ReactQueryProvider>
                        {children}
                        <Toaster />
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
