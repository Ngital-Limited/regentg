import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
}

/**
 * Standard placeholder for admin pages that haven't been built yet.
 * Used while we wire up the data layer phase by phase.
 */
const AdminPagePlaceholder = ({ title, description, actions, children }: Props) => {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-light tracking-wide text-foreground uppercase">
            {title}
          </h1>
          <div className="w-12 h-[2px] bg-primary mt-3" />
          {description && (
            <p className="text-sm text-muted-foreground mt-3">{description}</p>
          )}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>

      {children ?? (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
          <p className="text-sm text-muted-foreground">
            Coming in the next phase — data view will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminPagePlaceholder;
