import RoutedProject from "@/app/(main)/components/RoutedProject";
export default async function Page({ params }: { params: Promise<{ page: string; slug: string }> }) {
 return <RoutedProject {...await params} modal={false} />;
}
