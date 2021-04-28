/*:
@plugindesc Needed for the CGT word-wrapping plugins, holding information they can use.
@author CG-Tespy – https://github.com/CG-Tespy
@help This is version 1.01.01 of this plugin. Tested with RMMV versions 1.5.1 and 1.6.2.

Needs the CGT CoreEngine 1.01.11+ to work. Make sure this is below that in the Plugin Manager.

Please make sure to credit me (and any of this plugin's contributing coders)
if you're using this plugin in your game (include the names and webpage links).

If you want to edit this plugin, you may be better off editing and 
building the source: https://github.com/CG-Tespy/CGT_WordWrapCore_MV

@param Wrapper
@default null
@desc Which word wrap plugin to use. Look at the appropriate User Guides for more info.

@param NametagFormats
@type string[]
@default ["^[a-zA-Z \\?\\!\\(\\)\\[\\]<>\\/]+:", "^\\[[a-zA-Z \\?\\!\\(\\)\\[\\]<>\\/]]+:", "^\\n<[a-zA-Z \\?\\!\\(\\)\\[\\]<>\\/]+"]
@desc Formats that nametags in your game follow, as regex strings.

@param LineBreakMarkers
@type string[]
@default ["<br>", "<br2>", "<line-break>"]
@desc You put these in the text when you want to guarantee a line break.

@param LineMinWordCount
@type number
@default 3
@desc Minimum amount of words a line can hold.

@param ParenthesisAlignment
@type boolean
@default true
@desc Whether or not this aligns text based on parentheses.

@param SplitWordsBetweenLines
@type boolean
@default false
@desc Whether or not to have words split between lines when they'd otherwise cause overflow.

@param EmptyText
@type string[]
@default ["\u001bC\\[[0-9]+\\]", "\\$", ".\u001b"]
@desc Regexes that define text that should be treated as not taking up space in the textbox.

@param BoldItalicSubstitute
@type string
@default AA
@desc When calculating the width of text with bold or italics markers, this is what they're treated as

@param Spacing

@param MugshotWidth
@parent Spacing
@type number
@default 144
@desc How wide mugshots are treated as being, in a unit decided by the active wrapper.

@param MugshotPadding
@parent Spacing
@type number
@default 25
@desc How much space there is between the mugshot and the text, in a unit decided by the active wrapper.

@param SidePadding
@parent Spacing
@type number
@default 5
@desc For the message box sides, helping prevent overflow while making sure the wrapping isn't too tight.


*/

import { WWCore } from './WordWrapCore/_Setup';

let plugin = 
{
    WWCore: WWCore
};

//@ts-ignore
window.CGT = window.CGT || {};

Object.assign(window.CGT, plugin);