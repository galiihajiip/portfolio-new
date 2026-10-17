/**
 * Pure carousel geometry. The carousel uses a native horizontal scroller
 * (touch, trackpad and keyboard scrolling work natively); these helpers turn
 * scroll positions into a page-aware index and predictable arrow targets.
 */

export interface TrackMetrics {
  /** Width of one card in px. */
  cardWidth: number;
  /** Gap between cards in px. */
  gap: number;
  /** Visible width of the scroller in px. */
  viewportWidth: number;
  /** Number of items in the track. */
  count: number;
}

const stride = (m: TrackMetrics) => Math.max(1, m.cardWidth + m.gap);

/** How many whole cards fit in the viewport (at least 1). */
export const visibleCount = (m: TrackMetrics) =>
  Math.max(1, Math.floor((m.viewportWidth + m.gap + 1) / stride(m)));

/** Highest valid start index: the last page shows the final card flush right. */
export const maxIndex = (m: TrackMetrics) => Math.max(0, m.count - visibleCount(m));

export const clampIndex = (index: number, m: TrackMetrics) => Math.min(Math.max(0, Math.round(index)), maxIndex(m));

/** Index of the first (mostly) visible card for a scroll offset. */
export const indexFromScroll = (scrollLeft: number, m: TrackMetrics) => clampIndex(scrollLeft / stride(m), m);

/** Scroll offset that aligns card `index` to the start of the viewport. */
export const scrollForIndex = (index: number, m: TrackMetrics) => clampIndex(index, m) * stride(m);

/** Arrows advance by one page of fully visible cards. */
export const targetIndex = (current: number, direction: 1 | -1, m: TrackMetrics) =>
  clampIndex(current + direction * visibleCount(m), m);

/** Human-readable range, e.g. "1–3 of 7". */
export const rangeLabel = (index: number, m: TrackMetrics) => {
  if (m.count === 0) return "0 of 0";
  const first = clampIndex(index, m) + 1;
  const last = Math.min(m.count, first + visibleCount(m) - 1);
  return first === last ? `${first} of ${m.count}` : `${first}–${last} of ${m.count}`;
};
