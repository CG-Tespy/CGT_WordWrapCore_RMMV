import { WrapRule } from './WrapRule';
import { emptyString, openingParenthesis, closingParenthesis, singleSpace } from '../../Shared/_Strings';

export class ParenthesisAlignmentEnforcer extends WrapRule
{
    CanApplyTo(linesCopy: string[]): boolean 
    {
        let enoughLines: boolean = linesCopy.length > 1;
        let openingParenIndex = this.FirstOpeningParenIndex(linesCopy);
        let parenthesisIsThere = openingParenIndex >= 0;
        let thatLineNotAtLast = openingParenIndex != linesCopy.length - 1;

        return enoughLines && parenthesisIsThere && thatLineNotAtLast && this.AllowedToAct;
    }

    /**
     * Returns the index of the line where this should start applying leading spaces. 
     * Returns -1 if there is no line with an opening parenthesis.
     * @param linesCopy 
     */
     protected FirstOpeningParenIndex(linesCopy: string[]): number
     {
         let hasFirstParen = this.FirstLineWithParenthesisIn(linesCopy);
         return linesCopy.indexOf(hasFirstParen);
     }

    get AllowedToAct(): boolean { return CGT.WWCore.Params.ParenthesesAlignment; }

    protected ProcessText(linesCopy: string[]): string[] 
    {
        // Find the first line that starts with a parenthesis
        let hasParenthesis = this.FirstLineWithParenthesisIn(linesCopy);
        let lineIndex = linesCopy.indexOf(hasParenthesis);

        let copyOfCopy = linesCopy.slice();
        return this.WithLeadingSpacesApplied(copyOfCopy, lineIndex + 1);
        
    }

    protected FirstLineWithParenthesisIn(linesCopy: string[]):  string
    {
        for (const lineEl of linesCopy)
        {
            if (lineEl[0] === openingParenthesis) // 
            {
                return lineEl[0];
            }
        }

        return emptyString;
    }


    protected WithLeadingSpacesApplied(linesCopy: string[], startingIndex: number): string[]
    {
        for (let i = startingIndex; i < linesCopy.length; i++)
        {
            let currentLine = linesCopy[i];
            currentLine = singleSpace + currentLine;
            linesCopy[i] = currentLine;

            let endsWithClosingParenthesis = currentLine[currentLine.length - 1] === closingParenthesis;
            if (endsWithClosingParenthesis)
                return linesCopy;
        }

        return linesCopy;
    }
    
}