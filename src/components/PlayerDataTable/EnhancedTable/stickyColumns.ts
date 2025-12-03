import type { ColumnConfig } from "../../../types/TableColumn";

/**
 * Extra runtime metadata we compute for sticky columns so that both the table
 * header and body can share the same layout logic.
 */
export interface StickyMeta {
    left: number;
    isLastSticky: boolean;
}

export type ColumnWithStickyMeta = ColumnConfig & {
    // We intentionally allow arbitrary extra fields here (e.g. headerConfig)
    // because this type is applied on top of the JSON table config.
    [key: string]: any;
    stickyMeta?: StickyMeta;
};

const DEFAULT_STICKY_WIDTH = 135;

// Convert a width/minWidth string like "125px" into its numeric pixel value.
const parsePx = (value: unknown): number => {
    if (typeof value !== "string") return 0;
    const match = value.match(/^(\d+)\s*px$/);
    return match ? parseInt(match[1], 10) : 0;
};

/**
 * Given the table's column config, compute the left-offset and last-sticky
 * metadata for each sticky column. This is used by both the header and body
 * so we only have to maintain the layout logic in one place.
 */
export const withStickyMeta = (
    columns: ColumnWithStickyMeta[],
): ColumnWithStickyMeta[] => {
    const stickyColumns = columns.filter((c) => c.sticky);
    const lastStickyId = stickyColumns[stickyColumns.length - 1]?.id;

    let currentLeft = 0;

    return columns.map((column) => {
        if (!column.sticky) {
            return column;
        }

        const widthPx =
            parsePx(column.sx?.minWidth) ||
            parsePx(column.sx?.width) ||
            DEFAULT_STICKY_WIDTH;

        const columnWithMeta: ColumnWithStickyMeta = {
            ...column,
            stickyMeta: {
                left: currentLeft,
                isLastSticky: column.id === lastStickyId,
            },
        };

        currentLeft += widthPx;
        return columnWithMeta;
    });
};


