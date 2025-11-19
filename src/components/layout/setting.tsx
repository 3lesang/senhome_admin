import { cn } from "@/lib/utils";
import { Link, Outlet } from "@tanstack/react-router";
import {
  CreditCardIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "lucide-react";
import { buttonVariants } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useLocation } from "@tanstack/react-router";

export function SettingLayout() {
  const location = useLocation();
  const data = [
    {
      name: "Cấu hình chung",
      icon: SettingsIcon,
      to: "/stores/settings/general",
    },
    {
      name: "Thanh toán",
      icon: ShoppingCartIcon,
      to: "/stores/settings/checkouts",
    },
    { name: "Vận chuyển", icon: TruckIcon, to: "/stores/settings/shipments" },
    {
      name: "Phương thức thanh toán",
      icon: CreditCardIcon,
      to: "/stores/settings/payments",
    },
  ];
  return (
    <div className="grid grid-cols-12 max-w-6xl mx-auto py-8">
      <Card className="border-0 shadow-none h-fit col-span-3">
        <CardContent>
          <div className="flex flex-col min-w-56">
            {data.map((item) => (
              <Link
                to={item.to}
                className={cn(
                  buttonVariants({
                    variant: item.to.includes(location.pathname)
                      ? "secondary"
                      : "ghost",
                  }),
                  "justify-start",
                )}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
}
