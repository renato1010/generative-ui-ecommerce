import Cart from "@/components/cart";
import { GraphStateProvider } from "@/providers/GraphState";

export default function CartPage(): React.ReactNode {
  return (
    <main className="flex h-full w-full items-center justify-center">
      <GraphStateProvider>
        <Cart />
      </GraphStateProvider>
    </main>
  );
}
