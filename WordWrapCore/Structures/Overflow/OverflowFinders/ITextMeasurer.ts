/**
 * Helper for OverflowFinders to detect overflow
 */
export interface ITextMeasurer
{
    MeasureFor(text: string, textField: Bitmap): number
}
