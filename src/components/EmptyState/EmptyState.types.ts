export type EmptyStateType = "search" | "noFeeds" | "noApplied" | "noOwnFeeds";

export interface EmptyStateProps {
  type: EmptyStateType;
  searchQuery?: string;
}
