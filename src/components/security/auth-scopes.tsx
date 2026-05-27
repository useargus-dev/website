import { motion } from "motion/react";
import { AUTH_SCOPES } from "@/constants/security";

export function AuthScopes() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised text-xs uppercase tracking-wider text-text-muted">
            <th className="px-5 py-3 font-medium">Scope</th>
            <th className="px-5 py-3 font-medium">Unlock requirement</th>
            <th className="px-5 py-3 font-medium">Grants access to</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {AUTH_SCOPES.map((row, i) => (
            <motion.tr
              key={row.scope}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface"
            >
              <td className="px-5 py-4 font-mono font-medium text-signal">
                {row.scope}
              </td>
              <td className="px-5 py-4 text-text-muted">{row.requires}</td>
              <td className="px-5 py-4 text-text-muted">{row.grants}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border px-5 py-4 text-sm text-text-muted">
        One local account with capability scopes in Rust AppState — not separate
        user accounts. App lock uses TOTP or biometric only; sign-out zeroizes
        keys and stops IPC. Failed auth attempts are rate-limited with exponential
        backoff.
      </p>
    </div>
  );
}
