import { useCallback, useState, type ComponentType } from "react";
import { Mail } from "lucide-react";
import { LINKS, TEAM_MEMBERS } from "@/constants/links";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { cn } from "@/lib/cn";

type TeamIconProps = {
  size?: number;
  className?: string;
};

type FooterTeamRowProps = {
  icon: ComponentType<TeamIconProps>;
  label: string;
  tooltip: string;
  href?: string;
  onClick?: () => void | Promise<void>;
  className?: string;
};

function FooterTeamRow({
  icon: Icon,
  label,
  tooltip,
  href,
  onClick,
  className,
}: FooterTeamRowProps) {
  const sharedClass = cn(
    "group/team relative inline-flex w-full items-center gap-2 rounded-md text-sm text-text-muted transition-colors hover:text-text",
    className,
  );

  const tooltipEl = (
    <span
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-max max-w-[min(18rem,calc(100vw-2rem))] break-all rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text shadow-subtle opacity-0 invisible transition-[opacity,visibility] duration-150 group-hover/team:visible group-hover/team:opacity-100 group-focus-visible/team:visible group-focus-visible/team:opacity-100"
    >
      {tooltip}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="me noopener noreferrer"
        className={sharedClass}
      >
        <Icon size={16} aria-hidden />
        <span>{label}</span>
        {tooltipEl}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(sharedClass, "text-left")}>
      <Icon size={16} aria-hidden />
      <span>{label}</span>
      {tooltipEl}
    </button>
  );
}

export function FooterTeam() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINKS.contactEmailAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Team
      </p>
      <ul className="mt-3 space-y-2">
        <li>
          <FooterTeamRow
            icon={Mail}
            label="Sushant Samuel"
            tooltip={
              copied
                ? "Copied to clipboard"
                : `${LINKS.contactEmailAddress} — click to copy`
            }
            onClick={copyEmail}
          />
        </li>
        {TEAM_MEMBERS.map((member) => (
          <li key={member.linkedin}>
            <FooterTeamRow
              icon={LinkedInIcon}
              label={member.name}
              tooltip={member.linkedin}
              href={member.linkedin}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
