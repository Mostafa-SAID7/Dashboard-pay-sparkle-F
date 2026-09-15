import { createFileRoute } from "@tanstack/react-router";
import UsersAccounts from "@/features/pay/UsersAccounts";

export const Route = createFileRoute("/_shell/users")({
  head: () => ({
    meta: [
      { title: "Users & Accounts — Roles and Balances | PayFlow" },
      {
        name: "description",
        content:
          "Manage account holders, roles, balances and access across your payment organisation.",
      },
      { property: "og:title", content: "Users & Accounts — PayFlow" },
      {
        property: "og:description",
        content: "Manage account holders, roles, balances and access.",
      },
    ],
  }),
  component: UsersAccounts,
});
