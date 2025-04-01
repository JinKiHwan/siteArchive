import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                    클라이언트 SNS 아카이브
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                    소중한 SNS 콘텐츠를 손쉽게 아카이브하고 관리하세요. 중요한 게시물을 저장하고, 정리하고, 언제든지
                    다시 찾아볼 수 있습니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/signin">
                        <Button size="lg" variant="default">
                            시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>

                    <Link href="/about">
                        <Button size="lg" variant="outline">
                            더 알아보기
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                <FeatureCard
                    title="저장"
                    description="트위터, 인스타그램, 페이스북 등 다양한 SNS의 콘텐츠를 저장하세요."
                />
                <FeatureCard
                    title="정리"
                    description="태그, 카테고리를 활용하여 아카이브된 콘텐츠를 체계적으로 정리하세요."
                />
                <FeatureCard
                    title="검색"
                    description="저장된 콘텐츠를 빠르게 검색하여 필요한 정보를 쉽게 찾아보세요."
                />
            </div>
        </main>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    );
}
