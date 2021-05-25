import { ILineWrapper } from './ILineWrapper';
import { OverflowFinder } from '../../OverflowFinders/OverflowFinder';
import { IWordWrapArgs } from '../WordWrapArgs/IWordWrapArgs';
import { emptyString } from '../../../Shared/_Strings';
import { IOverflowFindArgs } from '../../OverflowFinders/IOverflowFindArgs';

let ArrayEx = CGT.Core.Extensions.ArrayEx;

export class LineWrapper implements ILineWrapper
{
    protected overflowFinder: OverflowFinder;

    WrapIntoLines(args: IWordWrapArgs, actualTextToWrap: string): string[] 
    {
        this.UpdateSeparatorToInclude();

        let lines: string[] = [];
        let words: string[] = actualTextToWrap.split(this.WordSeparator);
        let currentLine: string = emptyString;

        for (const currentWord of words)
        {
            this.UpdateOverflowFindArgs(args, currentWord, currentLine);

            let thereIsOverflow = this.overflowFinder.Find(this.overflowFindArgs);
            let foundLineBreak = this.IsLineBreak(currentWord);

            if (thereIsOverflow || foundLineBreak)
            {
                lines.push(currentLine.trim()); // Make sure not to include any extra spaces
                currentLine = emptyString;
            }

            if (foundLineBreak) // We don't want any line break codes added to the next line
                continue;

            currentLine += currentWord + this.WordSeparator;
        }

        // The last line is always left out by the above loop, so...
        lines.push(currentLine.trim());

        return lines;
    }

    protected UpdateSeparatorToInclude()
    {
        // To cut down on if checks, in the part of the algorithm that adds separators following words.
        if (this.IncludeWordSeparator)
            this.separatorToInclude = this.WordSeparator;
        else
            this.separatorToInclude = "";
    }

    protected get IncludeWordSeparator(): boolean { return CGT.WWCore.Params.SeparateWithSeparator; }
    protected get WordSeparator(): string { return CGT.WWCore.Params.WordSeparator; }

    protected separatorToInclude = " ";

    protected UpdateOverflowFindArgs(wordWrapArgs: IWordWrapArgs, word: string, line: string)
    {
        this.overflowFindArgs.word = word;
        this.overflowFindArgs.line = line;
        this.overflowFindArgs.wordWrapArgs = wordWrapArgs;
    }

    protected overflowFindArgs: IOverflowFindArgs = 
    {
        word: "",
        line: "",
        wordWrapArgs: null
    };

    IsLineBreak(text: string): boolean
    {
        return ArrayEx.Includes(this.LineBreakMarkers, text);
    }

    get LineBreakMarkers(): string[] { return CGT.WWCore.Params.LineBreakMarkers; }

}