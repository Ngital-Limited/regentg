import { useSearchParams } from "react-router-dom";
import { useAuth } from "./useAuth";

/**
 * Preview mode is active when:
 *  - URL contains ?preview=1
 *  - AND the current user is an authenticated admin
 *
 * In preview mode, public pages should bypass draft filters
 * (is_active / is_published) so admins can review unpublished content.
 */
export const usePreview = () => {
  const [params] = useSearchParams();
  const { isAdmin, loading } = useAuth();
  const requested = params.get("preview") === "1";
  return {
    isPreview: requested && isAdmin,
    requested,
    isAdmin,
    authLoading: loading,
  };
};
