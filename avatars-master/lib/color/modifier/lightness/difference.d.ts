import Random from '../../../helper/random';
import Color from '../../../model/color';
import ColorSet from '../../../model/colorSet';
/**
 * Ensures that the selected color is darker or brighter than a reference color.
 */
export default class BrighterOrDarkerThan extends ColorSet {
    private reference;
    private brighter;
    private darker;
    /**
     * @param colors
     * @param reference
     * @param difference
     */
    constructor(colors: Color[] | ColorSet, reference: ColorSet, difference: number);
    /**
     * Returns a color
     *
     * @param random
     */
    getColor(random: Random): Color;
}
