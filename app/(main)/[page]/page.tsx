import { resolvePage } from "@/lib/page-routes";
import Page1 from "../_page1/Page";
import Page2 from "../_page2/Page";
import Page3 from "../_page3/Page";
export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const id = await resolvePage((await params).page);
  const Component = { page1: Page1, page2: Page2, page3: Page3 }[id];
  return <Component />;
}
