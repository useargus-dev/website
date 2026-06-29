import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { LINKS } from "@/constants/links";
import { AuthScopes } from "@/components/security/auth-scopes";
import { CryptoDetail } from "@/components/security/crypto-detail";
import { GoalsGrid } from "@/components/security/goals-grid";
import { Hardening } from "@/components/security/hardening";
import { IpcDetail } from "@/components/security/ipc-detail";
import { Limitations } from "@/components/security/limitations";
import { ProxyDetail } from "@/components/security/proxy-detail";
import { SandboxDetail } from "@/components/security/sandbox-detail";
import { SecuritySection } from "@/components/security/section";
import { SecretMatrix } from "@/components/security/secret-matrix";
import { ThreatGrid } from "@/components/security/threat-grid";
import { TrustLayers } from "@/components/security/trust-layers";

export function SecurityPage() {
  return (
    <div className="mx-auto w-full max-w-4xl min-w-0 px-4 py-12 sm:px-5 lg:py-16">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 max-w-2xl"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-signal">
          Technical specification
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Security model
        </h1>
        <p className="mt-4 leading-relaxed text-text-muted">
          Argus v0.3 is early software and has not been independently security-audited.
          This page describes the design intent and controls implemented in the open
          source desktop app — Argus Proxy, Argus Sandbox (
          <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-xs text-text">
            argus run
          </code>
          ), and local IPC grants. For the full specification, parameter tables, and release
          checklist, see the repository.
        </p>
        <a
          href={LINKS.securityDocs}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal hover:underline"
        >
          Full docs/security.md
          <ExternalLink size={14} />
        </a>
      </motion.header>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <SecuritySection
          id="goals"
          title="Security goals"
          description="What the architecture optimizes for and how success is measured."
          className="pt-8 sm:pt-10"
        >
          <GoalsGrid />
        </SecuritySection>

        <SecuritySection
          id="trust"
          title="Trust boundaries"
          description="Three layers with a single invariant: the Rust core is the only component that decrypts secrets."
        >
          <TrustLayers />
        </SecuritySection>

        <SecuritySection
          id="threats"
          title="Threat model"
          description="Threats Argus is designed to mitigate on a developer workstation."
        >
          <ThreatGrid />
        </SecuritySection>

        <SecuritySection
          id="limitations"
          title="Known limitations"
          description="Threats outside Argus's design boundary, plus release-scope gaps for v0.3."
        >
          <Limitations />
        </SecuritySection>

        <SecuritySection
          id="crypto"
          title="Cryptography"
          description="Parameters for key derivation, database encryption, and per-value protection."
        >
          <CryptoDetail />
        </SecuritySection>

        <SecuritySection
          id="auth"
          title="Authentication & scopes"
          description="One local account with capability scopes — not multi-user tenancy."
        >
          <AuthScopes />
        </SecuritySection>

        <SecuritySection
          id="ipc"
          title="IPC & client grants"
          description="How local applications request secrets and how grants are issued."
        >
          <IpcDetail />
          <p className="mt-6 text-sm leading-relaxed text-text-muted">
            The requests window shows bucket name, full executable path, working
            directory, git remote (if detected), and command line (with sensitive flags
            stripped). IPC remains active while the app is locked — only sign-out stops
            the server. App lock requires TOTP or biometric; password is required at cold
            start sign-in.
          </p>
        </SecuritySection>

        <SecuritySection
          id="sandbox"
          title="Argus Sandbox"
          description="OS-level capture via argus run — grant delegation, relay attestation, and redirector peers."
        >
          <SandboxDetail />
          <p className="mt-6 text-sm leading-relaxed text-text-muted">
            Enable proxy on a bucket before using Argus Sandbox. The CLI creates a sandbox
            session via IPC, starts the platform redirector (eBPF on Linux, WinDivert on
            Windows), and injects CA bundle paths into the child environment. Real API
            keys are rewritten at MITM time — same placeholder rules for Argus Sandbox
            and legacy library proxy. See Usage for the recommended loadEnv + argus run
            path and legacy v0.2.x client wiring.
          </p>
        </SecuritySection>

        <SecuritySection
          id="proxy"
          title="Argus Proxy (HTTP MITM)"
          description="Optional per-bucket loopback proxy that keeps real API keys out of process environment."
        >
          <ProxyDetail />
          <p className="mt-6 text-sm leading-relaxed text-text-muted">
            Enable proxy on a bucket, turn on inject proxy token per mapping, and set
            allowed domains. With Argus Sandbox, outbound HTTPS is redirected here
            automatically after grant checks. Legacy v0.2.x apps wire explicit SDK factory
            helpers to this loopback port instead.
          </p>
        </SecuritySection>

        <SecuritySection
          id="types"
          title="Secret type access matrix"
          description="Which secret types can leave the vault via IPC, CLI, or UI."
        >
          <SecretMatrix />
        </SecuritySection>

        <SecuritySection
          id="hardening"
          title="Frontend & runtime hardening"
          description="Controls around the WebView, Tauri capabilities, and memory handling."
        >
          <Hardening />
        </SecuritySection>

        <SecuritySection
          id="disclosure"
          title="Vulnerability disclosure"
          className="pb-10 sm:pb-12"
        >
          <p className="text-sm leading-relaxed text-text-muted">
            Report security issues through GitHub Security Advisories on the repository —
            not public issues. See SECURITY.md for expected response timelines and scope.
            Argus handles sensitive material; treat reports as confidential until a fix is
            released.
          </p>
        </SecuritySection>
      </div>
    </div>
  );
}
