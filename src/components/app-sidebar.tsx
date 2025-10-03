import { Home, Inbox, SquarePower, MessageCircleQuestion } from "lucide-react";
import Cookies from "js-cookie";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useSelectUsername } from "@/hooks/useSelectUsername";
import { useNavigate } from "react-router-dom";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "History",
    url: "history",
    icon: Inbox,
  },
  {
    title: "About",
    url: "about",
    icon: MessageCircleQuestion,
  },

  {
    title: "Logout",
    url: "#", // keep "#" if you want to handle logout in onClick
    icon: SquarePower,
    action: "logout", // <-- custom key so you can detect it
  },
];

export function AppSidebar() {
  const username = useSelectUsername("auth-storage");
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Welcome, {username}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.action === "logout" ? (
                      <button
                        onClick={() => {
                          // your logout logic here
                          Cookies.remove("accessToken");
                          Cookies.remove("refreshToken");
                          localStorage.clear();
                          navigate("/login");
                        }}
                        className="flex items-center w-full"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link to={item.url}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
