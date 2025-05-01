
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Users,
  PackageSearch,
  FileText,
  ClipboardCheck,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainItems = [
  {
    title: "Tableau de bord",
    icon: BarChart3,
    path: "/",
  },
  {
    title: "Fournisseurs",
    icon: Users,
    path: "/fournisseurs",
  },
  {
    title: "Produits",
    icon: PackageSearch,
    path: "/produits",
  },
  {
    title: "Documents",
    icon: FileText,
    path: "/documents",
  },
  {
    title: "Exigences",
    icon: ClipboardCheck,
    path: "/exigences",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/messages",
  },
];

const secondaryItems = [
  {
    title: "Paramètres",
    icon: Settings,
    path: "/parametres",
  },
  {
    title: "Déconnexion",
    icon: LogOut,
    path: "/logout",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 py-1">
          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-white font-semibold text-lg">
            T
          </div>
          <span className="font-semibold text-xl">TrackReady</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        {
                          "bg-sidebar-accent text-sidebar-accent-foreground":
                            isActive,
                        }
                      )
                    }
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton asChild isActive={isActive}>
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        {
                          "bg-sidebar-accent text-sidebar-accent-foreground":
                            isActive,
                        }
                      )
                    }
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton asChild isActive={isActive}>
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">
            TrackReady v1.0.0 • 2025
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
