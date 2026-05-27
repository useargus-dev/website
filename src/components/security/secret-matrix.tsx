import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { SECRET_TYPE_MATRIX } from "@/constants/security";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check size={16} className="mx-auto text-success" />;
  }
  if (value === false) {
    return <X size={16} className="mx-auto text-text-muted/50" />;
  }
  return (
    <span className="block text-center text-xs text-text-muted">{value}</span>
  );
}

export function SecretMatrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised text-xs uppercase tracking-wider text-text-muted">
            <th className="px-5 py-3 text-left font-medium">Secret type</th>
            <th className="px-5 py-3 font-medium">IPC inject</th>
            <th className="px-5 py-3 font-medium">CLI</th>
            <th className="px-5 py-3 font-medium">UI</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {SECRET_TYPE_MATRIX.map((row, i) => (
            <motion.tr
              key={row.type}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <td className="px-5 py-3 font-mono text-text">{row.type}</td>
              <td className="px-5 py-3">
                <Cell value={row.socket} />
              </td>
              <td className="px-5 py-3">
                <Cell value={row.cli} />
              </td>
              <td className="px-5 py-3">
                <Cell value={row.ui} />
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border px-5 py-4 text-xs text-text-muted">
        Enforced in ipc/handler.rs and commands/secrets.rs. The UI cannot bypass
        socket restrictions.
      </p>
    </div>
  );
}
