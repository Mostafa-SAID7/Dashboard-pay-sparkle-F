import { useState } from "react";
import { motion } from "motion/react";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaginationControls from "@/components/pay/PaginationControls";
import { accounts as initialAccounts, formatCurrency, type Account } from "@/lib/mockData";
import { toast } from "sonner";

const PAGE_SIZE = 5;

const UsersAccounts = () => {
  const [users, setUsers] = useState<Account[]>(initialAccounts);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [editUser, setEditUser] = useState<Account | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<"name" | "balance">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const filtered = users
    .filter(u => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (search && !`${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortField === "balance") return (a.balance - b.balance) * mult;
      return a.name.localeCompare(b.name) * mult;
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as Account["role"],
      balance: Number(formData.get("balance")),
    };

    if (editUser) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...data } : u));
      toast.success("User updated");
    } else {
      const newUser: Account = {
        id: `ACC${String(users.length + 1).padStart(3, "0")}`,
        ...data,
        currency: "USD",
        status: "active",
        lastLogin: new Date().toISOString().slice(0, 10),
      };
      setUsers(prev => [newUser, ...prev]);
      setPage(1);
      toast.success("User added");
    }
    setDialogOpen(false);
    setEditUser(null);
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success("User removed");
  };

  const toggleSort = (field: "name" | "balance") => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users & Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage users, roles, and account balances</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(v) => { setDialogOpen(v); if (!v) setEditUser(null); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" />Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div>
                <Label>Name</Label>
                <Input name="name" defaultValue={editUser?.name ?? ""} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input name="email" type="email" defaultValue={editUser?.email ?? ""} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <select name="role" defaultValue={editUser?.role ?? "user"} className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <Label>Balance</Label>
                  <Input name="balance" type="number" defaultValue={editUser?.balance ?? 0} required />
                </div>
              </div>
              <Button type="submit" className="w-full">{editUser ? "Save Changes" : "Add User"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search users..." className="pl-9" />
        </div>
        <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setPage(1); }}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground" onClick={() => toggleSort("name")}>
                  Name {sortField === "name" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase cursor-pointer hover:text-foreground" onClick={() => toggleSort("balance")}>
                  Balance {sortField === "balance" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.03 * i }}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-foreground">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      u.role === "admin" ? "bg-primary/10 text-primary" :
                      u.role === "user" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{formatCurrency(u.balance, u.currency)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${u.status === "active" ? "text-success" : "text-muted-foreground"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setEditUser(u); setDialogOpen(true); }}
                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </motion.div>
    </div>
  );
};

export default UsersAccounts;
